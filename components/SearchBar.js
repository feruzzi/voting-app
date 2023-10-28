"use client";
import { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const [isLoading, setIsLoading] = useState(false);
  props.onSearch(search);
  props.onFilter(filter);
  const handleSearch = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearch(e.target.value);
      setIsLoading(false);
    }, 1500);
  };
  const handleFilter = (e) => {
    if (e.target.checked) {
      setFilter(e.target.value);
    } else {
      setFilter("");
    }
  };
  return (
    <>
      <div className="join">
        <div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
              onChange={handleSearch}
            />
            <div className="form-control">
              <label className="flex align-middle my-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  value="0"
                  onChange={handleFilter}
                />
                <span className="label-text ml-3">On Going</span>
              </label>
            </div>
          </div>
        </div>
        <div className="indicator">
          {isLoading ? (
            <span className="indicator-item loading loading-ball loading-md text-info"></span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
