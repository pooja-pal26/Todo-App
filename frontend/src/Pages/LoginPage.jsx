import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful ✅");

      navigate("/todo");

    } catch (error) {
      console.error(error);

      alert("Invalid Email or Password ❌");
    }
  };


  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Google Login Successful ✅");

      navigate("/todo");
    } catch (error) {
      console.error(error);
      alert("Google Login Failed ❌");
    }
  };


  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f5f7fa,#e4ecfb)",
      }}
    >
      <div className="col-md-5 col-lg-4">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-5">

            <div className="text-center mb-4">

              <h2 className="fw-bold text-primary">
                Welcome Back
              </h2>

              <p className="text-muted">
                Login to continue
              </p>

            </div>

            <form onSubmit={handleLogin}>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                Login
              </button>

              <div className="text-center my-3">
                <span className="text-muted">OR</span>
              </div>

              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    alert("Google Login Failed");
                  }}
                />
              </div>

            </form>

            <div className="text-center mt-4">

              <p className="text-muted mb-0">
                Don't have an account?
              </p>

              <Link
                to="/signup"
                className="btn btn-outline-primary mt-2"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}