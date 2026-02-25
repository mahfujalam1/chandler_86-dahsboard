import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigation = useNavigate();
  // const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("token", "flaskhdflkajsdlfh")
      navigation("/");
      
      // const res = await login(formData);
      // if (res?.data) {
      //   toast.success(res?.data?.message);
      //   localStorage.setItem("token", res?.data?.data?.token);
      //   navigation("/");
      // } else if (res?.error) {
      //   toast.error(res?.error?.data?.message);
      // }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-md w-full max-w-lg p-10 text-center">
        {/* Logo */}
        <div className="flex flex-col text-3xl font-semibold items-center mb-6">
          Welcome Back
        </div>

        {/* Sign-In Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-black pr-10"
              />
              <span
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </span>
            </div>
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-black"
              />
              <span className="text-gray-600">Remember password</span>
            </label>
            <a
              href="/auth/forgot-password"
              className="text-gray-600 hover:text-black hover:underline transition-all"
            >
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition-all"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
