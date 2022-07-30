import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import FormError from "../../../components/FormError";
import Title from "../../../components/Title";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ICreateRaidForm } from "../../../interface/raid";

export default function CreateRaid() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateRaidForm>({
    mode: "onChange",
  });
  const onSubmit = async () => {
    // teamId는 Props를 통해 받아오기
    const { bossName, targetDate, characters } = getValues();
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Title title="Create Raid" />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          LogIn Loschedule
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("bossName", {
              required: "보스 이름은 필수 입력 항목입니다",
            })}
            name="bossName"
            type="bossName"
            required
            placeholder="보스 이름"
            className="input"
          />
          {errors.bossName?.message && (
            <FormError errorMessage={errors.bossName?.message} />
          )}
          <input
            {...register("targetDate", {
              required: "출발 날짜 및 시간은 필수 입력 항목입니다",
            })}
            name="targetDate"
            type="targetDate"
            required
            placeholder="출발 시간"
            className="input"
          />
          {errors.bossName?.message && (
            <FormError errorMessage={errors.bossName?.message} />
          )}
          <input
            {...register("characters")}
            name="characters"
            type="characters"
            required
            placeholder="캐릭터 목록"
            className="input"
          />
          {errors.bossName?.message && (
            <FormError errorMessage={errors.bossName?.message} />
          )}
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"레이드 생성"}
          />
          {errorMessage && <FormError errorMessage={errorMessage} />}
        </form>
      </div>
    </div>
  );
}
