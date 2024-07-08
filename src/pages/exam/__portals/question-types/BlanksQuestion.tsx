import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
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
  const [selectedOptions, setSelectedOptions] = useState<number[][]>([]);
  const handleOptionChange = (blankNo: number, optionNo: number) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...(prevOptions ?? [])];
      const blankIndex = blankNo - 1;
      const currentOptions = newOptions[blankIndex] ?? [];
      const isOptionSelected = currentOptions.includes(optionNo);
      const maxOptionsLength = question?.blanks[blankIndex].answer?.length || 0;

      if (!maxOptionsLength || maxOptionsLength <= 1) {
        newOptions[blankIndex] = [optionNo];
      } else if (isOptionSelected) {
        newOptions[blankIndex] = currentOptions.filter(
          (option) => option !== optionNo
        );
      } else if (currentOptions.length < maxOptionsLength) {
        newOptions[blankIndex] = [...currentOptions, optionNo];
      } else {
        newOptions[blankIndex] = [...currentOptions.slice(0,-1), optionNo];
      }

      AttemptAnsUpdate(JSON.stringify(newOptions), question);
      return newOptions;
    });
  };

  useEffect(() => {
    const hasAttemptAns = question.attempt_ans && question.attempt_ans !== "[]";
    setSelectedOptions(hasAttemptAns ? JSON.parse(question.attempt_ans) : []);

    if (!question.correct_ans) {
      const correctAnswers = question.blanks.map(({ answer }: any) => answer);
      CorrectAnsUpdate(JSON.stringify(correctAnswers), question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  return (
    <div className="flex justify-center text-[#303030]">
      <div className="font-light">
        <div
          className="mb-5 text-center font-semibold"
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
                    selectedOptions &&
                    selectedOptions[idx] &&
                    selectedOptions[idx]?.includes(idxi + 1)
                      ? "bg-[#0d0d0d] text-white"
                      : "bg-white"
                  }`}
                >
                  <span
                    onClick={() => handleOptionChange(idx + 1, idxi + 1)}
                    className={`cursor-pointer px-3 min-w-[100px] w-full max-w-[300px]`}
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
