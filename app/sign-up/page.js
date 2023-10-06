import SignUp from "@/components/SignUp";

const Sign = () => {
  return (
    <div className="bg-base-100 flex flex-col items-center">
      <div className="card card-bordered w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign-Up</h2>
          <p>This Sign-Up Page</p>
          <div className="divider"></div>
          <SignUp />
        </div>
      </div>
    </div>
  );
};
export default Sign;
