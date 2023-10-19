"use client";
import axios from "axios";
import { useState } from "react";
import Alert from "@/components/utils/Alert";
const Verify = (props) => {
  const [password, setPassword] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`../api/vote/verify/${props.code}`, {
        password: password,
        code: props.code,
      });
      if (response.data.res == "verify") {
        props.verify(true);
        setAlert(false);
      } else {
        props.verify(false);
        setAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <dialog id="verify-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Password</h3>
        {alert ? <Alert msg="Password Invalid !" /> : ""}

        <form method="dialog">
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          {/* if there is a button in form, it will close the modal */}
          <div className="modal-action">
            <button
              className="btn btn-active btn-primary mx-3"
              onClick={handleVerify}
            >
              {isLoading ? (
                <span className="loading loading-bars loading-sm"></span>
              ) : (
                "Verify"
              )}
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Verify;
