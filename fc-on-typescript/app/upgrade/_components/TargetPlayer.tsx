import { UpgradeTargetPlayer } from "@/app/_types/player";

interface Props {
  targetPlayer: UpgradeTargetPlayer | null;
}

export default function TargetPlayer({ targetPlayer }: Props) {
  return (
    <div className="mx-5 border border-gray-300 rounded-lg bg-gray-100 h-80 flex items-center justify-center">
      {targetPlayer ? <div>{JSON.stringify(targetPlayer)}</div> : <NotSelected />}
    </div>
  );
}

const NotSelected = () => {
  return (
    <div className="flex items-center justify-center text-gray-500">
      <svg className="flex-shrink-0 w-6 h-6 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <h3 className="text-xl font-semibold">강화할 선수를 선택해주세요.</h3>
    </div>
  );
};
