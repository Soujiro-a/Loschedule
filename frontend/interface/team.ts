export interface ITeam {
  _id: string;
  name: string;
  leader: string;
  members: string[];
  raids: string[];
  __v: number;
}

export interface ITeamInfoProps {
  members: string[];
  memberCount: number;
  teamName: string;
  teamId: string;
  raids: string[];
  leader: string;
}

export interface ICreateTeamForm {
  teamName: string;
}
