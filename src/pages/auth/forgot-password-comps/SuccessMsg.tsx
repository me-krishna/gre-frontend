const SuccessMsg = () => {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-emerald-50 rounded-md">
      <img
        className="w-fill h-auto  md:mx-auto w-[200px]"
        src={`${process.env.PUBLIC_URL}/images/logos/logo.png`}
        alt="logo"
      />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-p1-800 md:text-2xl ">
        Password Changed
      </h1>
      <p className="text-sm text-gray-900 dark:text-white">
        Your password has been successfully changed. Please login with your new
        password.
      </p>
      <div className="flex items-center justify-between">
        <a
          href={`${process.env.PUBLIC_URL}/login`}
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 underline "
        >
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default SuccessMsg;
