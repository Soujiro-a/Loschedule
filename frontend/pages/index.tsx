import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import { useMe } from "../hooks/useMe";
import { IState } from "../slices";
import wrapper from "../store";

export default function Home({
  user,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  const isLoggedIn = useSelector((state: IState) => state.users.isLoggedIn);
  return (
    <div>
      <Title title="Home" />
    </div>
  );
}

// 사용 예시
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async () => {
//     const user = await useMe(
//       "" // 서버 로그인을 통해 발급받은 jwt토큰 값
//     );
//     return {
//       props: {
//         value: store.getState(),
//         user,
//       },
//     };
//   });
