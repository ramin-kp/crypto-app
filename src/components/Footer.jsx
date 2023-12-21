import React from "react";

export default function Footer() {
  return (
    <div className="container">
      <div className="flex-center my-5 p-5 bg-slate-700 text-xl md:text-3xl font-black rounded-2xl">
        developed by
        <a
          href="https://www.instagram.com/ramin._kp/"
          className="ml-2 hover:text-red-500 transition-all"
        >
          ramin._kp
        </a>
      </div>
    </div>
  );
}
