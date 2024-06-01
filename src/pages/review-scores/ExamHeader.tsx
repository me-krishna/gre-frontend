import { FaLeftLong } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { FaRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ExamButton from "../../components/ui/ExamButton";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
interface Props {
  testName: string;
  step: number;
  onClick: (name: string, id: number) => void;
  isThisQuestion: boolean;
  question_marked: number;
  currentSectionQuestionNumber: number;
  currentQuestionAnswerModeChange: (a: boolean) => void;
}

const ExamHeader: React.FC<Props> = ({
  testName,
  step,
  onClick,
  isThisQuestion,
  question_marked,
  currentSectionQuestionNumber,
  currentQuestionAnswerModeChange,
}) => {
  const [showBtns, setShowBtns] = useState<number[]>([9]);
  const [isMyAnswer, setIsMyAnswer] = useState<boolean>(true);
  const examButtons = [
    {
      id: 1,
      name: "Exit Section",
      icon: <BsFillDoorOpenFill size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#6d5867, #5c4657)",
        borderColor: "#9B8696",
      },
    },
    {
      id: 6,
      name: "Review",
      icon: <FaBookmark size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#585858, #434244)",
        borderColor: "##9A9A9A",
      },
    },
    {
      id: 7,
      name: "Return",
      icon: <FaLeftLong size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#3b69a0, #305481)",
      },
    },
    {
      id: 8,
      name: "Back",
      icon: <FaLeftLong size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#3b69a0, #305481)",
        borderColor: "#89A4C6",
      },
    },
    {
      id: 9,
      name: "Next",
      icon: <FaRightLong size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#3b69a0, #305481)",
        borderColor: "#89A4C6",
      },
    },
    {
      id: 10,
      name: "Continue",
      icon: <FaRightLong size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#3b69a0, #305481)",
        borderColor: "#89A4C6",
      },
    },
    {
      id: 11,
      name: "Go to Question",
      icon: <FiTarget size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#3b69a0, #305481)",
      },
    },
    {
      id: 12,
      name: "Exit Section",
      icon: <BsFillDoorOpenFill size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#6d5867, #5c4657)",
        borderColor: "#9B8696",
      },
    },
  ];

  useEffect(() => {
    const buttons =
      isThisQuestion === true
        ? [1, 6, 8, 9]
        : step === 6
        ? [7, 11]
        : step === 5
        ? [7, 13]
        : step === 4
        ? [7, 12]
        : step === 7 || step === 10
        ? [10]
        : [7, 10];
    setShowBtns(buttons);
  }, [isThisQuestion, step]);

  const activatedBtns = examButtons.filter((btn) => showBtns.includes(btn.id));

  return (
    <header className="bg-[#3a3736] height-[54px] ">
      <nav>
        <div className="flex flex-wrap items-center justify-between mx-auto py-1 px-2">
          <div className="flex items-center justify-center gap-3">
            <h2 className="capitalize text-white font-medium text-[15px] ">
              {testName}
            </h2>
            <div className="flex justify-start bg-[#70426d] h-[45px] items-center p-2 rounded-md gap-2">
              <button
                className="flex gap-1 justify-center items-center p-1 border-2 border-white rounded-md "
                onClick={() => {
                  setIsMyAnswer(true);
                  currentQuestionAnswerModeChange(true);
                }}
              >
                {isMyAnswer ? (
                  <MdRadioButtonChecked size={20} className="text-white" />
                ) : (
                  <MdRadioButtonUnchecked size={20} className="text-white" />
                )}

                <span className="text-white text-[15px]">My Answer</span>
              </button>
              <button
                className="flex gap-1 justify-center items-center p-1 border-2 border-white rounded-md"
                onClick={() => {
                  setIsMyAnswer(false);
                  currentQuestionAnswerModeChange(false);
                }}
              >
                {isMyAnswer ? (
                  <MdRadioButtonUnchecked size={20} className="text-white" />
                ) : (
                  <MdRadioButtonChecked size={20} className="text-white" />
                )}

                <span className="text-white text-[15px]">Correct Answer</span>
              </button>
            </div>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
            {activatedBtns.map((btn, index) => (
              <ExamButton
                disabled={currentSectionQuestionNumber === 1 && btn.id === 8}
                key={v4()}
                name={btn.name}
                icon={btn.icon}
                onClick={() => onClick(btn.name, btn.id)}
                style={btn.style}
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ExamHeader;
