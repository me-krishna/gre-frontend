"use client";

import { Table, Badge } from "flowbite-react";
import { Suspense } from "react";
import { useState } from "react";
import MainLayout from "src/layout/MainLayout";
import { v4 as uuidv4 } from "uuid";
const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<any[]>([
    {
      id: 1,
      testName: "Practise 1",
      isTestAtempted: true,
      isTestCompleted: false,
    },
    {
      id: 2,
      testName: "Practise 2",
      isTestAtempted: false,
      isTestCompleted: true,
    },
    {
      id: 3,
      testName: "Practise 3",
      isTestAtempted: false,
      isTestCompleted: false,
    },
    {
      id: 4,
      testName: "Practise 4",
      isTestAtempted: true,
      isTestCompleted: true,
    },
    {
      id: 5,
      testName: "Practise 5",
      isTestAtempted: false,
      isTestCompleted: false,
    },
  ]);

  return (
    <MainLayout>
      <div className="w-screen">
        <div className="flex justify-center items-center py-5 ">
          <div className="overflow-x-auto">
            <h1 className="text-3xl font-semibold text-gray-500 dark:text-white mb-3">
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
                      <Table.Cell>{test?.testName}</Table.Cell>
                      <Table.Cell>
                        {!test?.isTestAtempted && !test?.isTestCompleted ? (
                          <Badge
                            color="info"
                            className="inline-block cursor-pointer"
                          >
                            Take Test
                          </Badge>
                        ) : test?.isTestCompleted ? (
                          <Badge color="success" className="inline-block">
                            Test Completed
                          </Badge>
                        ) : (
                          <Badge
                            color="warning"
                            className="inline-block cursor-pointer"
                          >
                            Continue Test
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {test?.isTestCompleted || test?.isTestAtempted ? (
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
