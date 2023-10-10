"use client";
import CAnswer from "@/components/dashboard/create/CAnswer";
import CQuestion from "@/components/dashboard/create/CQuestion";
import Alert from "@/components/modal/Alert";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const VoteForm = () => {
  const router = useRouter();
  const [addAnswer, setAddAnswer] = useState(2);
  const [qData, setQData] = useState([]);
  const [aData, setAData] = useState([]);
  const [alert, setAlert] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleAddAnswer = (e) => {
    e.preventDefault();
    const max = 5;
    if (addAnswer >= max) {
      setAlert(`Maximum Answer is ${max}`);
      document.getElementById("alert").showModal();
    } else {
      setAddAnswer((prev) => prev + 1);
    }
  };
  const handleRemoveAnswer = (e) => {
    e.preventDefault();
    const min = 2;
    if (addAnswer <= min) {
      setAlert(`Minimum Answer is ${min}`);
      document.getElementById("alert").showModal();
    } else {
      setAddAnswer((prev) => prev - 1);
    }
  };
  const ListAnswer = (val) => {
    const arr = [];
    for (let index = 0; index < val; index++) {
      let cname = `answer[${index}]`;
      arr.push(
        <CAnswer
          key={index}
          num={index + 1}
          getAData={handleAData}
          cname={cname}
        />
      );
    }
    return arr;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(qData);
      const response = await axios.post("../api/vote/create", {
        question: qData,
        answer: aData,
      });
      setIsLoading(false);
      console.log({ response });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleQData = (val) => {
    setQData(val);
  };
  const handleAData = (val) => {
    const newData = [...aData];
    newData[val.aForm.id] = { ...newData[val.aForm.id], val };
    setAData(newData);
    // setAData(val);
  };
  return (
    <>
      <Alert message={alert} />
      <div className="mx-6">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/dashboard">Home</Link>
            </li>
            <li>Create New Vote</li>
          </ul>
        </div>
      </div>
      <CQuestion getQData={handleQData} />
      <div className="flex justify-start m-6"></div>
      <div className="flex justify-start items-center my-6 flex-wrap gap-3">
        {ListAnswer(addAnswer)}
        <div className="flex flex-col gap-3">
          <button className="btn btn-secondary" onClick={handleAddAnswer}>
            Add Answer
          </button>
          <button className="btn btn-error" onClick={handleRemoveAnswer}>
            Remove Answer
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleSubmit}
          className="btn btn-primary my-3 w-6/12"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-bars loading-md"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </>
  );
};

export default VoteForm;
