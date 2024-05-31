const ReportYourScore = () => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Report Your Scores
      </h3>
      <div className="py-8 space-y-2">
        <p className="text-sm font-thin">
          You have chosen to REPORT your GRE General Test scores, or you did not
          respond on the previous screen..
        </p>
        <p className="text-sm font-thin">This is the last chance to change your mind.</p>
        <p className="text-sm font-thin">Once presented, scores CANNOT be canceled.</p>
        <p className="text-sm font-thin">
          To confirm that you would like to report your scores, select{" "}
          <span className="font-semibold">Report Scores</span>. To cancel your
          scores, select <span className="font-semibold">Cancel Scores</span>.
        </p>
        <br />
      </div>
    </div>
  );
};

export default ReportYourScore;
