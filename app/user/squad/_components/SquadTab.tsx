interface Props {
  tabIndex: number;
  setTabIndex: (v: number) => void;
}

const tabData: {
  title: string;
}[] = [
  {
    title: "프로필",
  },
  {
    title: "구단정보",
  },
];

export default function SquadTab({ tabIndex, setTabIndex }: Props) {
  return (
    <ul className="text-sm font-medium text-center text-gray-500 rounded-xl shadow sm:flex w-96">
      {tabData.map(({ title }, index) => (
        <li key={index} className="w-full">
          <a
            className={`inline-block w-full p-4 text-gray-900 border shadow-md border-gray-200 
              ${index === tabIndex ? "bg-gray-300 " : "hover:bg-gray-100 bg-white cursor-pointer"} 
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
