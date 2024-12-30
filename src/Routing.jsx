import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Firstpage from "./firstpage/firstpage.jsx";
import Sign from "./SignUp/Sign.jsx";
import Forgotpassword from "./forgotpass/forgotpassword.jsx";
import About from "./AboutUs/About.jsx";
import { Toaster } from "sonner";
import HomePage from "./Home/HomePage.jsx";
import AfterGoal from "./Home/AfterGoal.jsx";
import Atsresume from "./AtsResume/Atsresume.jsx";
import ManageExp from "./ManageExp/ManageExp.jsx";
import Todo from "./ToDo/Todo.jsx";
import PaymentSub from "./Payment/PaymentSub.jsx";
import PdfResume from "./AtsResume/pdfResume.jsx";
import DownloadResume from "./AtsResume/DownloadResume.jsx";

export const baseurl = 'https://stkitbackend-8.onrender.com';

const Routing = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Sign />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="about-us" element={<About />} />
        <Route path="home-page" element={<HomePage />} />
        <Route path="to-do-list" element={<Todo />} />
        <Route path="manage-exp" element={<ManageExp />} />
        <Route path="payment-subscription" element={<PaymentSub />} />

        {/* Main route for Atsresume */}
        <Route path="/ats-resume" element={<Atsresume />} />

        {/* Child route for PdfResume */}
        <Route path="/ats-resume/build-pdf-resume" element={<PdfResume />} />
        <Route path="/ats-resume/build-pdf-resume/download-resume" element={<DownloadResume />} />

        
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}
