import { useState } from "react";

const Grades = ({ grade, setGrade }) => {
  const [open, setOpen] = useState(false);
  return (
    <div class="dropdown dropdown-hover" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
      <div tabindex={grade} role="button" class="btn m-1">
        <img src={`/images/strong/${grade}.png`} onClick={() => {}} />
      </div>
      <ul tabindex={grade} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
        {open &&
          Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
            <li key={v}>
              <a
                onClick={() => {
                  setGrade(v);
                }}
              >
                <img key={v} src={`/images/strong/${v}.png`} />
              </a>
            </li>
          ))}
      </ul>
    </div>
    /* <div className="relative z-[1]"  onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
      <div className="">
        <div tabIndex={grade} role="button" className="btn">
          <img src={`/images/strong/${grade}.png`} onClick={() => {}} />
        </div>
        {open && (
          <ul tabIndex={grade} className="dropdown-content absolute z-10  menu shadow bg-base-100 rounded-box">
            {Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
              <li key={v}>
                <a
                  onClick={() => {
                    setGrade(v);
                  }}
                >
                  <img key={v} src={`/images/strong/${v}.png`} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> */
  );
};

export default Grades;
