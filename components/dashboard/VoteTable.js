const VoteTable = (props) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Code</th>
              <th>Title</th>
              <th>End Vote</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {props.questions.map((q, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{q.q_code}</td>
                <td>{q.q_title}</td>
                <td>{q.q_endAt.substring(0, 10)}</td>
                <td>{q.q_status == 0 ? "Ended" : "OnGoing"}</td>
                <td>Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VoteTable;
