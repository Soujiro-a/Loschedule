import axios from "axios";
import { useEffect, useState } from "react";
import TeamInfoCard from "../../components/TeamInfoCard";
import Title from "../../components/Title";
import { useMe } from "../../hooks/useMe";
import { ITeam, ITeamInfoProps } from "../../interface/team";

export default function TeamList() {
  const user = useMe({});
  const [teams, setTeams] = useState<ITeam[]>();

  useEffect(() => {
    async function fetchAndSetTeams() {
      const {
        data: { teams: teamsInfo },
      }: { data: { teams: ITeam[] } } = await axios.get(
        `${process.env.backendUrl}/user/${user?.nickname!}`
      );
      setTeams(teamsInfo);
    }
    fetchAndSetTeams();
  }, []);

  const testTeamData = [
    {
      id: "1",
      name: "team1",
      memberCount: 1,
    },
    {
      id: "2",
      name: "team2",
      memberCount: 2,
    },
  ];

  return (
    <div className="h-screen py-5">
      <Title title="Team" />

      <div className="">
        {teams?.map(({ _id, leader, members, name, raids }, idx) => (
          <TeamInfoCard
            leader={leader}
            members={members}
            memberCount={members.length + 1}
            teamName={name}
            teamId={_id}
            key={idx}
            raids={raids}
          />
        ))}
      </div>
    </div>
  );
}
