import { useParams } from "react-router-dom";
import useApi from "../../../lib/api";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const Tags = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className=" text-[#7d7d7ds] relative shadow-lg border shadow-gray-300 rounded-lg p-3 min-w-[30%]">
      {title}
      <span className="bg-[#cc6813] text-white h-full absolute top-0 right-0 w-20 flex justify-center items-center text-2xl rounded-lg">
        {value}
      </span>
    </div>
  );
};

const ProgressSummary = () => {
  const { exam_section_id } = useParams();
  const [summary, setSummary] = useState<any[]>([]);
  const [correctData, setCorrectData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    try {
      const res = await useApi.post("/summaryOfPerformance", {
        section_id: exam_section_id,
      });

      const { status, data } = res;
      if (status === 200) {
        const response = data.data;
        const arr = Object.keys(response)
          .map((key) => response[key])
          .sort((a, b) => a.sectionNo - b.sectionNo);
        setSummary(arr);

        let onlyCorrectData = arr.reduce((acc, item) => {
          let existingTopic = acc.find(
            (topic: any) => topic.topicName === item.topicName
          );
          if (existingTopic) {
            existingTopic.totalCorrectly += item.totalCorrectly;
          } else {
            acc.push({
              topicName: item.topicName,
              totalCorrectAns: item.totalCorrectly,
            });
          }

          return acc;
        }, []);
        setCorrectData(onlyCorrectData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="font-semibold text-[#cc6915] text-2xl">
        Summary of Performance
      </h1>
      {!loading && (
        <>
          <div className="flex gap-3 ml-3">
            {correctData.map((item) => (
              <Tags
                key={v4()}
                title={item.topicName}
                value={130 + item.totalCorrectAns}
              />
            ))}
          </div>
          <div>
            <p className="font-semibold">Section Summary</p>
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#7c3165]">
                    Section #
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#7c3165] w-[200px]">
                    Section Name
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#7c3165]">
                    Total Questions
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#4a253f]">
                    Total Questions Answered
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#4a253f]">
                    {" "}
                    Questions Answered Correctly
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#4a253f]">
                    {" "}
                    Questions Answered Incorrectly
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center font-medium text-white bg-[#7c3165]">
                    {" "}
                    Questions Not Answered <sup>*</sup>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {summary.map((item) => (
                    <Table.Row key={v4()}>
                      <Table.Cell className="text-center">
                        {item.sectionNo}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.topicName}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.totalQuestions}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.totalAttempted}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.totalCorrectly}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.totalInCorrectly}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {item.totalUnAttempted}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
            <p className="text-end text-sm text-[#727272]">
              <sup>*</sup> Questions not answered are counted as incorrect in
              the scoring process.
            </p>
          </div>
          <div className="mt-20">
            <p className="text-[#535353]">
              Select <span className="font-bold">Continue</span> to review your
              test.
            </p>
          </div>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProgressSummary;
