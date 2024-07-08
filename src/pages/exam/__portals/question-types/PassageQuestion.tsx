import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

interface PassageQuestionProps {
  question: any;
  CorrectAnsUpdate: (correctAns: string, obj: any) => void;
  AttemptAnsUpdate: (attemptAns: string, obj: any) => void;
}

const PassageQuestion: FC<PassageQuestionProps> = ({
  question,
  CorrectAnsUpdate,
  AttemptAnsUpdate,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = Number(event.target.value);
    setSelectedOptions((prevOptions) => {
      let newOptions = [...prevOptions];
      const checkMinLength = question.non_blanks.answer.length > 1;
      const currentOptions = newOptions ?? [];
      const maxOptionsLength = question.non_blanks.answer?.length || 0;

      if (checkMinLength) {
        if (prevOptions.includes(optionValue)) {
          newOptions = currentOptions.filter(
            (option) => option !== optionValue
          );
        } else {
          newOptions =
            currentOptions.length < maxOptionsLength
              ? [...currentOptions, optionValue]
              : [...currentOptions.slice(0, -1), optionValue];
        }
      } else {
        newOptions = [optionValue];
      }
      AttemptAnsUpdate(JSON.stringify(newOptions), question);
      return newOptions;
    });
  };

  useEffect(() => {
    if (question.correct_ans === "") {
      CorrectAnsUpdate(JSON.stringify(question.non_blanks.answer), question);
    }
    setSelectedOptions(JSON.parse(question.attempt_ans || "[]"));
  }, [question]);

  return (
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
      <div className="flex justify-center items-stretch w-full gap-1 m-1 ">
        <div
          className="text-sm w-1/2 text-justify p-2 border border-[#6c757d] rounded-tl rounded-b"
          dangerouslySetInnerHTML={{ __html: question.passage }}
        ></div>
        <div className="w-1/2 p-1 border border-[#6c757d]">
          <div className="h-full flex justify-between flex-col">
            <div className="font-light">
              <div
                className="text-start font-semibold mb-3"
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
              <div>
                {question?.non_blanks?.options.map(
                  (option: any, idx: number) => (
                    <div key={v4()} className="flex items-center gap-2">
                      <input
                        name={question.question_id + "_options"}
                        id={question.question_id + "_options" + idx}
                        type={
                          question.non_blanks.answer.length > 1
                            ? "checkbox"
                            : "radio"
                        }
                        checked={
                          selectedOptions !== null &&
                          selectedOptions?.includes(idx + 1)
                        }
                        value={idx + 1}
                        onChange={handleOptionChange}
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
  );
};

export default PassageQuestion;
