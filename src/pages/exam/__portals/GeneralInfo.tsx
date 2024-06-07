const GeneralInfo = () => {
  return (
    <div className="p-10 text-sm">
      <h3 className="font-bold text-[#414043] text-2xl  border-b border-[#B0AFAF] ">
        General Test Information
      </h3>
      <br />
      <p className="font-semibold text-md">Timing Information</p>
      <br />
      <p>Total testing time on this test is 1 hour and 58 minutes.</p>
      <br />
      <p>
        If you wish to leave your seat during the test, please raise your hand
        or otherwise indicate that you need the administrator - timing will not
        stop.
      </p>
      <br />
      <p className="font-semibold text-md">Test Information</p>
      <br />
      <p>
        If you have a concern about the wording of a test question, please note
        the question number and continue the test. Report your concern to the
        administrator after you complete the test.
      </p>
      <br />
      <p>
        No credit will be given for any responses marked on scratch paper. Use
        the scratch paper to work out your answers. All scratch paper must be
        turned in to the administrator (or erased in front of the administrator
        in an at-home test) at the end of the testing session.
      </p>
      <br />
      <p>
        Within a timed section you may skip any question and return to it later
        before you exit the section. You should answer as many questions as
        possible during the test and manage your time with this in mind. Use the {" "}
        <span className="font-semibold">Review</span> {" "}
        button at any time during the test to review which questions you have
        answered and which questions you have skipped.
      </p>
      <br />
      <p>
        Select <span className="font-semibold">Continue</span> to proceed.
      </p>
    </div>
  );
};

export default GeneralInfo;
