
import AVFoundation
import CoreMedia
import Foundation
import ScreenCaptureKit

// rec PID DIR OUT.mov: films the largest window of PID at full pixel size in the background (ScreenCaptureKit window
// filter, nothing activated), from DIR/recording (written here) until DIR/timings.json appears.
final class Rec: NSObject, SCStreamOutput, @unchecked Sendable {
    let writer: AVAssetWriter
    let input: AVAssetWriterInput
    var started = false
    var first = 0.0
    var count = 0
    let flag: String
    init(out: URL, w: Int, h: Int, flag: String) throws {
        writer = try AVAssetWriter(outputURL: out, fileType: .mov)
        input = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.proRes422, AVVideoWidthKey: w, AVVideoHeightKey: h])
        input.expectsMediaDataInRealTime = true
        writer.add(input)
        self.flag = flag
    }
    func stream(_ stream: SCStream, didOutputSampleBuffer buffer: CMSampleBuffer, of type: SCStreamOutputType) {
        guard type == .screen,
              let info = (CMSampleBufferGetSampleAttachmentsArray(buffer, createIfNecessary: false) as? [[SCStreamFrameInfo: Any]])?.first,
              let raw = info[.status] as? Int, SCFrameStatus(rawValue: raw) == .complete else { return }
        let t = CMSampleBufferGetPresentationTimeStamp(buffer)
        if !started {
            started = true
            first = t.seconds
            writer.startWriting()
            writer.startSession(atSourceTime: t)
            FileManager.default.createFile(atPath: flag, contents: nil)
        }
        if input.isReadyForMoreMediaData { input.append(buffer); count += 1 }
    }
}

let args = CommandLine.arguments
guard args.count == 4, let pid = Int32(args[1]) else { print("usage: rec PID DIR OUT"); exit(2) }
let dir = URL(fileURLWithPath: args[2])
_ = CGMainDisplayID()
let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: false)
guard let window = content.windows.filter({ $0.owningApplication?.processID == pid && $0.windowLayer == 0 }).max(by: { $0.frame.width * $0.frame.height < $1.frame.width * $1.frame.height }) else { print("no window"); exit(1) }
let filter = SCContentFilter(desktopIndependentWindow: window)
let scale = Double(filter.pointPixelScale)
let config = SCStreamConfiguration()
config.width = Int(window.frame.width * scale)
config.height = Int(window.frame.height * scale)
config.minimumFrameInterval = CMTime(value: 1, timescale: 60)
config.pixelFormat = kCVPixelFormatType_32BGRA
config.showsCursor = false
config.ignoreShadowsSingleWindow = true
config.queueDepth = 8
config.colorSpaceName = CGColorSpace.sRGB
print("window \(window.frame) scale \(scale) -> \(config.width)x\(config.height)")
let rec = try Rec(out: URL(fileURLWithPath: args[3]), w: config.width, h: config.height, flag: dir.appendingPathComponent("recording").path)
let stream = SCStream(filter: filter, configuration: config, delegate: nil)
try stream.addStreamOutput(rec, type: .screen, sampleHandlerQueue: DispatchQueue(label: "rec"))
try await stream.startCapture()
let deadline = Date().addingTimeInterval(60)
while !FileManager.default.fileExists(atPath: dir.appendingPathComponent("timings.json").path), Date() < deadline {
    try await Task.sleep(for: .milliseconds(50))
}
try await Task.sleep(for: .milliseconds(300))
try await stream.stopCapture()
rec.input.markAsFinished()
await rec.writer.finishWriting()
try "\(rec.first)".write(to: dir.appendingPathComponent("first-pts"), atomically: true, encoding: .utf8)
print("frames \(rec.count) status \(rec.writer.status.rawValue) \(String(describing: rec.writer.error))")
