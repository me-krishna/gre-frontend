import { FC } from "react";
import AnaliticalWriting from "./_guides/sections/AnaliticalWriting";
import QuantitaveReasoning from "./_guides/sections/QuantitaveReasoning";
import VerbalReasoning from "./_guides/sections/VerbalReasoning";

interface SectionInfoProps {
  question: any;
  sectionData: any[];
}

const SectionInfo: FC<SectionInfoProps> = ({ question, sectionData }) => {
  return (
    <div>
      {question.topic_id === 1 && (
        <AnaliticalWriting
          questions={question}
          sectionData={sectionData.filter(
            (res: any) => res.section_id === question.section_id
          )}
        />
      )}
      {question.topic_id === 3 && (
        <VerbalReasoning
          questions={question}
          sectionData={sectionData.filter(
            (res: any) => res.section_id === question.section_id
          )}
        />
      )}
      {question.topic_id === 2 && (
        <QuantitaveReasoning
          questions={question}
          sectionData={sectionData.filter(
            (res: any) => res.section_id === question.section_id
          )}
        />
      )}
    </div>
  );
};

export default SectionInfo;
