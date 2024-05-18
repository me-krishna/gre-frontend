import ExamHeader from "src/components/common/ExamHeader";
import { useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionHeading from "./__portals/SectionHeading";
import SectionInfo from "./__portals/SectionInfo";
import PassageNoQuestion from "./__portals/question-types/PassageNoQuestion";

const Exam = () => {
  const [step, setStep] = useState(4);
  return (
    <div>
      <ExamHeader step={step} testName="Practice Test 8" />
      <SectionHeading current={1} total={5} />
      <div className="w-screen px-2 py-5">
        <div className="container mx-auto">
          {step === 1 && <GeneralInfo />}
          {(step === 2 || step === 3) && <SectionInfo />}
          {step === 4 && (
            <PassageNoQuestion
              question={`
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat doloribus accusantium mollitia hic incidunt consequatur nihil beatae, corrupti ullam quam aliquam aspernatur inventore quae explicabo obcaecati accusamus, laudantium eos.</p>
<br>
<br>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sapiente cupiditate ullam facilis deserunt provident, fugit non veniam ipsam neque numquam corrupti voluptate, illo, nemo odio blanditiis quis? Commodi, aspernatur.</p>

          <p>lorem</p>
          `}
              getAnswer={(e) => console.log(e)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
