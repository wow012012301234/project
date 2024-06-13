import "./q&a.css";
import { useState } from "react";
const QA = ({ ques, answer }) => {
  const [state, setState] = useState(false);

  return (
    <div
      className=" row qa-cont gradient__bg  "
      onClick={() => {
        setState(!state);
      }}
    >
      <div className=" col-11 ques  ">
        <h3>{ques}</h3>
      </div>
      <div className=" col-1 ques-pon">
        {state && <span>-</span>}
        {!state && <span>+</span>}
      </div>
      {state && (
        <div className="col-12 answer ">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
export default QA;
