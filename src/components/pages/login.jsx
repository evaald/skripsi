import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../dataUser"
import LoginPictures from "../imageAndVector/human-organs-character-composition.png"
import LogoRsud from "../imageAndVector/download.webp";
import Logo from "../elements/logo/index";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


const dummyUser = users.find(
  (user) =>
    user.name.toLowerCase() === form.username.toLowerCase() &&
    user.password === form.password
);

if (!dummyUser) {
  setError("Username atau password salah!");
  return;
};

if (dummyUser.role === "admin" || dummyUser.role === "manajemen") {
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", dummyUser.role);
  localStorage.setItem("username", dummyUser.name);
  navigate("/dashboard");
} else {
  setError("Kamu belum terdaftar sebagai user.");
};
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="w-full lg:w-1/2">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="lg:hidden">
          <Logo
            src={LogoRsud}
            alt="Logo RSUD Kanjuruhan Kepanjen"
            className2="flex flex-col items-center justify-center"
            className="h-28 w-28 mb-2"
            classNameLabel="mt-2 text-center text-xl font-bold italic text-gray-800 bg-[#C0EBA6] rounded-lg p-4 shadow-md"
            label="UCD SISTEM LAPORAN MORBIDITAS RAWAT INAP RSUD KANJURUHAN KEPANJEN"
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center text-2xl font-bold italic text-gray-900">
        <h1>Welcome to</h1>
        <h1>UCD SISTEM LAPORAN MORBIDITAS</h1>
        <h1>RSUD KANJURUHAN KEPANJEN</h1>
        </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={form.username}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-semibold bg-red-100 px-2 py-1 rounded">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-3 text-md font-semibold text-black shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 lg:bg-radial lg:from-emerald-200 lg:from-40% lg:to-emerald-400 lg:flex lg:items-center lg:justify-center">
        <img
          src={LoginPictures}
          alt="Login Background"
          className="w-3/4 h-3/4 object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
