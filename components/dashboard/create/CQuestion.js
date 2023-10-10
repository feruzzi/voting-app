"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const CQuestion = (props) => {
  const [img, setImg] = useState(null);
  const [isPrivate, setPrivate] = useState(false);
  const [qForm, setQForm] = useState({
    question: null,
    q_title: null,
    q_password: null,
    q_image: null,
    q_endAt: null,
  });
  const handleImgChange = (e) => {
    e.preventDefault();
    setImg(URL.createObjectURL(e.target.files[0]));
    return () => URL.revokeObjectURL(objectUrl);
    console.log(img);
  };
  const handleCheckPrivate = (e) => {
    if (e.target.checked) {
      setPrivate(true);
      setQForm({ ...qForm, q_password: null });
    } else {
      setPrivate(false);
    }
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
              <div className="grow flex gap-3 flex-wrap items-end">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Close Vote at</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="date"
                    name="q_endAt"
                    placeholder="Type Date here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
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
                    disabled={isPrivate}
                  />
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      onChange={handleCheckPrivate}
                    />
                    <span className="label-text ml-3">Private</span>
                  </label>
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
