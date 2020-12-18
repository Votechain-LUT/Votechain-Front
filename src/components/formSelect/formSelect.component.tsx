import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./formSelect.styles.scss";
import { Poll } from "../../types/poll.types";
import arrow from "../../assets/arrow.png";

type Props = {
  polls: Poll[];
  selectPoll: Dispatch<SetStateAction<any>>;
};

const FormSelect: React.FC<Props> = ({ polls, selectPoll }) => {
  const [selected, setSelected] = useState("");
  const [isVisible, setVisibility] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleChange = (poll: Poll) => {
    setSelected(poll.title);
    selectPoll(poll.id);
    setVisibility(false);
  };

  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setVisibility(false);
    }
  };
  return (
    <div className={"formSelect"}>
      <span className={"title"}>Głosowanie</span>
      {polls.length ? (
        <div>
          <div
            className={"selectWrapper"}
            role={"presentation"}
            onClick={() => setVisibility(!isVisible)}
          >
            <div className={"selectedWrapper"}>
              <span className={"selected"}>
                {selected ? selected : polls[0].title}
              </span>
              <img className={"arrowIcon"} src={arrow} alt={"arrow-icon"} />
            </div>

            {isVisible && (
              <div ref={ref} className={"dropdown"}>
                <div className={"optionsWrapper"}>
                  {polls.map((poll) => {
                    return (
                      <div
                        role={"presentation"}
                        onClick={() => handleChange(poll)}
                        className={"pollTitle"}
                        key={poll.id}
                      >
                        <span>{poll.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span>Brak głosowań</span>
      )}
    </div>
  );
};

export default FormSelect;
