import React, { useState } from "react";
import Input from "../components/Input";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignUpV } from "../Validation/SignValidation";
import Lottie from "lottie-react";
import RegistrationAni from "../Animation/RegistrationAni.json";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const SingUp = () => {
  const auth = getAuth();
  const [loading, SetLoading] = useState(false);
  const db = getDatabase();
  let [show, setShow] = useState(false);

  let initialValues = {
    name1: "",
    email: "",
    password: "",
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
                })
                .then(() => {
                  set(ref(db, "users/" + user.uid), {
                    username: user.displayName,
                    email: user.email,
                  });
                })
                .catch(() => {
                  toast.error(error.message, {
                    position: "top-right",
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
          if (error.message.includes("auth/email-already-in-use")) {
            toast.error(" Email Already in Register", {
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
          // console.log(error.message);
        });
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-3/4 bg-gray-400 flex justify-between items-center p-4 rounded-md">
          <div className="w-[49%]">
            <Lottie animationData={RegistrationAni} loop={true} />
          </div>
          <div className="w-[49%]  ">
            <h2 className="text-center font-bold text-2xl text-white mb-5">
              Registration form
            </h2>
            <form
              className="flex flex-col gap-y-7"
              onSubmit={formik.handleSubmit}
            >
              <Input
                type="text"
                placeholder="Enter Your Name"
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
                  className="bg-red-700 cursor-pointer  "
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
                className="text-white bg-green-400 font-bold w-full py-2 rounded-md"
              >
                {loading ? <BeatLoader /> : "Sing Up"}
              </button>
            </form>

            <p className="text-base mt-5">
              Already have an account ? <Link to="/sign-in">Sign In</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingUp;
