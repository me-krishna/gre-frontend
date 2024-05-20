import { FC } from "react";
import { v4 } from "uuid";

interface PassageQuestionProps {
  question: any;
}

const PassageQuestion: FC<PassageQuestionProps> = ({ question }) => {
  console.log(question, "component");
  return (
    <div className="h-full flex justify-center items-start w-full px-2 sm:px-10 md:px-28 gap-3">
      <div
        className="text-sm w-1/2 text-justify p-2 border h-auto border-[#6c757d] rounded-tl rounded-bl"
        dangerouslySetInnerHTML={{ __html: question.passage }}
      ></div>
      <div className="w-1/2 p-1 h-full">
        <div className="h-full">
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
