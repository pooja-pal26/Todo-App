import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
      alert("Please Login");

      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px" }}
      >
        <div className="text-center">

          <img
            src={
              user.picture ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            width="120"
            className="rounded-circle mb-3"
          />

          <h3>{user.name}</h3>

          <p className="text-muted">
            {user.email}
          </p>

          <p>
            <strong>Login Type:</strong>{" "}
            {user.provider}
          </p>

          <Link
            to="/edit-profile"
            className="btn btn-primary w-100 mt-3"
          >
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 mt-2"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}