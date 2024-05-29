import useApi from "../../../lib/api";
import { error } from "../../../lib/notify";
import { FC, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCaretDown } from "react-icons/io5";
interface ReviewScreenProps {
  questionData: any;
}

const ReviewScreen: FC<ReviewScreenProps> = ({ questionData }) => {
  const [data, setData] = useState<any[]>([]);
  const [isDecending, setIsDecending] = useState<boolean>(false);
  const [tableOne, setTableOne] = useState<any[]>([]);
  const [tableTwo, setTableTwo] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number>(
    questionData.qid
  );

  console.log(questionData);

  const getData = async () => {
    try {
      const res = await useApi.post(
        "/getListExamQuestionDataBasedOnQSections",
        {
          sid: questionData.test_section_id,
          qsid: questionData.question_section_id,
        }
      );
      const { status, data } = res.data;
      if (status === 200) {
        setData(data);
        const len = data.length;
        if (len > 0) {
          const half = Math.ceil(len / 2);
          const tableOneData = data.slice(0, half);
          const tableTwoData = data.slice(half, len);
          // console.log(tableOneData, tableTwoData);
          setTableOne(tableOneData);
          setTableTwo(tableTwoData);
        }
      }
    } catch (e) {
      error("An error occurred while fetching data.");
      console.error(e);
    }
  };

  const sortData = () => {
    const sortedData = data.sort((a, b) => {
      if (isDecending) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setData(sortedData);
    const len = sortedData.length;
    const half = Math.ceil(len / 2);
    const tableOneData = sortedData.slice(0, half);
    const tableTwoData = sortedData.slice(half, len);
    setTableOne(tableOneData);
    setTableTwo(tableTwoData);
    setIsDecending(!isDecending);
  };

  useEffect(() => {
    getData();
  }, []);

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

        <div>
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold">
                First {tableOne.length} Rows Sorted by Number in{" "}
                {isDecending ? "Descending" : "Ascending"} Order
              </h3>
              <table className="w-full border-black border-2 p-1">
                <thead>
                  <tr>
                    <td
                      onClick={sortData}
                      className="bg-[#fdf2e3] p-[1px] text-black text-semibold text-center cursor-pointer"
                    >
                      Number{" "}
                      <span
                        className={`inline-flex ${
                          isDecending ? " rotate-180" : ""
                        }`}
                      >
                        <IoCaretDown />
                      </span>
                    </td>
                    <td className="bg-[#fdf2e3] p-[1px] text-black text-semibold text-center">
                      Status
                    </td>
                    <td className="bg-[#fdf2e3] p-[1px] text-black text-semibold text-center">
                      Marked
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {tableOne.map((item, index) => (
                    <tr
                      onClick={() => setActiveQuestion(item.id)}
                      key={index}
                      className={`${
                        item.id === activeQuestion
                          ? "bg-sky-100"
                          : item.encountered === 0
                          ? "bg-[#00000068]"
                          : ""
                      }`}
                    >
                      <td className="text-center">
                        {isDecending ? data.length - index : index + 1}
                      </td>
                      <td className="text-center">
                        {item.encountered === 0
                          ? "Not Encountered"
                          : item.attempt_ans === "" ||
                            item.attempt_ans === null ||
                            JSON.parse(item.attempt_ans).length === 0
                          ? "Not Answered"
                          : JSON.parse(item.correct_ans).length ===
                            JSON.parse(item.attempt_ans).length
                          ? "Answered"
                          : "Incomplete"}
                      </td>
                      <td className="text-center font-bold">
                        {item.marked === 1 ? <FaCheck /> : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Last {tableTwo.length} Rows Sorted by Number in{" "}
                {isDecending ? "Descending" : "Ascending"} Order
              </h3>
              <table className="w-full border-black border-2 p-1">
                <thead>
                  <tr>
                    <td
                      onClick={sortData}
                      className={`bg-[#fdf2e3] p-[1px] text-black text-semibold text-center`}
                    >
                      Number{" "}
                      <span
                        className={`inline-flex ${
                          isDecending ? " rotate-180" : ""
                        }`}
                      >
                        <IoCaretDown />
                      </span>
                    </td>
                    <td className="bg-[#fdf2e3] p-[1px] text-black text-semibold text-center">
                      Status
                    </td>
                    <td className="bg-[#fdf2e3] p-[1px] text-black text-semibold text-center">
                      Marked
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {tableTwo.map((item, index) => (
                    <tr
                      onClick={() => setActiveQuestion(item.id)}
                      key={index}
                      className={`${
                        item.id === activeQuestion
                          ? "bg-sky-100"
                          : item.encountered === 0
                          ? "bg-[#00000068]"
                          : ""
                      }`}
                    >
                      <td className="text-center">
                        {/* {isDecending ? daxsta.length - index : index + 1}
                        {tableOne.length + (index + 1)} */}
                        {isDecending
                          ? data.length - tableOne.length - index
                          : tableOne.length + (index + 1)}
                      </td>
                      <td className="text-center">
                        {item.encountered === 0
                          ? "Not Encountered"
                          : item.attempt_ans === "" ||
                            item.attempt_ans === null ||
                            JSON.parse(item.attempt_ans).length === 0
                          ? "Not Answered"
                          : JSON.parse(item.correct_ans).length ===
                            JSON.parse(item.attempt_ans).length
                          ? "Answered"
                          : "Incomplete"}
                      </td>
                      <td className="text-center">
                        {item.marked === 1 ? (
                          <FaCheck className="text-center" size={18} />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
