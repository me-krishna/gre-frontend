import { useEffect, useState } from "react";
import GeneralInfo from "./__portals/GeneralInfo";
import SectionInfo from "./__portals/SectionInfo";
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
import ProgressSummary from "./__portals/ProgressSummary";
import ExamHeader from "./ExamHeader";

const Exam = () => {
  const navigate = useNavigate();
  const { exam_section_id } = useParams();
  const [step, setStep] = useState(10);
  const [noOfSections, setNoOfSections] = useState<any[]>([]);
  const [sectionDetails, setSectionDetails] = useState<any>({});
  const [isThisAQuestion, setIsThisAQuestion] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>({});
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionAnsMode, setCurrentQuestionAns] =
    useState<boolean>(true);
  const getExamSectionDetails = async () => {
    try {
      const res = await useApi.post(`/getSectionFullDetails`, {
        section_id: exam_section_id,
      });

      const { status, data } = res;
      if (status === 200) {
        console.log(allQuestions, "all questions -----🫐");
        setNoOfSections(data.data.testSections);
        setSectionDetails(data.data.testDetails);
        setCurrentQuestion(0);
        setQuestionData(allQuestions[0]);
        console.log(allQuestions[0], "data-----");
      }
    } catch (error) {
      console.error(error, "error");
    }
  };

  const getListOfQuestions = async () => {
    try {
      const res = await useApi.post(`/getListExamQuestions`, {
        section_id: exam_section_id,
      });

      if (res.status === 200) {
        const data = res.data.data as any[];
        const flt = data.filter(
          (item) =>
            !(
              item.question_config.question_type === "type1" &&
              item.question_config.isThisPassageHaveQuestion === "no"
            )
        );
        setAllQuestions(flt);
        setLoading(false);
      }
    } catch (error) {
      console.error(error, "error");
    }
  };

  useEffect(() => {
    getListOfQuestions();
  }, []);

  useEffect(() => {
    getExamSectionDetails();
    // setLoading(false);
  }, [allQuestions]);

  const actionBtnClick = (name: string, id: number) => {
    setCurrentQuestionAns(true);
    if (name === "Continue") {
      if (step !== 7) {
        if (step !== 10 && step !== 9 && step !== 8) {
          setCurrentQuestion(0);
          const nextQuestionIndex = currentQuestion + 1;
          const nextQuestion = allQuestions[nextQuestionIndex];
          setCurrentQuestion(nextQuestionIndex);
          setQuestionData(nextQuestion);
          setIsThisAQuestion(true);
          setStep(1);
        } else {
          setIsThisAQuestion(true);
          setStep(1);
        }
      } else {
        navigate("/");
      }
    } else if (name === "Next") {
      if (currentQuestion === allQuestions.length - 1) {
        setIsThisAQuestion(false);
        setStep(7);
      } else {
        const nextQuestionIndex = currentQuestion + 1;
        const totalQuestions = allQuestions.length - 1;
        const nextQuestion = allQuestions[nextQuestionIndex];
        if (nextQuestion.section_id === questionData.section_id) {
          if (totalQuestions >= nextQuestionIndex) {
            setCurrentQuestion(nextQuestionIndex);
            setQuestionData(nextQuestion);
          }
        } else {
          setIsThisAQuestion(false);
          setStep(2);
        }
      }
    } else if (name === "Back") {
      const prevQuestionIndex = currentQuestion - 1;
      const prevQuestion = allQuestions[prevQuestionIndex];
      if (
        prevQuestionIndex >= 0 &&
        prevQuestion.section_id === questionData.section_id
      ) {
        setCurrentQuestion(prevQuestionIndex);
        setQuestionData(prevQuestion);
      }
    } else if (name === "Return") {
      setIsThisAQuestion(true);
      setStep(1);
    } else if (name === "Mark") {
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
    } else if (name === "Go to Question") {
      setIsThisAQuestion(true);
      setStep(1);
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

  const answerChange = (a: boolean) => {
    setCurrentQuestionAns(a);
  };

  const goToQuestion = (question: number) => {
    console.log(currentQuestionNumberOnSection(), "question");
    // setCurrentQuestion(question);
    // setQuestionData(allQuestions[question]);
  };

  return (
    <div className="flex justify-center h-screen w-screen bg-[#00000057]">
      <div className="lg:w-[66vw] md:w-[79vw] h-[80vh] bg-white">
        {!loading && (
          <>
            <ExamHeader
              isThisQuestion={isThisAQuestion}
              step={step}
              testName={sectionDetails?.exam_title}
              onClick={actionBtnClick}
              question_marked={questionData?.marked}
              currentSectionQuestionNumber={currentQuestionNumberOnSection()}
              currentQuestionAnswerModeChange={answerChange}
              questionId={questionData?.qid}
            />
            <>
              <div>
                <div>
                  {!isThisAQuestion && (
                    <>
                      {step === 1 && <GeneralInfo />}
                      {step === 2 && (
                        <SectionInfo
                          question={questionData}
                          sectionData={noOfSections}
                        />
                      )}
                      {step === 3 && (
                        <ExitForce topicTitle={questionData.topicName} />
                      )}
                      {step === 4 && <ExitSection />}
                      {step === 5 && <QuitAndSave />}
                      {step === 6 && (
                        <ReviewScreen
                          questionData={questionData}
                          currentQuestion={currentQuestion}
                          goToQuestion={goToQuestion}
                        />
                      )}
                      {step === 7 && <EndOfTest />}
                      {step === 8 && <ReportYourScore />}
                      {step === 9 && <PracticeTestResults />}
                      {step === 10 && <ProgressSummary />}
                    </>
                  )}
                  {isThisAQuestion && (
                    <>
                      <div className="flex flex-col justify-between h-[71vh] overflow-auto border border-[#5e5e5e] p-1">
                        {questionData?.question_config?.isThereHeaderInfo ===
                          true &&
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
                          {questionData?.question_config?.question_type ===
                            "type1" &&
                            questionData?.question_config
                              ?.isThisPassageHaveQuestion === "yes" && (
                              <PassageQuestion
                                question={questionData}
                                answerMode={currentQuestionAnsMode}
                              />
                            )}

                          {questionData?.question_config?.question_type ===
                            "type2" && (
                            <>
                              {parseInt(
                                questionData?.question_config?.no_of_blanks.toString()
                              ) > 0 && (
                                <BlanksQuestion
                                  answerMode={currentQuestionAnsMode}
                                  question={questionData}
                                />
                              )}
                              {parseInt(
                                questionData?.question_config?.no_of_blanks.toString()
                              ) === 0 && (
                                <NonBlanksQuestion
                                  question={questionData}
                                  answerMode={currentQuestionAnsMode}
                                />
                              )}
                            </>
                          )}
                        </div>
                        {questionData?.question_config?.isThereFooterInfo ===
                          true &&
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
                    </>
                  )}
                </div>
              </div>
            </>
          </>
        )}
        {loading && <p>loading...</p>}
      </div>
    </div>
  );
};

export default Exam;
