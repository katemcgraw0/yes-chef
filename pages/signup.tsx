import { useState, ChangeEvent } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/router";

const Signup = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const [form, setForm] = useState<typeof initialState>(initialState);

  const { email, password } = form;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
        />
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signUp({
              email,
              password,
            });

            if (error) alert(error.message);
            else alert("Check your email for the login link!");

            setForm(initialState);
          }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Sign up
        </button>

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) alert(error.message);
            else router.push("/");
          }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signup;
