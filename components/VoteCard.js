"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";
const VoteCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("../api/vote/list");
        console.log(response.data.res);
        setQuestions(response.data.res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        questions.map((q) => (
          <Link key={q.id} href={q.q_code}>
            <div className="card w-auto bg-base-100 shadow-xl">
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
                    {q.q_status == 1 ? "Public" : "Private"}
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
          </Link>
        ))
      )}
    </>
  );
};

export default VoteCard;
