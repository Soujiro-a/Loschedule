import { ScriptProps } from "next/script";
import NavBar from "./Navbar";

const Layout = ({ children }: ScriptProps) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
