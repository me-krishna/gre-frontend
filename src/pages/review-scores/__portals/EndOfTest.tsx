const EndOfTest = () => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        End of Test
      </h3>
      <br />
      <br />
      <div className="py-8">
        <p className="text-justify">Your test session now complete.</p>
        <br />
        <p>
          Select <span className="font-semibold">Continue</span>
        </p>
        <br />
      </div>
    </div>
  );
};

export default EndOfTest;
