import ExamHeader from "src/components/common/ExamHeader";
import { useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionHeading from "./__portals/SectionHeading";
import SectionInfo from "./__portals/SectionInfo";

const Exam = () => {
  const [step, setStep] = useState(2);
  return (
    <div>
      <ExamHeader step={step} testName="Practice Test 8" />
      <SectionHeading current={1} total={5} />
      <div className="w-screen px-2 py-5">
        <div className="container mx-auto">
          {step === 1 && <GeneralInfo />}
          {(step === 2 || step === 3 ) && <SectionInfo />}
        </div>
      </div>
    </div>
  );
};

export default Exam;
