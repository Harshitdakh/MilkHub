import React from 'react';

export function LoginSignupButton({ onLogin, onSignup }) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onLogin}
        type="button"
      >
        Login
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSignup}
        type="button"
      >
        Signup
      </button>
    </div>
  );
}
