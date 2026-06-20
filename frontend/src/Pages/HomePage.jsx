import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="container text-center mt-5">

      <h1 className="mb-4">Todo App</h1>

      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "400px" }}>

        {/* IF USER IS LOGGED IN */}
        {token ? (
          <>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => navigate("/todo")}
            >
              Go to Todo
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* IF USER IS NOT LOGGED IN */}
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>

            <button
              className="btn btn-success w-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}