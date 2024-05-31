import useApi from "../../../../lib/api";
import { FC, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { useReducer } from "react";

const reducer = (
  state: number[][],
  action: { type: string; blankNo: number; optionNo: number }
) => {
  switch (action.type) {
    case "SET_OPTION":
      const newOptions = [...state];
      newOptions[action.blankNo - 1] = [action.optionNo];
      return newOptions;
    default:
      throw new Error();
  }
};
interface IBlanksQuestion {
  question: any;
  CorrectAnsUpdate: (correctAns: string, obj: any) => void;
  AttemptAnsUpdate: (attemptAns: string, obj: any) => void;
}

const BlanksQuestion: FC<IBlanksQuestion> = ({
  question,
  CorrectAnsUpdate,
  AttemptAnsUpdate,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[][]>(
    question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
  );

  const handleOptionChange = (blankNo: number, optionNo: number) => {
    setSelectedOptions((prevOptions: number[][]) => {
      const newOptions = [...prevOptions];
      newOptions[blankNo - 1] = [optionNo];
      return newOptions;
    });
  };

  useEffect(() => {
    AttemptAnsUpdate(JSON.stringify(selectedOptions), question);
  }, [selectedOptions]);

  useEffect(() => {
    if (question.correct_ans === "") {
      CorrectAnsUpdate(
        JSON.stringify(question.blanks.map((item: any) => item.answer)),
        question
      );
    }
  }, []);

  return (
    <div className="h-full flex justify-center items-center text-[#303030]">
      <div className="font-light">
        <div
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></div>
        <div className="flex gap-2 justify-center w-full">
          {question?.blanks.map((blank: any, idx: number) => (
            <div key={v4()}>
              <p className="text-center mb-1">
                Blank ({"".padEnd(idx + 1, "i")})
              </p>
              {blank?.options.map((option: any, idxi: number) => (
                <div
                  key={v4()}
                  className={`flex items-center gap-2 border border-collapse border-[#4f4f4f] ${
                    selectedOptions[idx] &&
                    selectedOptions[idx].includes(idxi + 1)
                      ? "bg-[#0d0d0d] text-white"
                      : "bg-white"
                  }`}
                >
                  <span
                    onClick={() => handleOptionChange(idx + 1, idxi + 1)}
                    className={`cursor-pointer px-3 min-w-[100px] max-w-[200px]`}
                    dangerouslySetInnerHTML={{ __html: option }}
                  ></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlanksQuestion;
