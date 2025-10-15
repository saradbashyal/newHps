import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./auth/signup/signup";
import Login from "./auth/login/login";
import ResetPassword from "./auth/forgotPassword/resetPassword";
import Otp from "./auth/forgotPassword/OTP";
import ConfirmPassword from "./auth/forgotPassword/confirmPassword";
import Dashboard from "./pages/dashboard";
import Patients from "./pages/patients";
import EditPatient from "./pages/editPatient";
import ViewPatient from "./pages/viewPatient";
import ProtectedRoute from "./components/protectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ResetPassword />}></Route>
          <Route path="/verifyOtp" element={<Otp />}></Route>
          <Route path="/confirmpassword" element={<ConfirmPassword />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/patients" element={<Patients />}></Route>
              <Route path="/EditPatient/:id" element={<EditPatient />}></Route>
              <Route path="/ViewPatient/:id" element={<ViewPatient />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
