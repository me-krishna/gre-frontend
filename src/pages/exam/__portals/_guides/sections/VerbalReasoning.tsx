import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaRegSquareFull } from "react-icons/fa6";

const VerbalReasoning = () => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Verbal Writing
        <h4>12 Questions</h4>
        <h4>18 Minutes (standard time)</h4>
      </h3>
      <div className="py-8">
        <p>
          For each question, indicate the best answer using the directions
          given. If you need more detailed directions, select Help at any time.
        </p>
        <br />
        <p>
          If a question has answer choices with
          <span className="font-semibold">ovals</span>{" "}
          <MdOutlineRadioButtonUnchecked />
          then the correct answer consists of a single choice. If a question has
          answer choices with
          <span className="font-semibold">square boxes </span>
          <FaRegSquareFull />
          then the correct answer consists of one or more answer choices. Read
          the directions for each question carefully. The directions will
          indicate if you should select one or more answer choices. To answer
          questions based on a reading passage, you may need to scroll to read
          the entire passage. You may also use your keyboard to navigate through
          the passage.
        </p>
        <p>
          Select <span className="font-semibold">Continue</span> to proceed.
        </p>
      </div>
    </div>
  );
};

export default VerbalReasoning;
