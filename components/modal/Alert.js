const Alert = (props) => {
  return (
    <dialog id="alert" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Notification</h3>
        <p className="py-4">{props.message}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Alert;
