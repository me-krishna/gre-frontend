import { FaCalculator, FaLeftLong } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import ExamButton from "../ui/ExamButton";
import { FaRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
interface Props {
  testName: string;
  step: number;
  onClick: (name: string) => void;
  isThisQuestion: boolean;
  question_marked: number;
}

const ExamHeader: React.FC<Props> = ({
  testName,
  step,
  onClick,
  isThisQuestion,
  question_marked,
}) => {
  const [showBtns, setShowBtns] = useState<number[]>([9]);
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
      id: 2,
      name: "Quit & Save",
      icon: <FaRegSave size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#6d5867, #5c4657)",
        borderColor: "#9B8696",
      },
    },
    {
      id: 3,
      name: "Calculator ",
      icon: <FaCalculator size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#585858, #434244)",
        borderColor: "##9A9A9A",
      },
    },
    {
      id: 4,
      name: "Mark",
      icon:
        question_marked === 1 ? (
          <IoMdCheckboxOutline size={20} width={20} />
        ) : (
          <MdCheckBoxOutlineBlank size={20} width={20} />
        ),
      show: true,
      style: {
        backgroundImage: "linear-gradient(#585858, #434244)",
        borderColor: "##9A9A9A",
      },
    },
    {
      id: 5,
      name: "Help",
      icon: <FaRegQuestionCircle size={20} width={20} />,
      show: true,
      style: {
        backgroundImage: "linear-gradient(#585858, #434244)",
        borderColor: "##9A9A9A",
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
  ];

  useEffect(() => {
    const buttons =
      isThisQuestion === true
        ? [1, 2, 4, 5, 6, 8, 9]
        : step === 6
        ? [7, 11]
        : [7, 10];
    setShowBtns(buttons);
  }, [isThisQuestion]);

  const activatedBtns = examButtons.filter((btn) => showBtns.includes(btn.id));

  return (
    <header className="bg-[#3a3736] height-[54px]">
      <nav>
        <div className="flex flex-wrap items-center justify-between mx-auto py-1 px-2">
          <div className="flex items-center justify-center gap-3">
            {/* <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/images/logos/logo.png"
                className="h-[50px] w-1/2 md:w-1/4"
                alt="Dr Raju's Education Academy Logo"
              />
            </Link> */}
            <h2 className="capitalize text-white font-medium text-[15px] ">
              {testName}
            </h2>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
            {activatedBtns.map((btn, index) => (
              <ExamButton
                key={v4()}
                name={btn.name}
                icon={btn.icon}
                onClick={() => onClick(btn.name)}
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
