import { useRouter } from "next/router";
import { useState } from "react";

const NicknameSearchBox = ({ pathname }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState(router.query?.nickname || "");

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  const onSubmit = (e) => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    router.push({
      pathname: pathname || router.pathname,
      query: {
        nickname: e.target.value,
      },
    });
  };

  return (
    <div className="relative m-3">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ring-1 ring-slate-700 focus:ring-slate-700"
        placeholder="유저 닉네임을 입력해주세요."
        value={nickname}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button
        type="button"
        className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-slate-700 rounded-e-lg border"
        onClick={onSubmit}
      >
        <svg className="w-10 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default NicknameSearchBox;
