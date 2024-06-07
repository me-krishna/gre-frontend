import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { useTimer } from "react-timer-hook";
import { IoTimeOutline } from "react-icons/io5";
const SectionHeading = ({
  currentSection,
  totalSections,
  currentQuestion,
  totalQuestions,
  sectionTime,
  step,
  sectionTimerExpired,
}: {
  currentSection: number;
  totalSections: number;
  currentQuestion: number;
  totalQuestions: number;
  sectionTime: number;
  step: number;
  sectionTimerExpired: () => void;
}) => {
  const [showTimer, setShowTimer] = useState(true);
  const time = new Date();
  time.setSeconds(time.getSeconds() + sectionTime);
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => sectionTimerExpired(),
  });

  console.info(
    currentSection,
    totalSections,
    currentQuestion,
    totalQuestions,
    sectionTime,
    step,
    "props"
  );

  return (
    <div className="bg-[#f0e1e4] px-3 py1 flex justify-between items-center border-y border-t-2 border-t-[#882f5c] border-b-[#b4b4b4]">
      {step === 1 && (
        <>
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
                  <IoTimeOutline /> Show Time{" "}
                </>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionHeading;
