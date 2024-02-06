interface Props {
  playerName: string;
  seasonImgUrl: string;
}

export default function PlayerWithSeason({ playerName, seasonImgUrl }: Props) {
  return (
    <div className="flex items-center">
      <img src={seasonImgUrl} className="w-7 h-5 mr-1" />
      <p className="font-bold text-base">{playerName}</p>
    </div>
  );
}
