import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { base_url } from "./shared/Url";
import { useNavigate } from "react-router-dom";
import Loader from "./shared/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // const [passwordErrors, setPasswordErrors] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // const validatePassword = (value) => {
  //   const errors = [
  //     value.length < 6 && "Password must be at least 6 characters long",
  //     !/[A-Z]/.test(value) && "Password must contain a capital letter",
  //     !/[!@#$%^&*]/.test(value) && "Password must contain a special character",
  //   ].filter(Boolean);

  //   setPasswordErrors(errors);
  // };

  const onSubmit = async (data) => {
    setLoading(true);

    //
    try {
      const response = await axios.post(`${base_url}/login/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const jwtToken = response.data.access;

        // Save the JWT token to session storage
        sessionStorage.setItem("jwt_token", jwtToken);

        setLoading(false);
        navigate("/");
        setLoginError(null);
      } else {
        // Handle login error
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      setLoginError("An error occurred during login"); // Set a generic error message
    }
  };

  return (
    <>
      {loading ? (
        <Loader text={"Please wait..."} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/4 mx-auto p-4 grid grid-cols-2 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
        >
          {/* Email */}
          <div className="mb-4 col-span-2">
            <label htmlFor="email" className="block text-black mb-1 font-bold">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered input-accent w-full"
              // value="viscon@gmail.com"
            />
            {errors?.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 col-span-2 w-full">
            <label
              htmlFor="password"
              className="block text-black mb-1 font-bold"
            >
              Password
            </label>
            <div className="relative bg-white rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                // value="admin"
                // onChange={(e) => validatePassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BsEyeSlashFill className="text-gray-500" />
                ) : (
                  <BsEyeFill className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
            {/* {passwordErrors.map((error, index) => (
          <span key={index} className="text-red-500">
            {error}
          </span>
        ))} */}
          </div>

          {/* Submit Button */}
          <div className="mb-4 col-span-2">
            <input
              type="submit"
              value="Enter"
              className="btn btn-primary w-full"
            />
          </div>
          {/*  */}
          {/* <p>{response.data.access}</p> */}
        </form>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default LoginForm;
