import { FC } from "react";
import { v4 } from "uuid";

interface NonBlanksQuestionProps {
  question: any;
}

const NonBlanksQuestion: FC<NonBlanksQuestionProps> = ({ question }) => {
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
