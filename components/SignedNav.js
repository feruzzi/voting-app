"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
const SignedNav = () => {
  return (
    <>
      <li>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="#">Settings</Link>
        <button
          className="btn btn-outline btn-error btn-sm"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/login`,
            })
          }
        >
          Logout
        </button>
      </li>
    </>
  );
};

export default SignedNav;
