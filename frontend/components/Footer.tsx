import { Footer } from "flowbite-react";

const FooterComponent = () => {
  const year = new Date().getFullYear();
  return (
    <Footer container={true}>
      <Footer.Copyright href="/" by="Loschedule" year={year} />
      <Footer.LinkGroup>
        <Footer.Link href="https://github.com/Soujiro-a/Loschedule">
          Repository
        </Footer.Link>
        <Footer.Link href="https://github.com/Soujiro-a">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default FooterComponent;
