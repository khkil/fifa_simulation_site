import { useState } from "react";

const Grades = ({ grade, setGrade }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (value) => {
    setGrade(value);
    //setOpen(false);
  };
  return (
    <div class="dropdown dropdown-hover" onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
      <div tabindex={grade} role="button" class="btn">
        <img src={`/images/strong/${grade}.png`} onClick={() => {}} />
      </div>
      <ul tabindex={grade} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
        {open &&
          Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
            <li key={v}>
              <a
                onClick={() => {
                  handleClick(v);
                }}
              >
                <img key={v} src={`/images/strong/${v}.png`} />
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Grades;
