import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import About from "./Pages/About";
import Landing from "./Pages/Landing";
import Join from "./Pages/Join";
import Contact from "./Pages/Contact";
import TNC from "./Pages/TNC";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import LoginSignup from "./Pages/LoginSignup";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
function App() {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/join" element={<Join />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tnc" element={<TNC />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login-signup" element={<LoginSignup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition="Bounce"
        />
      </Provider>
    </>
  );
}

export default App;
