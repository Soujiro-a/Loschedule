import { useRouter } from "next/router";
import { logOutAction } from "../actions/users";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { isLoggedInSelector, userSelector } from "../slices/users";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

const NavBarComponent = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onClick = async () => {
    await dispatch(logOutAction());

    setTimeout(() => {
      router.push("/");
    });
  };
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="http://localhost:3000/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Loschedule
        </span>
      </Navbar.Brand>
      {/* <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/team">team</Navbar.Link>
      </Navbar.Collapse> */}
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.nickname}</span>
            </Dropdown.Header>
            <Link href={"/team"}>
              <Dropdown.Item>
                <span>My Teams</span>
              </Dropdown.Item>
            </Link>
            <Link href={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <span onClick={onClick}>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </span>
          </Dropdown>
        ) : (
          <Button>
            <Link href={"/login"}>Get started</Link>
          </Button>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavBarComponent;
