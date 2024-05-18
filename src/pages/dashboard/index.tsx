"use client";

import useApi from "../../lib/api";
import { Table, Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import MainLayout from "src/layout/MainLayout";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const getListOfTest = async () => {
    setLoading(true);
    const res = await useApi.get("/exams");
    const { status, data } = res;
    if (status === 200) {
      setTests(data.data);
    } else {
      setTests([]);
    }
    setLoading(false);
  };

  const takeTest = async (id: string) => {
    nav(`/gretest/${id}`);
  };
  const continueTest = async (id: string, qid: string) => {};

  useEffect(() => {
    getListOfTest();
  }, []);

  return (
    <MainLayout>
      <div className="w-screen">
        <div className="flex justify-center items-center py-5 ">
          {!loading && (
            <>
              <div className="overflow-x-auto">
                <h1 className="text-3xl font-semibold text-p1-900 mb-3">
                  Total Tests
                </h1>
                {tests.length > 0 && (
                  <Table className="min-w-[700px]">
                    <Table.Head>
                      <Table.HeadCell>S.NO</Table.HeadCell>
                      <Table.HeadCell>TEST SET</Table.HeadCell>
                      <Table.HeadCell>Take Test</Table.HeadCell>
                      <Table.HeadCell>Result</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {tests.map((test, i) => (
                        <Table.Row
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          key={uuidv4()}
                        >
                          <Table.Cell>{i + 1}</Table.Cell>
                          <Table.Cell>{test?.title}</Table.Cell>
                          <Table.Cell>
                            {!test?.attempted && (
                              <button
                                className="py-1 rounded bg-p1-900 text-p1-200 px-3 hover:bg-opacity-90"
                                onClick={() => takeTest(test?.uuid)}
                              >
                                Take Test
                              </button>
                            )}
                            {test?.attemptedData?.status === 0 && (
                              <button className="py-1 rounded bg-p2-500 text-p2-100 px-3 hover:bg-opacity-90">
                                Continue Test
                              </button>
                            )}
                            {test?.attemptedData?.status === 1 && (
                              <Badge color="green" className="inline-block">
                                Test Completed
                              </Badge>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            {test?.attemptedData?.status === 1 ? (
                              <Badge color="indigo" className="inline-block">
                                View Result
                              </Badge>
                            ) : (
                              <Badge color="pink" className="inline-block">
                                -
                              </Badge>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </div>
            </>
          )}
          {loading && (
            <div className="flex justify-center items-center">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
