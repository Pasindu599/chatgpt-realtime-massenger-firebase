"use client";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <button
        onClick={() => signIn("google")}
        className="text-white border-white p-5 border font bold text-3xl animate-pulse"
      >
        Sign In to use Chat gpt
      </button>
    </div>
  );
}

export default Login;
