import Link from "next/link";

function Menu() {
  return (
    <div>
      <ul className="flex-col">
        <Link href="/pointshare/customers">Customers</Link>
        <Link href="/pointshare/workcases">WorkCases</Link>
        <Link href="/pointshare/tasks">Tasks</Link>
      </ul>
    </div>
  );
}
export default Menu;
