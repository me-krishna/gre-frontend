const QuitAndSave = () => {
  return (
    <div className="p-10">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        Quit with Save
      </h3>
      <div className="py-8">
        <p className="text-justify">
          In this practice test, if you quit the test, your answers will be
          saved and you will be able to restart the test at the point you left
          off.
        </p>
        <br />
        <p>
          Select <span className="font-semibold">Quit with Save</span> to
          confirm that you want to quit the test or{" "}
          <span className="font-semibold">Return to Test</span> to return to the
          test.
        </p>
      </div>
    </div>
  );
};

export default QuitAndSave;
