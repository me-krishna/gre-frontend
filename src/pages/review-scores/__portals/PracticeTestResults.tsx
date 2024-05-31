import { VscTriangleLeft } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";

const Tags = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className=" relative bg-gray-200 rounded-lg p-3 w-full">
      {title}
      <span className="bg-[#cc6813]  text-white h-full absolute top-0 right-0 w-20 flex justify-center items-center text-2xl rounded-lg">
        <VscTriangleLeft
          size={26}
          className="absolute -left-4 text-[#cc6813]"
        />
        {value}
      </span>
    </div>
  );
}

const PracticeTestResults = () => {
  const params = useParams<{ exam_section_id: string }>();
  const nav = useNavigate();
  const constinueBtnClick = () => {
    if (params.exam_section_id) {
      nav(`/review-score/${params.exam_section_id}`);
    } else {
      nav(`/`);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-[2rem] text-[#cc6813]">Practice Test Results</h1>
      <p>Your Score on the practice test are displayed below</p>

      <div className="pt-6">
        <div className="flex justify-start  items-start gap-10">
          <div className="min-w-[30%] space-y-10">
            <Tags title="Verbal Reasoning" value="160" />
            <Tags title="Quantitative Reasoning" value="NA" />
            <div></div>
          </div>
          <div className="bg-gray-200 w-full min-h-80 rounded p-8">
            <div className="flex justify-start gap-2">
              <div className="w-[50%]">
                <img
                  src="/images/ptr.png"
                  alt="PTR"
                  className="w-[200px] h-auto p-3 rounded-md blur-[2px] "
                />
              </div>
              <div className="space-y-3">
                <p className="text-3xl">Congratulations!</p>
                <p className="text-[#cc6813] text-xl">
                  <strong className="font-bold">You have completed </strong>{" "}
                  {"Practice Test 2"}!
                </p>
                <p>You may now review your performance.</p>
                <div className="p-5">
                  <button
                    onClick={constinueBtnClick}
                    className="bg-[#1c3763] text-white px-4 py-2 rounded-lg text-center min-w-[80%]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestResults;
