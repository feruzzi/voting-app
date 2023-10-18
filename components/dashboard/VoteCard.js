const VoteCard = () => {
  return (
    <>
      <div className="card w-auto bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Shoes!
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">23-10-2023</div>
            <div className="badge badge-outline">Creators</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteCard;
