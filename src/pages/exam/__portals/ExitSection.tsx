const ExitSection = () => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Exit Section Confirmation
      </h3>
      <div className="py-8">
        <p className="text-justify">
          If you select <span className="font-semibold">Exit Section</span> ,
          you WILL NOT be able to return to this section of the test.
        </p>
        <br />
        <p>
          Select <span className="font-semibold">Exit Section</span> to confirm
          that you would like to exit this section. Select
          <span className="font-semibold">Return </span> to return to the
          section. test.
        </p>
      </div>
    </div>
  );
};

export default ExitSection;
