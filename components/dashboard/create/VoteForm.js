"use client";
import CAnswer from "@/components/dashboard/create/CAnswer";
import CQuestion from "@/components/dashboard/create/CQuestion";
import Link from "next/link";
import { useState } from "react";
const VoteForm = () => {
  const [addAnswer, setAddAnswer] = useState(2);
  const [qData, setQData] = useState([]);
  const [aData, setAData] = useState([]);
  const handleAddAnswer = (e) => {
    e.preventDefault();
    setAddAnswer((prev) => prev + 1);
  };
  const ListAnswer = (val) => {
    const arr = [];
    for (let index = 0; index < val; index++) {
      arr.push(<CAnswer key={index} num={index + 1} getAData={handleAData} />);
    }
    return arr;
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log({ qData });
    console.log({ aData });
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
      <form method="POST">
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
          <button className="btn btn-secondary" onClick={handleAddAnswer}>
            Add Answer
          </button>
        </div>
        <div className="flex justify-center items-center w-full">
          <button onClick={handleClick} className="btn btn-primary my-3 w-6/12">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default VoteForm;
