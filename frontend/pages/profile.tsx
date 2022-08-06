import { GetServerSideProps } from "next";
import Title from "../components/Title";
import { useAppSelector } from "../hooks/useAppSelector";
import { isLoggedInSelector } from "../slices/users";
import wrapper from "../store";
import { useMe } from "../hooks/useMe";
import { OutputLoginUserType } from "../interface/user";

export default function Profile() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user: OutputLoginUserType = useMe({});
  return (
    <div>
      <Title title="Profile" />
      {isLoggedIn ? "logged!" : "not logged!"}
      <div>{user && user.nickname}</div>
    </div>
  );
}
