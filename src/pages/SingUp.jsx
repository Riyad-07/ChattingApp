import React, { useState } from "react";
import Input from "../components/Input";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignUpV } from "../Validation/SignValidation";
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingUp = () => {
  const auth = getAuth();
  const [loading, SetLoading] = useState(false);
  const db = getDatabase();
  let [show, setShow] = useState(false);
  let [show1, setShow1] = useState(false);
  const navigate = useNavigate()

  let initialValues = {
    name1: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      newUsers();
    },

    validationSchema: SignUpV,
  });

  const newUsers = () => {
    SetLoading(true),
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({user}) => {
          console.log(user);
          
          updateProfile(auth.currentUser, {
            displayName: formik.values.name1,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  toast.success("Verification Code Send Succesfully", {
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
                  
                  let setTime = setTimeout(() => {
                    navigate('/sign-in')
                  }, 2000);
                  let stop = clearTimeout(()=>{
                    setTime(stop)
                  })
                })
                .then(() => {
                  set(ref(db, "users/" + user.uid), {
                    username: user.displayName,
                    email: user.email,
                  });
                })
                .catch(() => {
                  toast.error(error.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                });
            });
        })
        .catch((error) => {
          console.log('not ok');
          
          if (error.message.includes("auth/email-already-in-use")) {
            toast.error(" Email Already in Register", {
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
          // console.log(error.message);
        });
  };

  return (
    <>
    <Helmet>
      <title>Registration</title>
    </Helmet>
    <ToastContainer/>
      <div className="flex flex-col items-center justify-center w-full h-screen">
          <h1 className="font-joti text-[80px]">TalkNest</h1>
        <div className="">
          <div className="py-[89px] px-[43px] mt-[22px]">
            <form
              className=""
              onSubmit={formik.handleSubmit}
            >
              <Input
              className='mb-7'
                type="text"
                placeholder=""
                value={formik.values.name1}
                name="Fname"
                id="name1"
                InputTitle="First Name"
                onChange={formik.handleChange}
              >
                {formik.errors.name1 && formik.touched.name1 && (
                  <p className="text-red-600">{formik.errors.name1}</p>
                )}
              </Input>

              <Input
              className='mb-7'
                type="email"
                placeholder=""
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
                className="relative mb-7"
                type={show ? "text" : "password"}
                placeholder=""
                value={formik.values.password}
                id="password"
                InputTitle="Enter Password"
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

              <Input
                className="relative mb-7"
                type={show1 ? "text" : "password"}
                placeholder=""
                value={formik.values.rePassword}
                id="rePassword"
                InputTitle="Enter Confirm password"
                name="rePassword"
                onChange={formik.handleChange}
              >
                <div
                  onClick={() => setShow1(!show1)}
                  className="bg-red-700 cursor-pointer "
                >
                  {show1 ? (
                    <FaEyeSlash className="absolute right-3 top-2/3 " />
                  ) : (
                    <FaEye className="absolute right-3 top-2/3 " />
                  )}
                </div>
              </Input>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-600">{formik.errors.rePassword}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 text-lg font-medium text-white bg-[#313131] rounded-[10px]"
              >
                {loading ? <BeatLoader color="white" /> : "Sign Up"}
              </button>
            </form>

            <p className="text-base mt-7">
              Already have an account ? <Link className="text-[#236DB0]" to="/sign-in">Sign In</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingUp;
