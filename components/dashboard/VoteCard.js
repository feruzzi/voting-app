import Image from "next/image";

const VoteCard = (props) => {
  return (
    <>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-3 my-3">
        {props.questions.map((q, i) => (
          <div key={i} className="card w-auto bg-base-100 shadow-xl">
            <figure>
              <Image
                src={q.q_image ? q.q_image : "/default-thumb.jpg"}
                width={500}
                height={500}
                alt={q.q_title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {q.q_title}
                <div className="badge badge-secondary">
                  {q.q_status == 1 ? "Private" : "Public"}
                </div>
              </h2>
              <p>{q.question}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {q.q_endAt.substring(0, 10)}
                </div>
                <div className="badge badge-outline">{q.authorId}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VoteCard;
