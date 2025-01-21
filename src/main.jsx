import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./Store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import Paste from "./components/Paste.jsx";
import ViewPaste from "./components/ViewPaste.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pastes/",
        element: <Paste />,
      },
      {
        path: "/viewpaste/:id",
        element: <ViewPaste />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
