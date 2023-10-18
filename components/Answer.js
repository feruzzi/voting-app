import Image from "next/image";
import axios from "axios";

const Answer = (props) => {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const answer = e.currentTarget.id;
      const response = await axios.post(`../api/vote`, {
        q_id: props.q_id,
        answer: answer,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(answer);
  };
  return (
    <div
      className="card w-auto bg-base-100 shadow-xl cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-neutral-focus duration-300"
      id={props.answers.id}
      onClick={handleClick}
    >
      <figure>
        <Image
          src={
            props.answers.a_image ? props.answers.a_image : "/default-thumb.jpg"
          }
          width={500}
          height={500}
          alt="Title"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.answers.answer}</h2>
      </div>
    </div>
  );
};

export default Answer;
