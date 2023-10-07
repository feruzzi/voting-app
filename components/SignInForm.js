"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SignInForm = () => {
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var formData = new FormData(e.target);
      const form_values = Object.fromEntries(formData);
      const signInData = await signIn("credentials", {
        email: form_values.email,
        password: form_values.password,
        redirect: false,
      });
      console.log(signInData);
      if (signInData?.error) {
        console.log(signInData.error);
        setAlert(true);
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      {alert ? (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Login Failed!</span>
        </div>
      ) : (
        ""
      )}
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Type Email here"
          className="input input-bordered w-full max-w-xs"
          name="email"
          id="email"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Type Password here"
          className="input input-bordered w-full max-w-xs"
          name="password"
          id="password"
        />
      </div>
      <div className="card-actions justify-end">
        <button type="submit" className="btn btn-primary w-full">
          Sign-In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
