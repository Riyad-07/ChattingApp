import React from "react";
import SingUp from "./pages/SingUp";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/LogIn";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayOut from "./RootLayOut";
import Home from "./pages/Home";
import LoginUserRoute from "./PrivateRoute/LoginUser";
import NotLoginUserRoute from "./PrivateRoute/NotLoginUser";
import Message from "./pages/Message";
import "cropperjs/dist/cropper.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LoginUserRoute />}>
        <Route element={<RootLayOut/>}>
          <Route path="/" element={<Home />} />
          <Route path="/message" element={<Message />} />
        </Route>
      </Route>

      <Route element={<NotLoginUserRoute />}>
        <Route path="/registration" element={<SingUp />} />
        <Route path="/sign-in" element={<LogIn />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
