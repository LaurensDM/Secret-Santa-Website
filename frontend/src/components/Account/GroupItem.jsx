export default function GroupItem({ name, onClickGroup,onClickClose }) {
  return (
    <>
      <div className="container-fluid row mb-2" role="group">
          <button className="groupBtn col-6 colorChange" onClick={onClickGroup}>{name}</button>
        <button
          className="closeBtn col-xs-1 btn-close"
          aria-label="Close"
          onClick={onClickClose}
        ></button>
      </div>
    </>
  );
}
