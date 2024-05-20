import { FC } from "react";
import { FaCheck } from "react-icons/fa6";

interface ReviewScreenProps {
  questionData: any;
}

const ReviewScreen: FC<ReviewScreenProps> = ({ questionData }) => {
  console.log(questionData, "questionData");
  return (
    <div>
      <div className="p-10">
        <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
          Review
        </h3>
        <div className="py-8">
          <p className="text-justify ">
            This page presents information about questions in the current
            section. You may sort the questions by{" "}
            <span className="font-semibold">Number,Status,</span> and{" "}
            <span className="font-semibold">Marked</span> . The question you
            were on is selected and highlighted by default. Questions you have
            encountered have a status of{" "}
            <span className="font-semibold">Answered,Incomplete,</span> or{" "}
            <span className="font-semibold">Not Answered</span>. An{" "}
            <span className="font-semibold">Incomplete</span> status indicates
            you have selected more or fewer options than the question requires.
            Questions you have not encountered have a status of{" "}
            <span className="font-semibold">Not Encountered</span>. Marked
            questions are indicated with a{" "}
            <span className="font-semibold inline-block">
              <FaCheck size={20} className="font-bold text-2xl" />
            </span>
            .
          </p>
          <br />
          <p>
            To return to the question you were on, select{" "}
            <span className="font-semibold">Return</span> . To go to a different
            question, select that question and select
            <span className="font-semibold">Go to Question</span>. You will be
            unable to go to questions that have a status of{" "}
            <span className="font-semibold">Not Encountered</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
