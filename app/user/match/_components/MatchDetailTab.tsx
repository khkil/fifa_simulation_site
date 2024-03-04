interface Props {
  tabIndex: number;
  setTabIndex: (v: number) => void;
}

const tabData: {
  title: string;
}[] = [
  {
    title: "기록",
  },
  {
    title: "라인업",
  },
];

export default function MatchDetailTab({ tabIndex, setTabIndex }: Props) {
  return (
    <ul className="text-sm font-medium text-center text-gray-500 rounded-xl shadow sm:flex w-44">
      {tabData.map(({ title }, index) => (
        <li key={index} className="w-full">
          <a
            className={`inline-block w-full p-4 text-gray-900 border shadow-md border-gray-200 
              ${index === tabIndex ? "bg-white" : "bg-gray-300 cursor-pointer hover:bg-gray-50 "} 
              ${index === 0 ? "rounded-s-lg " : index === tabData.length - 1 ? "rounded-r-lg " : ""}`}
            onClick={() => {
              setTabIndex(index);
            }}
            aria-current="page"
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}
