import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import QuestionExplination from "./QuestionExplination";

interface IBlanksQuestion {
  question: any;
  answerMode: boolean;
}

const BlanksQuestion: FC<IBlanksQuestion> = ({ question, answerMode }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[][]>(
    question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
  );

  useEffect(() => {
    if (answerMode === true) {
      setSelectedOptions(
        question?.attempt_ans !== "" ? JSON.parse(question?.attempt_ans) : []
      );
    } else {
      setSelectedOptions(
        question?.correct_ans !== "" ? JSON.parse(question?.correct_ans) : []
      );
    }
  }, [answerMode, question]);

  return (
    <>
      <div className="h-full flex justify-center items-center text-[#303030] h-screen">
        <div className="font-light">
          <div className="flex justify-center flex-col items-center gap-2">
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
                        selectedOptions[idx].includes(idxi + 1)
                          ? "bg-[#0d0d0d] text-white"
                          : "bg-white"
                      }`}
                    >
                      <span
                        className={`cursor-pointer px-3 min-w-[100px] max-w-[200px]`}
                        dangerouslySetInnerHTML={{ __html: option }}
                      ></span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {!answerMode && (
            <div>
              <QuestionExplination explination={question?.explination} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlanksQuestion;
