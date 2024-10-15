import Lottie from "lottie-react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../components/Input";
import { useFormik } from "formik";
import LoginAni from "../Animation/LoginAni.json";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignInV } from "../Validation/SignValidation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  logInUsers } from "../Featchers/slice/userSlice";
import { Helmet } from "react-helmet";

const LogIn = () => {
  const [loading, SetLoading] = useState(false);

  let [show, setShow] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = getAuth();

  let initialValues = {
    email: "",
    password: "",
  };

  const signInUser = () => {
    SetLoading(true);

    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        if (user.emailVerified === true) {
          dispatch(logInUsers(user));
          localStorage.setItem('user', JSON.stringify(user)); 
          console.log("true");
          navigate('/')
        } else {
          toast.error("verify your email", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        SetLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error(" Your Password or Email is Incorrect", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          SetLoading(false);
        }
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },

    validationSchema: SignInV,
  });

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ToastContainer />
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex items-center justify-between w-3/4 p-4 bg-gray-400 rounded-md">
          <div className="w-[49%]">
            <Lottie animationData={LoginAni} loop={true} />
          </div>
          <div className="w-[49%]  ">
            <h2 className="mb-5 text-2xl font-bold text-center text-white">
              Log In
            </h2>
            <form
              className="flex flex-col gap-y-7"
              onSubmit={formik.handleSubmit}
            >
              <Input
                type="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                id="email"
                InputTitle="Email"
                name="email"
                onChange={formik.handleChange}
              >
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-600">{formik.errors.email}</p>
                )}
              </Input>

              <Input
                className="relative"
                type={show ? "text" : "password"}
                placeholder="Enter Your Password"
                value={formik.values.password}
                id="password"
                InputTitle="Password"
                name="password"
                onChange={formik.handleChange}
              >
                <div
                  onClick={() => setShow(!show)}
                  className="bg-red-700 cursor-pointer "
                >
                  {show ? (
                    <FaEyeSlash className="absolute right-3 top-2/3 " />
                  ) : (
                    <FaEye className="absolute right-3 top-2/3 " />
                  )}
                </div>
              </Input>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-600">{formik.errors.password}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 font-bold text-white bg-green-400 rounded-md"
              >
                {loading ? <BeatLoader /> : "Sign In"}
              </button>
            </form>

            <p className="mt-5 text-base">
              Don't Have an account ? <Link to="/registration">Sign Up</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
