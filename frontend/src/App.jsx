import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/Signup";
import TodoForm from "./Components/TodoForm";
import ProfilePage from "./Pages/ProfilePage";
import EditProfile from "./Pages/EditProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/todo" element={<TodoForm />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}