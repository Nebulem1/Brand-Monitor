import api from "./Axios";
import { Button, Input } from "./comp";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if(!name || ! email || !password || !brand){
          alert("Please Fill all values")
          return 
    }
    const ob = { name, email, password, brand };

    try {
      const res = await api.post("/register", ob);
      if (res.data) {
        alert("Registered Successfully");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <div className="m-auto w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-white text-center">
          Register 
        </h1>

        {/* Name */}
        <div className="mt-4">
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full"
          />
        </div>

        {/* Brand Radio Buttons */}
        <div className="mt-4 text-white">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            Select Brand:
          </label>
          <div className="flex gap-4">
            {["Adidas", "Nike", "Apple"].map((b) => (
              <label key={b} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={b}
                  checked={brand === b}
                  onChange={() => setBrand(b)}
                  className="accent-indigo-600"
                />
                <span className="text-gray-800 dark:text-white">{b}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-6">
          <Button
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800"
            onClick={handleSignup}
          >
            Register
          </Button>
        </div>

        {/* Login link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
