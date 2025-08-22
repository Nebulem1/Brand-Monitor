import api from "./Axios"
import { Button } from "./comp";
import { Input } from "./comp";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

let Login=()=>{

   let [email,setEmail]=useState("")
   let [password,setPassword]=useState("")
   let navigate = useNavigate();
   
   let handleToken = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            let response = await api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.setItem("user", JSON.stringify(response.data))
            
            navigate("/DashBoard");
        }
    }

    let handleLogin = async (e) => {
         let token= await api.post("/token", {
            email: email,
            password: password,}
        )
         if (token.data) {
            localStorage.setItem("token", token.data.access_token);
            handleToken();
         } else {
            alert("Login Failed");
         }    
    }
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <div className="m-auto w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
          Login 
        </h1>

        <div className="mt-4">
          <Input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
         
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className="mt-6">
          <Button className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 dark:hover:bg-blue-800">
           <Link to="/signup">CreateAccount</Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
}

export default Login