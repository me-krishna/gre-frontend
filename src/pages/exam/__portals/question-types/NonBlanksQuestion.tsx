import { FC, useEffect } from "react";
import { v4 } from "uuid";

interface NonBlanksQuestionProps {
  question: any;
  CorrectAnsUpdate: (correctAns: string, obj: any) => void;
}

const NonBlanksQuestion: FC<NonBlanksQuestionProps> = ({
  question,
  CorrectAnsUpdate,
}) => {
  console.info("NonBlanksQuestionProps", question);
  // console.log(question.non_blanks.answer);

  useEffect(() => {
    if (question.correct_ans === "") {
      console.log("Correct Answer is Empty");
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
