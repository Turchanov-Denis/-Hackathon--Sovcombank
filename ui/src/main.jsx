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
import AdminPage from './routes/AdminPage';
import BalanceContent from './components/Home/BalanceContent';
import ReplenishAmount from './components/Home/ReplenishAmount';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/balance",
        element: <BalanceContent />,
      },
      {
        path: "/replenish",
        element: <ReplenishAmount />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element: <AdminPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 
);
