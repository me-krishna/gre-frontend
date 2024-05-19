import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useTimer } from "react-timer-hook";

const SectionHeading = ({
  currentSection,
  totalSections,
  currentQuestion,
  totalQuestions,
  sectionTime,
}: {
  currentSection: number;
  totalSections: number;
  currentQuestion: number;
  totalQuestions: number;
  sectionTime: number;
}) => {
  const [showTimer, setShowTimer] = useState(true);
  const time = new Date();
  time.setSeconds(time.getSeconds() + sectionTime);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="bg-[#ffcccc] px-3 py1 flex justify-between items-center">
      <div>
        <span className=" font-extrabold">
          {" "}
          Section {currentSection} of {totalSections}
        </span>
        <span className="font-light">
          | Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <div className="flex gap-2">
        <div className={`${!showTimer ? "hidden" : ""}`}>
          <span>{hours.toString().padStart(2, "0")}</span>:
          <span>{minutes.toString().padStart(2, "0")}</span>:
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        <span
          onClick={() => setShowTimer(!showTimer)}
          className="font-thin text-sm flex gap-1 items-center cursor-pointer text-[#353535]"
        >
          {showTimer ? (
            <>
              {" "}
              <CiCircleMinus /> Hide Time{" "}
            </>
          ) : (
            <>
              {" "}
              <CiCirclePlus /> Show Time{" "}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default SectionHeading;
