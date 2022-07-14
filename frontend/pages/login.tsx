import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { logInAction } from "../actions/users";
import Button from "../components/Button";
import FormError from "../components/FormError";
import Title from "../components/Title";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ICreateUserForm } from "../interface/user";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateUserForm>({
    mode: "onChange",
  });
  const onSubmit = async () => {
    const { id, password } = getValues();

    setLoading(true);
    const resultAction = await dispatch(
      logInAction({ nickname: id, password })
    );
    if (logInAction.fulfilled.match(resultAction)) {
      setErrorMessage(null);
      setLoading(false);
      setTimeout(() => {
        router.replace("/");
      }, 100);
    } else {
      setErrorMessage(resultAction.payload!.errorMessage);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Title title="Login" />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          LogIn Loschedule
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("id", {
              required: "아이디는 필수 입력 항목입니다",
            })}
            name="id"
            type="id"
            required
            placeholder="아이디"
            className="input"
          />
          {errors.id?.message && (
            <FormError errorMessage={errors.id?.message} />
          )}
          <input
            {...register("password", {
              required: "비밀번호는 필수 입력 항목입니다",
            })}
            name="password"
            type="password"
            required
            placeholder="비밀번호"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button canClick={isValid} loading={loading} actionText={"로그인"} />
          {errorMessage && <FormError errorMessage={errorMessage} />}
        </form>
        <div>
          Loschedule 사용이 처음이신가요?{" "}
          <Link href="/signup">
            <a className="text-lime-600 hover:underline">계정 생성하기</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
