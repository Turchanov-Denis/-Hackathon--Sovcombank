import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import LoginPage from './routes/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import store from './store/store'
import { Provider } from 'react-redux'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
