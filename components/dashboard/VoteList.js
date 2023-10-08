"use client";
import { useState } from "react";
import VoteCard from "@/components/dashboard/VoteCard";
import VoteTable from "@/components/dashboard/VoteTable";
const VoteList = () => {
  const [list, setList] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setList(!list);
  };
  return (
    <>
      <div>
        <label className="swap">
          <input type="checkbox" onClick={handleClick} />
          <p className="btn btn-sm btn-info btn-outline">
            {list ? "Card" : "table"}
          </p>
        </label>
      </div>
      {list ? <VoteCard /> : <VoteTable />}
    </>
  );
};

export default VoteList;
