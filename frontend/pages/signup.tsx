import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import FormError from "../components/FormError";
import Title from "../components/Title";
import { ICreateUserForm } from "../interface/user";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
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
    await axios.post(`${process.env.backendUrl}/user`, {
      nickname: id,
      password,
    });
    setLoading(false);

    router.replace("/login");
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Title title="Sign Up" />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome Loschedule
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("id", {
              required: "아이디는 필수 입력 항목입니다",
              pattern: /^[a-z]+[a-zA-Z0-9]{5,19}$/g,
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
          {errors.id?.type === "pattern" && (
            <FormError
              errorMessage={"소문자로 시작하는 6~19자의 아이디를 입력해주세요"}
            />
          )}
          <input
            {...register("password", {
              required: "비밀번호는 필수 입력 항목입니다",
              pattern:
                /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
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
          {errors.password?.type === "pattern" && (
            <FormError
              errorMessage={
                "영문, 숫자, 특수문자를 포함한 8~16자의 비밀번호를 입력해주세요"
              }
            />
          )}
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"회원가입"}
          />
        </form>
        <div>
          이미 Loschedule 회원이신가요?{" "}
          <Link href="/login">
            <a className="text-lime-600 hover:underline">로그인하기</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
