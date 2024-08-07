import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useApi from "../../lib/api";
import { error } from "../../lib/notify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { encryptData } from "../../lib/crypt";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type TSchema = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

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
    try {
      // Attempt to log in by sending a POST request to the /login endpoint
      const res = await useApi.post("/login", {
        email: e.email, // User's email
        password: e.password, // User's password
        type: "student", // User type
      });
      const { data, status } = res; // Destructure response to get data and status
      if (status === 200) {
        // If login is successful (status 200)
        localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, data.data.token); // Store token in localStorage
        localStorage.setItem(
          process.env.REACT_APP_USER_KEY,
          encryptData(data.data.user) // Encrypt and store user data in localStorage
        );
        navigate("/"); // Navigate to the homepage
      } else {
        // If login is unsuccessful
        error(data.data.message); // Display error message
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        let errorMessage = err.response?.data.message; // Original error message from the API
        if (errorMessage === "Account not found.") {
          errorMessage =
            "The account you are trying to access does not exist. Please check your credentials and try again.";
        }
        error(errorMessage); // Log or display the user-friendly error message
      } else if (err instanceof Error) {
        error(err.message); // If error is a generic Error, display the error message
      } else {
        error("An unexpected error occurred. Please try again later."); // Default error message
      }
    }
  };

  useEffect(() => {
    document.title = "Student Login";
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
    if (token) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (e: TSchema) => {
    setIsSubmit(true);
    await onLogin(e);
    setIsSubmit(false);
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
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                className="w-fill h-auto md:w-[80%] md:mx-auto"
                src={`${process.env.PUBLIC_URL}/images/logos/logo.png`}
                alt="logo"
              />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-p1-800 md:text-2xl ">
                Sign in to your account
              </h1>
              {/* <p className="leading-tight tracking-tight text-p2-600 "> Take Your Mock Test Here</p> */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className={`
                     border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
                       errors.email
                         ? "bg-red-50 border border-red-300 focus:ring-red-600 focus:border-red-600 "
                         : "bg-gray-50 border-gray-300 focus:ring-p1-600 focus:border-p1-600 "
                     }
                    `}
                    placeholder="name@company.com"
                    autoComplete="on"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    autoComplete="on"
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`
                    border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  ${
                      errors.password
                        ? "bg-red-50 border border-red-300 focus:ring-red-600 focus:border-red-600 "
                        : "bg-gray-50 border-gray-300 focus:ring-p1-600 focus:border-p1-600 "
                    }
                   `}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={`${process.env.PUBLIC_URL}/forgot-password`}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>

                  <button
                    disabled={isSubmit}
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      {isSubmit ? "Loading..." : "Sign in"}
                    </span>
                  </button>
                </div>
                {/* <p className="font-light text-black text-lg text-center bg-p2-300 p-1 rounded-lg">
                  Access For Dr.Raju's Students Only
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
