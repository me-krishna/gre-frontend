import { FC } from "react";

interface QuestionExplinationProps {
  explination: string;
}

const QuestionExplination: FC<QuestionExplinationProps> = ({ explination }) => {
  return (
    <div className="w-full mb-3">
      <div className="bg-p1-50 p-3 border-2 border-p1-500 rounded-lg m-3 pb-4">
        <h2 className="underline font-bold">Explanation:</h2>
        <div
          className="p-3 "
          dangerouslySetInnerHTML={{
            __html: explination,
          }}
        ></div>
      </div>
    </div>
  );
};

export default QuestionExplination;
