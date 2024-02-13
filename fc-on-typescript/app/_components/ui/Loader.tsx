import { BeatLoader } from "react-spinners";

interface Props {
  description?: string;
}

export default function Loader({ description }: Props) {
  return (
    <div className={"h-screen flex justify-center items-center"}>
      <div className={"text-center"}>
        <BeatLoader size={15} aria-label="Loading Spinner" data-testid="loader" />
        {description ? <div className={"text-gray-400 py-1"}>{description}</div> : null}
      </div>
    </div>
  );
}
