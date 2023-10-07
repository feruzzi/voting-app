import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignedNav from "@/components/SignedNav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Vote-APP
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session?.user ? (
            <li>
              <details>
                <summary>{session?.user.email}</summary>
                <ul className="p-2 bg-base-100">
                  <SignedNav />
                </ul>
              </details>
            </li>
          ) : (
            <>
              <li>
                <Link href="/sign-up">Sign-Up</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
