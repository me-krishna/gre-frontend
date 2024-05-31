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
    <div className="h-full w-full flex justify-center items-center text-[#303030]">
      <div className="font-light">
        <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
        <div className="">
          {question?.non_blanks?.options.map((option: any, idx: number) => (
            <div key={v4()} className="flex items-center gap-2">
              <input
                name={question.question_id + "_options"}
                id={question.question_id + "_options" + idx}
                type={
                  question.non_blanks.answer.length > 1 ? "checkbox" : "radio"
                }
                checked={selectedOptions.includes(idx + 1)}
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
