import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful ✅");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed ❌");
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
                Create Account
              </h2>

              <p className="text-muted">
                Join your Todo Manager
              </p>
            </div>

            <form onSubmit={handleSignup}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />
              </div>

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
                  placeholder="Create password"
                  autoComplete="new-password"
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
                Register
              </button>

            </form>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="btn btn-outline-primary mt-2"
              >
                Login Here
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}