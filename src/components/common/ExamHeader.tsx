import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaCalculator } from "react-icons/fa6";
import { FaRegSave, FaSignOutAlt } from "react-icons/fa";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { BsQuestion } from "react-icons/bs";

import ExamButton from "../ui/ExamButton";
import { useState } from "react";
interface Props {
  testName: string;
  step: number;
}

const ExamHeader: React.FC<Props> = ({ testName, step }) => {
  const buttonsshowData: {
    [key: string]: number[];
  } = {
    "1": [9],
    "2": [2, 5, 9],
  };
  const [showBtns, setShowBtns] = useState<number[]>(
    buttonsshowData[step.toString()]
  );
  const examButtons = [
    {
      id: 1,
      name: "Exit Section",
      icon: <FaSignOutAlt />,
      show: true,
    },
    {
      id: 2,
      name: "Quit & Save",
      icon: <FaRegSave />,
      show: true,
    },
    {
      id: 3,
      name: "Calculator ",
      icon: <FaCalculator />,
      show: true,
    },
    {
      id: 4,
      name: "Mark",
      icon: <RiCheckboxBlankFill />,
      show: true,
    },
    {
      id: 5,
      name: "Help",
      icon: <BsQuestion />,
      show: true,
    },
    {
      id: 6,
      name: "Return",
      icon: <BsQuestion />,
      show: true,
    },
    {
      id: 7,
      name: "Back",
      icon: <FaArrowLeft />,
      show: true,
    },
    {
      id: 8,
      name: "Next",
      icon: <FaArrowRight />,
      show: true,
    },
    {
      id: 9,
      name: "Continue",
      icon: <FaArrowRight />,
      show: true,
    },
    {
      id: 10,
      name: "Go to Question",
      icon: <RiCheckboxBlankCircleFill />,
      show: true,
    },
  ];

  const activatedBtns = examButtons.filter((btn) => showBtns.includes(btn.id));

  return (
    <header className="bg-[#343a40]">
      <nav>
        <div className="flex flex-wrap items-center justify-between mx-auto py-1 px-2">
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="/images/logo.png"
                className="h-[50px]"
                alt="Dr Raju's Education Academy Logo"
              />
            </Link>
            <h2 className="capitalize text-white font-bold">{testName}</h2>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
            {activatedBtns.map((btn, index) => (
              <ExamButton name={btn.name} icon={btn.icon} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ExamHeader;
