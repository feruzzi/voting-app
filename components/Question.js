import Image from "next/image";
const Question = (props) => {
  return (
    <div className="card w-auto bg-base-100 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Image
            src={
              props.questions.q_image
                ? props.questions.q_image
                : "/default-thumb.jpg"
            }
            width={500}
            height={500}
            alt="oke"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 p-3">
          <h1>{props.questions.q_title}</h1>
          <p>{props.questions.question}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;
