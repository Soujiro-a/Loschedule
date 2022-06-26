import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { logInAction } from "../actions/users";
import Title from "../components/Title";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useMe } from "../hooks/useMe";
import { IState } from "../slices";
import wrapper from "../store";

export default function Home({
  user,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  const isLoggedIn = useAppSelector((state: IState) => state.users.isLoggedIn);
  return (
    <div>
      <Title title="Home" />
    </div>
  );
}

// 사용 예시
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    // const user = await useMe(
    //   "" // 서버 로그인을 통해 발급받은 jwt토큰 값
    // );
    return {
      props: {
        value: 1,
        // user,
      },
    };
  });
