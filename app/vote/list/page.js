import VoteCard from "@/components/VoteCard";
import axios from "axios";

const page = () => {
  return (
    <div className="mx-5">
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <select className="select select-bordered join-item">
          <option disabled selected>
            Filter
          </option>
          <option>Code</option>
          <option>Creator</option>
        </select>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">new</span>
          <button className="btn join-item">Search</button>
        </div>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-3 my-3">
        <VoteCard />
      </div>
    </div>
  );
};

export default page;
