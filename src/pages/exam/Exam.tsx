import ExamHeader from "src/components/common/ExamHeader";
import { useEffect, useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionHeading from "./__portals/SectionHeading";
import SectionInfo from "./__portals/SectionInfo";
import PassageNoQuestion from "./__portals/question-types/PassageNoQuestion";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../lib/api";
import PassageQuestion from "./__portals/question-types/PassageQuestion";
import BlanksQuestion from "./__portals/question-types/BlanksQuestion";
import NonBlanksQuestion from "./__portals/question-types/NonBlanksQuestion";
import ExitForce from "./__portals/ExitForce";
import ExitSection from "./__portals/ExitSection";
import QuitAndSave from "./__portals/QuitAndSave";
import ReviewScreen from "./__portals/ReveiwScreen";
import EndOfTest from "./__portals/EndOfTest";
import ReportYourScore from "./__portals/ReportYourScore";
import PracticeTestResults from "./__portals/PracticeTestResults";

const Exam = () => {
  const navigate = useNavigate();
  const { exam_section_id } = useParams();
  const [step, setStep] = useState(1);
  const [noOfSections, setNoOfSections] = useState<any[]>([]);
  const [sectionDetails, setSectionDetails] = useState<any>({});
  const [isThisAQuestion, setIsThisAQuestion] = useState<boolean>(true);
  const [questionData, setQuestionData] = useState<any>({});
  const [currentSection, setCurrentSection] = useState<any>({});
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [pargraphsData, setPargraphsData] = useState<string>("");
 
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
      console.error(error, "error");
    }
  };

  const updateExamSection = async (inp: any) => {
    try {
      await useApi.post(`/updateExamSection`, {
        section_id: exam_section_id,
        updateData: {
          ...inp,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateExamQuestionSection = async (inp: any) => {
    try {
      await useApi.post(`/updateExamQuestionSection`, {
        qid: questionData.qid,
        updateData: {
          ...inp,
        },
      });
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

  const CorrectAnsUpdate = (correctAns: string, questionObj: any) => {
    updateExamQuestionSection({
      correct_ans: correctAns,
    });
  };

  const attempAnswer = (attemptAns: string, questionObj: any) => {
    allQuestions[currentQuestion].attempt_ans = attemptAns;
    updateExamQuestionSection({
      attempt_ans: attemptAns,
    });
  };

  useEffect(() => {
    getListOfQuestions();
  }, []);

  useEffect(() => {
    getExamSectionDetails();
  }, [allQuestions]);

  const type1QuestionUpdate = (e: string) => {
    allQuestions[currentQuestion].passage_written = e;
    setPargraphsData(e);
  };

  const actionBtnClick = (name: string, id: number) => {
    if (name === "Continue") {
      if (step !== 7) {
        setCurrentQuestion(0);
        const nextQuestionIndex = currentQuestion + 1;
        const nextQuestion = allQuestions[nextQuestionIndex];
        setCurrentQuestion(nextQuestionIndex);
        setQuestionData(nextQuestion);
        setIsThisAQuestion(true);
        setStep(1);
        updateExamSection({
          last_question: nextQuestion.qid,
        });
      } else {
        setStep(8);
      }
    } else if (name === "Next") {
      if (currentQuestion === allQuestions.length - 1) {
        setIsThisAQuestion(false);
        setStep(7);
      } else {
        if (
          questionData?.question_config?.question_type === "type1" &&
          questionData?.question_config?.isThisPassageHaveQuestion === "no"
        ) {
          updateExamQuestionSection({
            passage_written: pargraphsData,
          });
        }

        updateExamQuestionSection({
          encountered: 1,
        });
        const nextQuestionIndex = currentQuestion + 1;
        const totalQuestions = allQuestions.length - 1;
        const nextQuestion = allQuestions[nextQuestionIndex];
        if (nextQuestion.section_id === questionData.section_id) {
          if (totalQuestions >= nextQuestionIndex) {
            setCurrentQuestion(nextQuestionIndex);
            setQuestionData(nextQuestion);
            updateExamSection({
              last_question: nextQuestion.qid,
            });
          }
        } else {
          setIsThisAQuestion(false);
          setStep(3);
        }
      }
    } else if (name === "Back") {
      if (
        questionData?.question_config?.question_type === "type1" &&
        questionData?.question_config?.isThisPassageHaveQuestion === "no"
      ) {
        updateExamQuestionSection({
          passage_written: pargraphsData,
        });
      }

      const prevQuestionIndex = currentQuestion - 1;
      const prevQuestion = allQuestions[prevQuestionIndex];
      if (
        prevQuestionIndex > 0 &&
        prevQuestion.section_id === questionData.section_id
      ) {
        setCurrentQuestion(prevQuestionIndex);
        setQuestionData(prevQuestion);
      }
    } else if (name === "Return") {
      setIsThisAQuestion(true);
      setStep(1);
    } else if (name === "Mark") {
      updateExamQuestionSection({
        marked: questionData.marked === 1 ? 0 : 1,
      });
    } else if (name === "Review") {
      setIsThisAQuestion(false);
      setStep(6);
    } else if (name === "Exit Section") {
      if (id === 1) {
        setIsThisAQuestion(false);
        setStep(4);
        nextSectionCheck();
      } else {
        setIsThisAQuestion(true);
        setStep(1);
      }
    } else if (name === "Quit & Save") {
      if (id === 2) {
        setIsThisAQuestion(false);
        setStep(5);
      } else {
        navigate("/");
      }
    }
  };

  const nextSectionCheck = () => {
    const currentSection = questionData.question_section_no;
    const nextSectionData = allQuestions.filter((item: any) => {
      return item.question_section_no === currentSection + 1;
    });
    if (nextSectionData.length > 0) {
      setCurrentQuestion(
        allQuestions.findIndex(
          (item: any) => item.qid === nextSectionData[0].qid
        )
      );
      setQuestionData(nextSectionData[0]);
      updateExamSection({
        last_question: nextSectionData[0].qid,
      });
    } else {
      setStep(5);
    }
  };

  const currentQuestionNumberOnSection = () => {
    const currentSection = questionData?.question_section_no;
    const currentSectionQuestions = allQuestions.filter((item: any) => {
      return item?.question_section_no === currentSection;
    });
    return (
      currentSectionQuestions.findIndex(
        (item: any) => item.qid === questionData.qid
      ) + 1
    );
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
          currentSectionQuestionNumber={currentQuestionNumberOnSection()}
        />
        <>

          <SectionHeading
            currentSection={questionData?.question_section_no}
            totalSections={sectionDetails?.no_sections}
            currentQuestion={currentQuestionNumberOnSection()}
            totalQuestions={
              allQuestions.filter(
                (res) => res?.section_id === questionData?.section_id
              ).length
            }
            sectionTime={parseInt(currentSection?.duration) * 60}
            step={step}
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
                  {step === 6 && <ReviewScreen questionData={questionData} />}
                  {step === 7 && <EndOfTest />}
                  {step === 8 && <ReportYourScore />}
                  {step === 9 && <PracticeTestResults />}
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
                        <PassageQuestion
                          question={questionData}
                          CorrectAnsUpdate={CorrectAnsUpdate}
                          AttemptAnsUpdate={attempAnswer}
                        />
                      )}

                    {questionData?.question_config?.question_type ===
                      "type2" && (
                      <>
                        {parseInt(
                          questionData?.question_config?.no_of_blanks.toString()
                        ) > 0 && (
                          <BlanksQuestion
                            question={questionData}
                            CorrectAnsUpdate={CorrectAnsUpdate}
                            AttemptAnsUpdate={attempAnswer}
                          />
                        )}
                        {parseInt(
                          questionData?.question_config?.no_of_blanks.toString()
                        ) === 0 && (
                          <NonBlanksQuestion
                            question={questionData}
                            CorrectAnsUpdate={CorrectAnsUpdate}
                            AttemptAnsUpdate={attempAnswer}
                          />
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
