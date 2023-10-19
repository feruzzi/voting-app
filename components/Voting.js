"use client";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Loader from "@/components/utils/Loader";
import Verify from "@/components/modal/Verify";
import axios from "axios";
import { useEffect, useState } from "react";

const Voting = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`../api/vote/detail/${props.code}`);
        console.log(response.data.res);
        if (response.data.res.q_status == "1" && isVerify == false) {
          setIsPrivate(true);
          document.getElementById("verify-modal").showModal();
          setData(response.data.res);
        } else if (response.data.res.q_status == "2" || isVerify == true) {
          setIsPrivate(false);
          document.getElementById("verify-modal").close();
          setData(response.data.res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [isVerify]);
  const handleVerify = (val) => {
    setIsVerify(val);
    console.log(isVerify);
  };
  return (
    <>
      <Verify verify={handleVerify} code={props.code} />
      {isPrivate ? (
        ""
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <Question questions={data} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-5">
            {data.Answer.map((answer, i) => (
              <Answer key={i} answers={answer} q_id={data.id} />
            ))}
          </div>
        </>
      )}
      {}
    </>
  );
};

export default Voting;
