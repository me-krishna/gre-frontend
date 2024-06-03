const ExitForce = ({ topicTitle }: { topicTitle: string }) => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Confirm Early Exit on {topicTitle} Section
      </h3>
      <div className="py-8">
        <p className="text-justify">
          You still have time to write your response. As long as there is time
          remaining, you can keep writing or revising your response.
        </p>
        <br />
        <p>
          Select <span className="font-semibold">Return</span> to keep writing
          or revising. Select <span className="font-semibold">Continue</span> to
          leave this section.
        </p>
        <br />
        <p>
          Once you leave this section you{" "}
          <span className="font-semibold">WILL NOT</span> be able to return to
          it.
        </p>
      </div>
    </div>
  );
};

export default ExitForce;
