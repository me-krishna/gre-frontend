import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

interface NonBlanksQuestionProps {
  question: any;
  CorrectAnsUpdate: (correctAns: string, obj: any) => void;
  AttemptAnsUpdate: (attemptAns: string, obj: any) => void;
}

const NonBlanksQuestion: FC<NonBlanksQuestionProps> = ({
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
    <div className="w-full flex justify-center items-center text-[#303030] h-screen">
      <div className="font-light">
        <div
          className="text-center font-semibold"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></div>
        <div>
          {question?.non_blanks?.options.map((option: any, idx: number) => (
            <div key={v4()} className="flex items-center gap-2">
              <input
                name={question.question_id + "_options"}
                id={question.question_id + "_options" + idx}
                type={
                  question.non_blanks.answer.length > 1 ? "checkbox" : "radio"
                }
                checked={selectedOptions?.includes(idx + 1)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonBlanksQuestion;
