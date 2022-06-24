import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import FormError from "../components/FormError";
import Title from "../components/Title";
import { IUserForm } from "../interface/user";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IUserForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { id, password } = getValues();
    console.log(id, password);
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
              pattern: /^[a-z]+[a-z0-9]{5,19}$/g,
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
            <FormError errorMessage={"6자 이상의 아이디를 입력해주세요"} />
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
