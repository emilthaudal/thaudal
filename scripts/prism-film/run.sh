#!/bin/sh
# Films the Prism preview on the home page (public/projects/prism-demo*.mp4).
# Plays demo.json on Prism's made-up README fixture, never on a real desk, and
# films the window at its full 2x size in the background: open -g, --background
# (never active, no Dock icon), ScreenCaptureKit filtered to the window.
#
#   swiftc -O rec.swift -o rec        # once
#   ./run.sh light && ./run.sh dark   # writes out/<appearance>/raw.mov (ProRes) and timings.json
#
# Then cut each so the first step falls at 1.15 s (START = that step's time in
# timings.json, less the time in first-pts, less 1.15), fade the end back into
# the start for the loop, and encode:
#
#   ffmpeg -i out/light/raw.mov -filter_complex "[0:v]trim=START:START+14.7,setpts=PTS-STARTPTS,fps=60[a];\
#     [0:v]trim=START:START+0.6,setpts=PTS-STARTPTS,fps=60[b];[a][b]xfade=transition=fade:duration=0.5:offset=14.2,format=yuv420p[v]" \
#     -map "[v]" -an -c:v libx264 -preset veryslow -crf 26 -tune animation -movflags +faststart prism-demo.mp4
#
# The moments in src/components/prism-demo.tsx name seconds in that cut.
set -eu
ap=$1
here=$(cd "$(dirname "$0")" && pwd)
prism=${PRISM:-$HOME/Developer/prism}
app=$prism/mac/build/Prism.app
out=$here/out/$ap
rm -rf "$out"; mkdir -p "$out"
open -g -n "$app" --args --fixture "$prism/docs/readme/fixture.json" --appearance "$ap" --background --demo-script "$here/demo.json" --motion-dir "$out"
pid=""
for _ in 1 2 3 4 5 6 7 8 9 10; do
	sleep 0.5
	pid=$(pgrep -n -f "$app/Contents/MacOS/Prism" || true)
	[ -n "$pid" ] && break
done
[ -n "$pid" ] || { echo "Prism did not start" >&2; exit 1; }
trap 'kill "$pid" 2>/dev/null || true' EXIT
sleep 2
"$here/rec" "$pid" "$out" "$out/raw.mov"
