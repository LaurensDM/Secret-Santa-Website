// import { useLocation, useNavigate } from "react-router";
import img from "../../logo.svg";
import useGifts from "../../api/gifts";
import Error from "../Error";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function CreateGiftCard({ show, handleClose, gift, group }) {
  const [error, setError] = useState(null);
  const { save } = useGifts();
  // const gift = state;
  // const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    setError(null);
  }, [show]);

  async function handleSubmit(e) {
    e.preventDefault();
    const image = document.getElementById("formFile");
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const link = document.getElementById("link");
    const formData = new FormData();
    formData.append("image", image.files[0]);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("link", link.value);
    try {
      await save({
        id: gift ? gift.id : undefined,
        image: formData.get("image")
          ? formData.get("image")
          : gift
          ? gift.image
          : null,
        description: formData.get("description"),
        price: formData.get("price"),
        link: formData.get("link"),
        groupId: group.id
      });
      mySwal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        icon: "success",
        title: "Succesfully Saved the gift!",
        customClass: "alert-font",
        grow: "row",
      });
      handleClose(true);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <Modal
      contentClassName="modalBg"
      show={show}
      onHide={() => handleClose(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Gift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Error error={error} />
        <form
          onSubmit={handleSubmit}
          id="giftForm"
          encType="multipart/form-data"
          className="container"
        >
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              name="image"
              type="file"
              id="formFile"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              defaultValue={gift ? gift.description : ""}
            ></textarea>
          </div>
          <label htmlFor="price">Price</label>
          <div className="input-group mb-3 d-flex flex-row">
            <span className="input-group-text">€</span>
            <input
              type="number"
              step="0.01"
              min="0"
              max={group.maxPrice}
              className="form-control"
              id="price"
              aria-label="Amount (in euro)"
              defaultValue={gift ? gift.price : ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Link
            </label>
            <input
              type="text"
              id="link"
              className="form-control"
              defaultValue={gift ? gift.link : ""}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-warning ms-2"
            onClick={() => handleClose(false)}
          >
            Cancel
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default function GiftCard({ gift, onAdjust, onDelete, auth }) {
  const baseUrl = process.env.REACT_APP_URL;

  return (
    <>
      <div
        className="card mt-2 mb-2"
        style={{
          maxWidth: "700px",
          backgroundColor: "rgb(255,0,0,0.6)",
          borderRadius: "10px",
        }}
      >
        <div className="row p-3">
          <div className="col">
            <img
              style={{ borderRadius: "10px"}}
              src={gift.image ? `${baseUrl}${gift.image}` : img}
              className="img-fluid w-100 h-100"
              alt="gift"
            />
          </div>
          <div className="col-sm ">
            <div className="card-body text-center w-100" >
              <textarea
                className="card-title w-100 text-break text-wrap form-control"
                placeholder="Leave a description here"
                defaultValue={gift.description}
                disabled
              ></textarea>
              <div className="input-group d-flex flex-row">
              <span className="input-group-text bg-secondary border-secondary">€</span>
              <input
                type="number"
                className="card-text form-control text-center"
                placeholder="Price"
                style={{ color: "black" }}
                defaultValue={gift.price}
                step={0.01}
                disabled
              />
              </div>
              <small className="text-muted w-100 mt-2 form-control">
                <a

                  href={gift.link}
                  target={"_blank"}
                  rel="noreferrer"
                  className="card-text text-break text-wrap"
                >
                  {gift.link}
                </a>
              </small>
              {auth ? <div className="card-footer d-flex">
                <button
                  className="btn btn-success mx-auto"
                  onClick={() => onAdjust(gift)}
                >
                  Adjust
                </button>
                <button className="btn btn-danger mx-auto" onClick={onDelete}>
                  Delete
                </button>
              </div> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
