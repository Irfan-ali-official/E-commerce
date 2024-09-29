import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import Navbar from "./components/Navbar";

// import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store.js"; // Import the store

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/cart" element={<CartPage />}></Route> */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <UserRoute>
                  <CheckoutPage />
                </UserRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
