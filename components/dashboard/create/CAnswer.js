import { useState, useEffect } from "react";
import Image from "next/image";

const CAnswer = (props) => {
  const [img, setImg] = useState(null);
  const [aForm, setAForm] = useState({
    id: "",
    answer: "",
  });
  useEffect(() => {
    props.getAData({
      aForm: { ...aForm, a_image: img },
    });
  }, [aForm, img]);
  const handleImgChange = (e) => {
    e.preventDefault();
    setImg(URL.createObjectURL(e.target.files[0]));
    console.log(img);
    return () => URL.revokeObjectURL(objectUrl);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, id } = e.target;
    // const newData = [...aForm];
    // newData[id - 1] = { ...newData[id - 1], [name]: value };
    // setAForm(newData);
    setAForm({ ...aForm, [name]: value, id: id - 1 });
    console.log(aForm);
  };
  return (
    <>
      <div className="card w-fit bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Answer #{props.num}</h2>
          <div className="flex gap-5 items-start flex-wrap">
            <div className="card card-compact w-fit bg-base-100 shadow-xl">
              <figure>
                {!img ? (
                  ""
                ) : (
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                    src={img}
                    alt="Shoes"
                    style={{
                      float: "left",
                      height: 200,
                      objectFit: "scale-down",
                    }}
                  />
                )}
              </figure>
              <div className="card-body">
                <div className="card-actions justify-center">
                  <input
                    type="file"
                    className="file-input file-input-ghost w-full max-w-xs file-input-primary"
                    onChange={handleImgChange}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Answer</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Answer#1 here"
                    name="answer"
                    id={props.num}
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CAnswer;
