"use client";
import axios from "axios";
const Sign = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var formData = new FormData(e.target);
      const form_values = Object.fromEntries(formData);
      const response = await axios.post(
        "api/signup",
        JSON.stringify({
          email: form_values.email,
          name: form_values.name,
          password: form_values.password,
          status: "1",
        })
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-base-100 flex flex-col items-center">
      <div className="card card-bordered w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign-Up</h2>
          <p>This Sign-Up Page</p>
          <div className="divider"></div>
          <form onSubmit={handleSubmit} method="POST">
            <div className="grid grid-cols-2">
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type Name here"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  id="name"
                />
              </div>
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
                Sign-Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Sign;
