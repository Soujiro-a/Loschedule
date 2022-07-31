import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import FormError from "../components/FormError";
import Title from "../components/Title";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ICreateTeamForm } from "../interface/team";

export default function CreateTeam() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateTeamForm>({
    mode: "onChange",
  });
  const onSubmit = async () => {
    const { teamName } = getValues();
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Title title="Create Team" />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          LogIn Loschedule
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("teamName", {
              required: "팀 이름은 필수 입력 항목입니다",
            })}
            name="teamName"
            type="teamName"
            required
            placeholder="팀 명"
            className="input"
          />
          {errors.teamName?.message && (
            <FormError errorMessage={errors.teamName?.message} />
          )}
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"팀 만들기"}
          />
          {errorMessage && <FormError errorMessage={errorMessage} />}
        </form>
      </div>
    </div>
  );
}
