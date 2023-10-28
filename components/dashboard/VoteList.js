"use client";
import { useState, useEffect } from "react";
import VoteCard from "@/components/dashboard/VoteCard";
import VoteTable from "@/components/dashboard/VoteTable";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/utils/Loader";
import axios from "axios";

const VoteList = () => {
  const [list, setList] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `../api/user/search?search=${search}&filter=${filter}`
        );
        setData(response.data.res);
        console.log(response.data.res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [search, filter]);
  const handleClick = async (e) => {
    e.preventDefault();
    setList(!list);
  };
  const handleSearch = (val) => {
    if (val) {
      setSearch(val);
    } else {
      setSearch("");
    }
  };
  const handleFilter = (val) => {
    if (val) {
      setFilter(val);
    } else {
      setFilter("");
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <label className="swap">
          <input type="checkbox" onClick={handleClick} />
          <p className="btn btn-sm btn-info btn-outline">
            {list ? "Card" : "table"}
          </p>
        </label>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      {isLoading ? (
        <Loader />
      ) : list ? (
        <VoteCard questions={data} />
      ) : (
        <VoteTable questions={data} />
      )}
    </>
  );
};

export default VoteList;
