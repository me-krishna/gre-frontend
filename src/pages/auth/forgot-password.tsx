import { FC, useState } from "react";
import PasswordChange from "./forgot-password-comps/PasswordChange";
import OTPVerify from "./forgot-password-comps/OTP-Verify";
import VerifyEmail from "./forgot-password-comps/VerifyEmail";
import SuccessMsg from "./forgot-password-comps/SuccessMsg";

const ForgotPassword: FC = () => {
  const [compRender, setCompRender] = useState<
    "verify-email" | "password-change" | "otp-verify" | "success"
  >("verify-email"); // ["verify-email", "password-change", "otp-verify"]
  const [email, setEmail] = useState<string>("");

  const onEmailVerify = (e: string) => {
    setEmail(e);
    setCompRender("otp-verify");
  };

  const onOtpVerify = () => {
    setCompRender("password-change");
  };

  const onPasswordChange = () => {
    setCompRender("success");
  };

  return (
    <section
      style={{
        backgroundImage: "url(./images/bghome.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="bg-black bg-opacity-70">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {compRender === "verify-email" && (
              <VerifyEmail onEmailVerify={onEmailVerify} />
            )}
            {compRender === "otp-verify" && (
              <OTPVerify email={email} onOTPVerify={onOtpVerify} />
            )}
            {compRender === "password-change" && (
              <PasswordChange
                email={email}
                onPasswordChange={onPasswordChange}
              />
            )}
            {compRender === "success" && <SuccessMsg />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
