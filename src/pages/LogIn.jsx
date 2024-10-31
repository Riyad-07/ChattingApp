import React, { useState } from "react";
import {  toast, ToastContainer } from "react-toastify";
import Input from "../components/Input";
import { useFormik } from "formik";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignInV } from "../Validation/SignValidation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUsers } from "../Featchers/slice/userSlice";
import { Helmet } from "react-helmet";

const LogIn = () => {
  const [loading, SetLoading] = useState(false);

  let [show, setShow] = useState(false);
  let [show1, setShow1] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    ).then(({ user }) => {
        if (user.emailVerified === true) {
          dispatch(logInUsers(user));
          localStorage.setItem("user", JSON.stringify(user));
          console.log("true");
          navigate("/");
        } else {
          toast.error("verify your email", {
            position: "top-center",
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
            position: "top-center",
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
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center w-full h-screen">
          <h1 className="font-joti text-[80px]">TalkNest</h1>
        <div className="py-[89px] px-[43px] mt-[22px]">
          <form
            className="w-[474px] "
            onSubmit={formik.handleSubmit}
          >
            <Input
            className='mb-8'
              type="email"
              placeholder="Enter Your Email"
              value={formik.values.email}
              id="email"
              InputTitle="Enter Email"
              name="email"
              onChange={formik.handleChange}
            >
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </Input>

            <Input
              className="relative mb-8"
              type={show1 ? "text" : "password"}
              placeholder="Enter Your Password"
              value={formik.values.password}
              id="password"
              InputTitle="Enter Password"
              name="password"
              onChange={formik.handleChange}
            >
              <div
                onClick={() => setShow1(!show1)}
                className="absolute cursor-pointer right-3 -translate-y-2/5 top-2/3"
              >
                {show1 ? (
                  <FaEyeSlash className="" />
                ) : (
                  <FaEye className="" />
                )}
              </div>
            </Input>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600">{formik.errors.password}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 font-medium text-white bg-[#484848] rounded-[10px] text-lg my-7"
            >
              {loading ? <BeatLoader color="white" /> : "Sign In"}
            </button>
            <p className="text-base text-black">
            Don't Have an account ? <Link className="text-[#236DB0]" to="/registration">Sign Up</Link>{" "}
          </p>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default LogIn;
