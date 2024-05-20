import ExamHeader from "src/components/common/ExamHeader";
import { useEffect, useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionHeading from "./__portals/SectionHeading";
import SectionInfo from "./__portals/SectionInfo";
import PassageNoQuestion from "./__portals/question-types/PassageNoQuestion";
import { useParams } from "react-router-dom";
import useApi from "../../lib/api";
import PassageQuestion from "./__portals/question-types/PassageQuestion";
import BlanksQuestion from "./__portals/question-types/BlanksQuestion";
import NonBlanksQuestion from "./__portals/question-types/NonBlanksQuestion";

const Exam = () => {
  const { exam_section_id } = useParams();
  const [step, setStep] = useState(4);
  const [noOfSections, setNoOfSections] = useState<any[]>([]);
  const [sectionDetails, setSectionDetails] = useState<any>({});
  const [questionData, setQuestionData] = useState<any>({});
  const [currentSection, setCurrentSection] = useState<any>({});
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const getExamSectionDetails = async () => {
    const res = await useApi.post(`/getSectionFullDetails`, {
      section_id: exam_section_id,
    });
    const { status, data } = res;
    if (status === 200) {
      setNoOfSections(data.data.testSections);
      setSectionDetails(data.data.testDetails);
      if (data.data.testDetails.last_question === null) {
        setCurrentQuestion(0);
        setQuestionData(allQuestions[0]);
        console.log(allQuestions[0], "allQuestions[0]");
      } else {
        setCurrentSection(
          allQuestions.find(
            (e: any) => e.question_id === data.data.testDetails.last_question
          )
        );
      }
    }
  };

  const getQuestionFullData = async () => {
    if (sectionDetails?.last_section === null) {
      setCurrentSection(noOfSections[0]);
      const res = await useApi.post(`/getExamQuestion`, {
        sessionId: exam_section_id,
        sectionsId: noOfSections[0].section_id,
        questionNumber: 1,
      });
      if (res.status === 200) {
        setQuestionData({
          ...res.data.data,
          non_blanks: JSON.parse(res.data.data.non_blanks),
          question_config: JSON.parse(res.data.data.question_config),
          blanks: JSON.parse(res.data.data.blanks),
        });
      }
    }
  };

  const updateExamSection = async (inp: any) => {
    const res = await useApi.post(`/updateExamSection`, {
      section_id: exam_section_id,
      updateData: {
        ...inp,
      },
    });
    const { status, data } = res;
    if (status === 200) {
      console.log(data, "data");
    }
  };

  const getListOfQuestions = async () => {
    const res = await useApi.post(`/getListExamQuestions`, {
      section_id: exam_section_id,
    });

    if (res.status === 200) {
      setAllQuestions(res.data.data);
    }
  };

  useEffect(() => {
    getListOfQuestions();
  }, []);

  useEffect(() => {
    getExamSectionDetails();
  }, [allQuestions]);

  // useEffect(() => {
  //   // getQuestionFullData();
  // }, [sectionDetails]);

  const type1QuestionUpdate = (e: string) => {
    console.log(e, "e test now");
  };

  const actionBtnClick = (name: string) => {
    console.log(name);
    if (name === "Continue") {
      const nextQuestionIndex = currentQuestion + 1;
      const totalQuestions = allQuestions.length - 1;
      if (totalQuestions >= nextQuestionIndex) {
        setCurrentQuestion(nextQuestionIndex);
        setQuestionData(allQuestions[nextQuestionIndex]);
      } else {
        alert("No more questions");
      }
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen bg-[#00000057]">
      <div className="w-[60vw] h-[80vh] border bg-white overflow-auto">
        <ExamHeader
          step={step}
          testName={sectionDetails?.exam_title}
          onClick={actionBtnClick}
        />
        <>
          {/* {currentSection?.duration && ( */}
          <SectionHeading
            currentSection={1}
            totalSections={sectionDetails?.no_sections}
            currentQuestion={1}
            totalQuestions={2}
            // sectionTime={parseInt(currentSection?.duration) * 60}
            sectionTime={1000}
          />

          <div className="p-1 h-full">
            <div className="h-full">
              {step === 1 && <GeneralInfo />}
              {(step === 2 || step === 3) && <SectionInfo />}
              <div className="flex flex-col justify-between h-full">
                {questionData?.question_config?.isThereHeaderInfo === true &&
                  !(
                    questionData?.question_config?.question_type === "type1" &&
                    questionData?.question_config?.isThisPassageHaveQuestion ===
                      "yes"
                  ) && (
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                        {questionData?.question_config?.header_info}
                      </div>
                    </div>
                  )}
                {/* Main Question Display */}
                <div className="h-full py-2">
                  {questionData?.question_config?.question_type === "type1" &&
                    questionData?.question_config?.isThisPassageHaveQuestion ===
                      "no" && (
                      <PassageNoQuestion
                        question={questionData}
                        getAnswer={(e) => type1QuestionUpdate(e)}
                      />
                    )}

                  {questionData?.question_config?.question_type === "type1" &&
                    questionData?.question_config?.isThisPassageHaveQuestion ===
                      "yes" && <PassageQuestion question={questionData} />}

                  {questionData?.question_config?.question_type === "type2" && (
                    <>
                      {parseInt(
                        questionData?.question_config?.no_of_blanks.toString()
                      ) > 0 && <BlanksQuestion question={questionData} />}
                      {parseInt(
                        questionData?.question_config?.no_of_blanks.toString()
                      ) === 0 && <NonBlanksQuestion question={questionData} />}
                    </>
                  )}
                </div>
                {questionData?.question_config?.isThereFooterInfo === true &&
                  !(
                    questionData?.question_config?.question_type === "type1" &&
                    questionData?.question_config?.isThisPassageHaveQuestion ===
                      "yes"
                  ) && (
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                        {questionData?.question_config?.footer_info}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Exam;
