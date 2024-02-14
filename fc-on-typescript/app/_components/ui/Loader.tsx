import { BeatLoader } from "react-spinners";

interface Props {
  description?: string;
  useScreenHeight?: boolean;
}

export default function Loader({ description, useScreenHeight = true }: Props) {
  return (
    <div className={`${useScreenHeight ? "h-screen" : "h-full"} flex justify-center items-center`}>
      <div className={"text-center"}>
        <BeatLoader size={15} aria-label="Loading Spinner" data-testid="loader" />
        {description ? <div className={"text-gray-400 py-1"}>{description}</div> : null}
      </div>
    </div>
  );
}
