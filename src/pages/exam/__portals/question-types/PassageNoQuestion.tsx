import { FC, useState } from "react";

interface PassageNoQuestionProps {
  question: any;
  getAnswer: (answer: string) => void;
}

const PassageNoQuestion: FC<PassageNoQuestionProps> = ({
  question,
  getAnswer,
}) => {
  const [ans, setAns] = useState<string>("");
  console.log(question, "component");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAns(e.target.value);
    getAnswer(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex justify-center items-start w-full px-2 sm:px-10 md:px-28 gap-3">
      <div
        className="text-sm w-1/2 text-justify p-2 border h-auto min-h-[435px] border-[#6c757d] rounded-tl rounded-bl"
        dangerouslySetInnerHTML={{ __html: question.passage }}
      ></div>
      <div className="w-1/2 p-1">
        <div className="flex justify-start items-center gap-2 bg-[#6c757d] w-full p-2 rounded-t">
          <button className="border rounded bg-[#f8f9fa] border-[#f8f9fa] p-1 text-sm text-[#212529] px-3 hover:bg-[#e2e6ea] hover:text-[#212529]">
            Cut
          </button>
          <button className="border rounded bg-[#f8f9fa] border-[#f8f9fa] p-1 text-sm text-[#212529] px-3 hover:bg-[#e2e6ea] hover:text-[#212529]">
            Paste
          </button>
          <button className="border rounded bg-[#f8f9fa] border-[#f8f9fa] p-1 text-sm text-[#212529] px-3 hover:bg-[#e2e6ea] hover:text-[#212529]">
            Undo
          </button>
          <button className="border rounded bg-[#f8f9fa] border-[#f8f9fa] p-1 text-sm text-[#212529] px-3 hover:bg-[#e2e6ea] hover:text-[#212529]">
            Redo
          </button>
        </div>
        <textarea
          onChange={handleChange}
          value={ans}
          rows={25}
          className="h-96 w-full text-[#393939]"
        ></textarea>
      </div>
    </div>
  );
};

export default PassageNoQuestion;
