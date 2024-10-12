import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import FirebaseConfig from "./DB/FirebaseConfig.js";
import { Provider } from "react-redux";
import store from "./Featchers/Store.js";
import FirebaseConfig from './DB/FirebaseConfig.js'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
