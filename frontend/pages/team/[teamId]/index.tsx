import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Title from "../../../components/Title";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IUser } from "../../../interface/user";
import { userSelector } from "../../../slices/users";

interface IUserInfo {
  _id: string;
  nickname: string;
}

export default function Team() {
  const user = useAppSelector(userSelector);
  const router = useRouter();
  const { teamId, teamName } = router.query;
  const [leader, setLeader] = useState<IUserInfo>();
  const [members, setMembers] = useState<IUserInfo[]>();

  useEffect(() => {
    if (!router.isReady) return;
    async function fetchAndSetMembers() {
      await axios
        .get(`${process.env.backendUrl}/team/${teamId}/members`, {
          headers: {
            "x-jwt": user?.token!,
          },
        })
        .then(
          ({
            data: { leader, members },
          }: {
            data: { leader: IUser[]; members: IUser[] };
          }) => {
            const tempLeader = {
              _id: leader[0]._id,
              nickname: leader[0].nickname,
            };
            const tempMembers = members.map((member) => {
              return {
                _id: member._id,
                nickname: member.nickname,
              };
            });
            setLeader(tempLeader);
            setMembers(tempMembers);
          }
        );
    }
    fetchAndSetMembers();
  }, [router.isReady]);

  console.log(leader, members);
  const testTeamData = {
    name: "team",
    leader: {
      nickname: "leader",
    },
    members: [{ nickname: "member1" }, { nickname: "member2" }],
    raids: [
      {
        bossName: "boss",
        targetDate: "2022-06-12 22:15",
        characters: [
          { name: "코마호", level: 1571, job: "창술사", server: "카마인" },
          { name: "코다치", level: 140, job: "리퍼", server: "카마인" },
        ],
      },
    ],
  };
  return (
    <div>
      <Title title={`Team ${teamName}`} />
    </div>
  );
}
