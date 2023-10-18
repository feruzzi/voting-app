import Voting from "@/components/Voting";
const voting = ({ params }) => {
  return (
    <div className="mx-5">
      <Voting code={params.code} />
    </div>
  );
};

export default voting;
