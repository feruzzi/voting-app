import Image from "next/image";
import VoteList from "@/components/dashboard/VoteList";
import Link from "next/link";
const Dashboard = () => {
  return (
    <div className="bg-base-100">
      <div className="mx-5">
        <Link className="btn btn-primary my-3" href="dashboard/create">
          Create New Vote
        </Link>
        <VoteList />
      </div>
    </div>
  );
};

export default Dashboard;
