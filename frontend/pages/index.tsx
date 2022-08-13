import Title from "../components/Title";
import { useAppSelector } from "../hooks/useAppSelector";
import { isLoggedInSelector } from "../slices/users";

export default function Home() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  return (
    <>
      <Title title="Home" />
      <div>
        <div>{isLoggedIn ? "logged!" : "not logged!"}</div>
      </div>
    </>
  );
}
