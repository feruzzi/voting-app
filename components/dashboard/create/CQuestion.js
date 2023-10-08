"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const CQuestion = (props) => {
  const [img, setImg] = useState(null);
  const [qForm, setQForm] = useState({
    question: null,
    q_title: null,
    q_password: null,
    q_image: null,
  });
  const handleImgChange = (e) => {
    e.preventDefault();
    setImg(URL.createObjectURL(e.target.files[0]));
    return () => URL.revokeObjectURL(objectUrl);
    console.log(img);
  };
  useEffect(() => {
    props.getQData({
      qForm: { ...qForm, q_image: img },
    });
  }, [img, qForm]);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setQForm({ ...qForm, [name]: value });
    console.log(qForm);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="card w-fit bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Create Question</h2>
            <div className="flex gap-5 items-start flex-wrap">
              <div>
                <figure>
                  {!img ? (
                    <h3>Thumbnail here</h3>
                  ) : (
                    <Image width={200} height={200} src={img} alt="Shoes" />
                  )}
                </figure>
                <input
                  type="file"
                  className="file-input file-input-ghost w-full max-w-xs file-input-primary"
                  onChange={handleImgChange}
                />
              </div>
              <div className="grow flex gap-3 flex-wrap">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="q_title"
                    placeholder="Type Title here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="q_password"
                    placeholder="Type Password here"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="w-full max-w-sx">
                  <label htmlFor="">Question</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="What are you will ask ?"
                    name="question"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CQuestion;
