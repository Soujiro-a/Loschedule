import Title from "../components/Title";
import { useAppSelector } from "../hooks/useAppSelector";
import { isLoggedInSelector } from "../slices/users";

export default function Home() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  return (
    <>
      <Title title="Error" />
      <div className="min-h-screen">error</div>
    </>
  );
}
