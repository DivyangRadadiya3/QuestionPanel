import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import Store from "./Redux/store/store"
import Store from "./Context/Store/Store";
// Store.subscribe(() => console.log(Store.getState()));

const Root = () => {
  const value = useMemo(() => Store, []);
  return (
    <Provider store={value}>
      <App />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
