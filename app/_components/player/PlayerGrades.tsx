import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  grade: number;
  setGrade: (grade: number) => void;
}
export default function PlayerGrades({ grade, setGrade }: Props) {
  const [open, setOpen] = useState(false);
  const handleClick = (value: number) => {
    setGrade(value);
    //setOpen(false);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img className={"h-5"} src={`/images/strong/${grade}.png`} />
          <ChevronDownIcon className="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg  focus:outline-none">
        <div className="py-1 text-center">
          {Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
            <Menu.Item key={v}>
              {({ active }) => (
                <div
                  className={"py-1 cursor-pointer"}
                  onClick={() => {
                    handleClick(v);
                  }}
                >
                  <div className={"flex justify-center hover:filter hover:opacity-50"}>
                    <img className={"h-5"} key={v} src={`/images/strong/${v}.png`} />
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
    // <div className="dropdown dropdown-hover" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
    //   <div tabIndex={grade} role="button" className="btn">
    //     <img src={`/images/strong/${grade}.png`} onClick={() => {}} />
    //   </div>
    //   <ul tabIndex={grade} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
    //     {open &&
    //       Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
    //         <li key={v}>
    //           <a
    //             onClick={() => {
    //               handleClick(v);
    //             }}
    //           >
    //             <img key={v} src={`/images/strong/${v}.png`} />
    //           </a>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  );
}
