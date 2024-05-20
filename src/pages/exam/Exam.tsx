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
import ExitForce from "./__portals/ExitForce";
import { error } from "../../lib/notify";
import ExitSection from "./__portals/ExitSection";
import QuitAndSave from "./__portals/QuitAndSave";

const Exam = () => {
  const { exam_section_id } = useParams();
  const [step, setStep] = useState(1);
  const [noOfSections, setNoOfSections] = useState<any[]>([]);
  const [sectionDetails, setSectionDetails] = useState<any>({});
  const [isThisAQuestion, setIsThisAQuestion] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<any>({});
  const [currentSection, setCurrentSection] = useState<any>({});
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentSectionData, setCurrentSectionData] = useState<{
    section_id: number;
    questionNumber: number;
  }>({
    section_id: 0,
    questionNumber: 0,
  });
  const getExamSectionDetails = async () => {
    try {
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
          updateExamSection({
            last_question: allQuestions[0].qid,
          });
        } else {
          let c = allQuestions.findIndex(
            (e: any, i: number) =>
              e.qid == data?.data?.testDetails?.last_question
          );
          setCurrentQuestion(c);
          setQuestionData(allQuestions[c]);
        }
      }
    } catch (error) {
      console.log(error, "error");
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
  const updateExamQuestionSection = async (inp: any) => {
    try {
      const res = await useApi.post(`/updateExamQuestionSection`, {
        qid: questionData.qid,
        updateData: {
          ...inp,
        },
      });
      const { status, data } = res;
      if (status === 200) {
        setQuestionData({
          ...questionData,
          marked: inp.marked,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getListOfQuestions = async () => {
    try {
      const res = await useApi.post(`/getListExamQuestions`, {
        section_id: exam_section_id,
      });

      if (res.status === 200) {
        setAllQuestions(res.data.data);
      }
    } catch (error) {
      console.log(error, "error");
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
    if (name === "Continue") {
      const nextQuestionIndex = currentQuestion + 1;
      const totalQuestions = allQuestions.length - 1;
      const nextQuestion = allQuestions[nextQuestionIndex];
      setCurrentQuestion(nextQuestionIndex);
      setQuestionData(nextQuestion);
      setIsThisAQuestion(true);
      setStep(1);
      updateExamSection({
        last_question: nextQuestion.qid,
      });
    } else if (name === "Next") {
      const nextQuestionIndex = currentQuestion + 1;
      const totalQuestions = allQuestions.length - 1;
      const nextQuestion = allQuestions[nextQuestionIndex];
      if (nextQuestion.question_section_no === questionData.section_id) {
        if (totalQuestions >= nextQuestionIndex) {
          setCurrentQuestion(nextQuestionIndex);
          setQuestionData(nextQuestion);
          updateExamSection({
            last_question: nextQuestion.qid,
          });
        } else {
          alert("No more questions");
        }
      } else {
        setIsThisAQuestion(false);
        setStep(3);
      }
    } else if (name === "Back") {
    } else if (name === "Return") {
      setIsThisAQuestion(true);
      setStep(1);
    } else if (name === "Mark") {
      updateExamQuestionSection({
        marked: questionData.marked === 1 ? 0 : 1,
      });
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen bg-[#00000057]">
      <div className="lg:w-[60vw] md:w-[79vw] h-[80vh] bg-white">
        <ExamHeader
          isThisQuestion={isThisAQuestion}
          step={step}
          testName={sectionDetails?.exam_title}
          onClick={actionBtnClick}
          question_marked={questionData?.marked}
        />
        <>
          {/* {currentSection?.duration && ( */}
          <SectionHeading
            currentSection={questionData?.question_section_no}
            totalSections={sectionDetails?.no_sections}
            currentQuestion={1}
            totalQuestions={2}
            // sectionTime={parseInt(currentSection?.duration) * 60}
            sectionTime={1000}
          />

          <div>
            <div>
              {!isThisAQuestion && (
                <>
                  {step === 1 && <GeneralInfo />}
                  {step === 2 && <SectionInfo />}
                  {step === 3 && <ExitForce topicTitle="Analitical Writing" />}
                  {step === 4 && <ExitSection />}
                  {step === 5 && <QuitAndSave />}
                </>
              )}
              {isThisAQuestion && (
                <div className="flex flex-col justify-between h-[71vh] overflow-auto border border-[#5e5e5e] p-1">
                  {questionData?.question_config?.isThereHeaderInfo === true &&
                    !(
                      questionData?.question_config?.question_type ===
                        "type1" &&
                      questionData?.question_config
                        ?.isThisPassageHaveQuestion === "yes"
                    ) && (
                      <div className="flex justify-center mb-3">
                        <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                          {questionData?.question_config?.header_info}
                        </div>
                      </div>
                    )}
                  <div className="h-full">
                    {questionData?.question_config?.question_type === "type1" &&
                      questionData?.question_config
                        ?.isThisPassageHaveQuestion === "no" && (
                        <PassageNoQuestion
                          question={questionData}
                          getAnswer={(e) => type1QuestionUpdate(e)}
                        />
                      )}

                    {questionData?.question_config?.question_type === "type1" &&
                      questionData?.question_config
                        ?.isThisPassageHaveQuestion === "yes" && (
                        <PassageQuestion question={questionData} />
                      )}

                    {questionData?.question_config?.question_type ===
                      "type2" && (
                      <>
                        {parseInt(
                          questionData?.question_config?.no_of_blanks.toString()
                        ) > 0 && <BlanksQuestion question={questionData} />}
                        {parseInt(
                          questionData?.question_config?.no_of_blanks.toString()
                        ) === 0 && (
                          <NonBlanksQuestion question={questionData} />
                        )}
                      </>
                    )}
                  </div>
                  {questionData?.question_config?.isThereFooterInfo === true &&
                    !(
                      questionData?.question_config?.question_type ===
                        "type1" &&
                      questionData?.question_config
                        ?.isThisPassageHaveQuestion === "yes"
                    ) && (
                      <div className="flex justify-center my-2">
                        <div className="bg-[#dddddd] p-2 px-3 rounded text-[13px]">
                          {questionData?.question_config?.footer_info}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Exam;
