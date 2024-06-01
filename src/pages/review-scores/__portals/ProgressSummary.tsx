import { Table } from "flowbite-react";

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
  return (
    <div className="p-8 space-y-4">
      <h1 className="font-semibold text-[#cc6915] text-2xl">
        Summary of Profromance
      </h1>
      <div className="flex gap-3 ml-3">
        <Tags title="Verbal Reasoning" value="160" />
        <Tags title="Quantitative Reasoning" value="160" />
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
              <Table.Row>
                <Table.Cell className="text-center">2</Table.Cell>
                <Table.Cell className="text-center">
                  Verbel Reasoning
                </Table.Cell>
                <Table.Cell className="text-center">12</Table.Cell>
                <Table.Cell className="text-center">1</Table.Cell>
                <Table.Cell className="text-center">1</Table.Cell>
                <Table.Cell className="text-center">0</Table.Cell>
                <Table.Cell className="text-center">10</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="text-center bg-[#f8ebe5]">3</Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">
                  Quantitave Reasoning
                </Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">12</Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">1</Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">1</Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">0</Table.Cell>
                <Table.Cell className="text-center bg-[#f8ebe5]">10</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="text-center">4</Table.Cell>
                <Table.Cell className="text-center">
                  Verbel Reasoning
                </Table.Cell>
                <Table.Cell className="text-center">12</Table.Cell>
                <Table.Cell className="text-center">1</Table.Cell>
                <Table.Cell className="text-center">1</Table.Cell>
                <Table.Cell className="text-center">0</Table.Cell>
                <Table.Cell className="text-center">10</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <p className="text-end text-sm text-[#727272]">
          <sup>*</sup> Questions not answered are counted as incorrect in the
          scoring process.
        </p>
      </div>
      <div className="mt-20">
        <p className="text-[#535353]">
          Select <span className="font-bold">Continue</span> to review your test.
        </p>
      </div>
    </div>
  );
};

export default ProgressSummary;
