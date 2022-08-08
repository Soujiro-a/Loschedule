import Link from "next/link";
import React from "react";
import { ITeamInfoProps } from "../interface/team";

const TeamInfoCard: React.FC<ITeamInfoProps> = ({
  memberCount,
  teamName,
  teamId,
  members,
  raids,
  leader,
}) => {
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {teamName}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        참가자 : {memberCount}명
      </p>
      <Link
        href={{
          pathname: `/team/${teamId}`,
          query: { teamId, teamName, leader, members, raids },
        }}
        as={`/team/${teamId}`}
      >
        <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          팀 바로가기
        </a>
      </Link>
    </div>
  );
};

export default TeamInfoCard;
