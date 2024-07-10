import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";
import useApi from "../../../lib/api";
import { error } from "../../../lib/notify";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one Uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one Special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords din't matched",
    path: ["confirmPassword"], // This specifies that the error should be attached to `confirmPassword`
  });

type TSchema = z.infer<typeof schema>;

interface PasswordChangeProps {
  onPasswordChange: () => void;
  email: string;
}

const PasswordChange: FC<PasswordChangeProps> = ({
  onPasswordChange,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSchema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const onLogin = async (e: TSchema) => {
    console.log(e);
    try {
      const res = await useApi.post("/update-password", {
        password: e.password,
        email: email,
      });
      const { data, status } = res;
      if (status === 200) {
        onPasswordChange();
      } else {
        error(data.data.message);
      }
    } catch (err: any) {
      error(
        err instanceof AxiosError
          ? err.response?.data.message
          : err instanceof Error
          ? err.message
          : err?.message
          ? err.message
          : "An error occurred"
      );
    }
  };

  const onSubmit = async (e: TSchema) => {
    setIsSubmit(true);
    await onLogin(e);
    setIsSubmit(false);
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <img
        className="w-fill h-auto md:w-[80%] md:mx-auto"
        src={`${process.env.PUBLIC_URL}/images/logos/logo.png`}
        alt="logo"
      />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-p1-800 md:text-2xl ">
        Create New Password
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="text"
            {...register("password")}
            id="password"
            className={`
           border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
             errors.password
               ? "bg-red-50 border border-red-300 focus:ring-red-600 focus:border-red-600 "
               : "bg-gray-50 border-gray-300 focus:ring-p1-600 focus:border-p1-600 "
           }
          `}
            placeholder="New Password"
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="ConfirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            autoComplete="on"
            type="password"
            id="ConfirmPassword"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className={`
          border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
            errors.password
              ? "bg-red-50 border border-red-300 focus:ring-red-600 focus:border-red-600 "
              : "bg-gray-50 border-gray-300 focus:ring-p1-600 focus:border-p1-600 "
          }
         `}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <a
            href={`${process.env.PUBLIC_URL}/login`}
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 underline "
          >
            Back to Login
          </a>

          <button
            disabled={isSubmit}
            className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {isSubmit ? "Loading..." : "Create Password"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
