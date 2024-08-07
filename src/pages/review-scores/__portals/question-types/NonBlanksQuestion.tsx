import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import QuestionExplination from "./QuestionExplination";

interface NonBlanksQuestionProps {
  question: any;
  answerMode: boolean;
}

const NonBlanksQuestion: FC<NonBlanksQuestionProps> = ({
  question,
  answerMode,
}) => {


  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    question.attempt_ans !== "" ? JSON.parse(question.attempt_ans) : []
  );

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
    <div className="h-full w-full flex justify-center items-center text-[#303030]">
      <div className="font-light">
        <div className="flex justify-center flex-col items-center gap-2">
          <div
            className="text-center font-semibold"
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></div>
          <div>
            {question?.non_blanks?.options.map((option: any, idx: number) => (
              <div key={v4()} className="flex items-center gap-2">
                <input
                  readOnly
                  disabled
                  name={question.question_id + "_options"}
                  id={question.question_id + "_options" + idx}
                  type={
                    question.non_blanks.answer.length > 1 ? "checkbox" : "radio"
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
  );
};

export default NonBlanksQuestion;
