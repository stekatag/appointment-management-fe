import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import Root from "./routes/root.jsx";
import "./index.css";

const router = createBrowserRouter([{ path: "*", element: <Root /> }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
