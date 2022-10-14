import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import ListPage from "./pages/ListPage";
import BasePage from "./pages/BasePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <BasePage title="Dashboard" Component={DashboardPage} />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <BasePage title="Lista" Component={ListPage} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
