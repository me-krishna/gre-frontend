import { FC, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import QuestionExplination from "./QuestionExplination";

interface PassageQuestionProps {
  question: any;
  answerMode: boolean;
}

const PassageQuestion: FC<PassageQuestionProps> = ({
  question,
  answerMode,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
  );

  console.log("PassageQuestion", question);

  useEffect(() => {
    if (answerMode === true) {
      setSelectedOptions(
        question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
      );
    } else {
      setSelectedOptions(
        question.correct_ans !== "" ? JSON.parse(question.correct_ans) : question?.non_blanks?.answer
      );
    }
  }, [answerMode, question]);

  return (
    <>
      <div className="h-[65vh] flex justify-center items-start w-full gap-1 m-1">
        <div
          className="text-sm w-1/2 text-justify p-2 border border-[#6c757d] rounded-tl rounded-bl h-full"
          dangerouslySetInnerHTML={{ __html: question.passage }}
        ></div>
        <div className="w-1/2 p-1 h-full border border-[#6c757d]">
          <div className="h-full flex justify-between flex-col">
            <div>
              <div>
                {question?.question_config?.isThereHeaderInfo === true && (
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                      {question?.question_config?.header_info}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="font-light">
                  <div
                    className="text-center font-semibold"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  ></div>
                  <div>
                    {question?.non_blanks?.options.map(
                      (option: any, idx: number) => (
                        <div key={v4()} className="flex items-center gap-2">
                          <input
                            readOnly
                            disabled
                            name={question.question_id + "_options"}
                            id={question.question_id + "_options" + idx}
                            type={
                              question.non_blanks.answer.length > 1
                                ? "checkbox"
                                : "radio"
                            }
                            checked={selectedOptions?.includes(idx + 1)}
                            value={idx + 1}
                          />
                          <label
                            htmlFor={question.question_id + "_options" + idx}
                            dangerouslySetInnerHTML={{
                              __html: option,
                            }}
                          ></label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {question?.question_config?.isThereFooterInfo === true && (
                <div className="flex justify-center mb-3">
                  <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                    {question?.question_config?.footer_info}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!answerMode && (
        <div className="w-full my-2">
          <QuestionExplination explination={question?.explination} />
        </div>
      )}
    </>
  );
};

export default PassageQuestion;
