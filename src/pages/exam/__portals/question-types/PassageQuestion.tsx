import { FC, useEffect, useRef, useState } from "react";
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
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = Number(event.target.value);
    if (question.non_blanks.answer.length > 1) {
      setSelectedOptions((prevOptions) =>
        prevOptions.includes(optionValue)
          ? prevOptions.filter((option) => option !== optionValue)
          : [...prevOptions, optionValue]
      );
    } else {
      setSelectedOptions([optionValue]);
    }
  };

  useEffect(() => {
    AttemptAnsUpdate(JSON.stringify(selectedOptions), question);
  }, [selectedOptions]);

  useEffect(() => {
    if (question.correct_ans === "") {
      CorrectAnsUpdate(JSON.stringify(question.non_blanks.answer), question);
    }
  }, []);

  return (
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
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></div>
                <div className="">
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
                          checked={selectedOptions!==null && selectedOptions.includes(idx + 1)}
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
  );
};

export default PassageQuestion;
