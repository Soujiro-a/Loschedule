import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="m-8 flex flex-row items-end">
      <Link href="/">
        <a className="text-2xl font-bold text-slate-600 mr-10">Loschedule</a>
      </Link>
      <div>
        <a>Team</a>
      </div>
    </nav>
  );
};

export default NavBar;
