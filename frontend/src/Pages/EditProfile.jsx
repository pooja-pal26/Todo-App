import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [provider, setProvider] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setName(res.data.name);

      setEmail(res.data.email);

      setProvider(res.data.provider);

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Profile Updated");

      navigate("/profile");

    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "450px" }}
      >
        <h2 className="text-center mb-4">
          Edit Profile
        </h2>

        <form onSubmit={handleUpdate}>

          <div className="mb-3">

            <label>Name</label>

            <input
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="mb-3">

            <label>Email</label>

            <input
              className="form-control"
              value={email}
              disabled
            />

          </div>

          {provider === "local" && (
            <div className="mb-3">

              <label>New Password</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>
          )}

          <button className="btn btn-success w-100">
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
}