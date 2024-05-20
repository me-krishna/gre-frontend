import { FC } from "react";
import { v4 } from "uuid";

interface IBlanksQuestion {
  question: any;
}

const BlanksQuestion: FC<IBlanksQuestion> = ({ question }) => {
  console.log(question, "question");
  return (
    <div className="h-full flex justify-center items-center border border-[#4f4f4f] text-[#303030]">
      <div className="font-light">
        <div
          className="mb-5"
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
                  className="flex items-center gap-2 border border-collapse border-[#4f4f4f]"
                >
                  <span
                    className="cursor-pointer px-3 min-w-[100px] max-w-[200px]"
                    dangerouslySetInnerHTML={{ __html: option }}
                  ></span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlanksQuestion;
