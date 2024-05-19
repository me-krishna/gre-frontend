import ExamHeader from "src/components/common/ExamHeader";
import { useEffect, useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionHeading from "./__portals/SectionHeading";
import SectionInfo from "./__portals/SectionInfo";
import PassageNoQuestion from "./__portals/question-types/PassageNoQuestion";
import { useParams } from "react-router-dom";
import useApi from "../../lib/api";

const Exam = () => {
  const { exam_section_id } = useParams();
  const [step, setStep] = useState(4);
  const [noOfSections, setNoOfSections] = useState<any[]>([]);
  const [sectionDetails, setSectionDetails] = useState<any>({});
  const [questionData, setQuestionData] = useState<any>({});

  const getExamSectionDetails = async () => {
    const res = await useApi.post(`/getSectionFullDetails`, {
      section_id: exam_section_id,
    });
    const { status, data } = res;
    if (status === 200) {
      setNoOfSections(data.data.testSections);
      setSectionDetails(data.data.testDetails);
      console.log(data.data.testDetails);
    }
  };

  useEffect(() => {
    getExamSectionDetails();
  }, []);

  return (
    <div>
      <ExamHeader step={step} testName={sectionDetails?.exam_title} />
      <SectionHeading
        currentSection={1}
        totalSections={sectionDetails?.no_sections}
        currentQuestion={1}
        totalQuestions={2}
        sectionTime={30}
      />
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
