import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import WelcomePage from "./pages/WelcomePage"
import DashboardPage from "./pages/DashboardPage"
import SelfHelpPage from "./pages/SelfHelpPage"
import AboutUsPage from "./pages/AboutUsPage"
import ContactUsPage from "./pages/ContactUsPage"
import NotFoundPage from "./pages/NotFoundPage"
import LogoutPage from "./pages/LogoutPage"
import Breathing from "./pages/Breathing"
import GratitudeJournal from "./pages/GratitudeJournal"
import SoothingSoundsPage from "./pages/SoothingSoundsPage"
import Chatbot from "./pages/Chatbot"
import Thoughts from "./pages/Thoughts"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/self-help" element={<SelfHelpPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/breathing-exercise" element={<Breathing />} />
      <Route path="/gratitude-journal" element={<GratitudeJournal/>}/>
      <Route path="/soothing-sounds" element={<SoothingSoundsPage/>}/>
      <Route path="/chatbot" element={<Chatbot/>} />
      <Route path="/thoughts" element={<Thoughts/>} />
      {/* Add more routes as needed */}
    </Routes>
  )
}

export default App
