import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import SignIn from "./routes/SignIn.jsx";
import SignUp from "./routes/SignUp.jsx";
import Dashboard from "./routes/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
