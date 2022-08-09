import { ScriptProps } from "next/script";
import FooterComponent from "./Footer";
import NavBarComponent from "./Navbar";

const Layout = ({ children }: ScriptProps) => {
  return (
    <div>
      <NavBarComponent />
      <main>{children}</main>
      <FooterComponent />
    </div>
  );
};

export default Layout;
