import Title from "../../../components/Title";

export default function Raid() {
  const testRaidData = {
    leader: {
      nickname: "leader",
    },
    bossName: "boss",
    targetDate: "2022-06-12 22:15",
    characters: [
      { name: "코마호", level: 1571, job: "창술사", server: "카마인" },
      { name: "코다치", level: 140, job: "리퍼", server: "카마인" },
    ],
  };
  return (
    <div>
      <Title title="Raid" />
    </div>
  );
}
