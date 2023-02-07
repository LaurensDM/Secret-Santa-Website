import useGroups from "../../api/groups";
import useUserGroups from "../../api/usergroup";
import Error from "../Error";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Person from "./Person";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import emailjs from "@emailjs/browser";

export default function Group() {
  const [components, setComponents] = useState([]);
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const { saveGroup } = useGroups();
  const { save } = useUserGroups();
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    setError(null);
  }, []);

  function addPerson() {
    setComponents([...components, " "]);
  }

  function removePerson() {
    const array = [...components];
    array.pop();
    setComponents(array);
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);

    const name = document.getElementById("name").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const newGroup = await saveGroup({ id: null, name, maxPrice });

    save({
      id: null,
      groupId: newGroup.id,
      authorizationLevel: 1,
      userPulledId: null,
    });

    try {
      if (components.length !== 0) {
        for (let index = 0; index < components.length; index++) {
          let id = index + " person";
          const user = document.getElementById(id).value;

          emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATEGROUP_ID,
            {
              group_name: newGroup.name,
              group_code: newGroup.code,
              email: user,
            },
            process.env.REACT_APP_API_KEY
          );
        }

        const form = document.getElementById("main-form");
        form.reset();
      }

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
        title: "Succesfully joined the group!",
        customClass: "alert-font",
        grow: "row",
      });

      navigate("/account", { replace: true });
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }

  return (
    <div className="title text-center">
      <h1>{t("createGroup")}</h1>
      <p>{t("groupText")}</p>
      <Error error={error} />
      <form
        onSubmit={submit}
        id="main-form"
        style={{ color: "black" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <div className="mt-5 ">
          <label htmlFor="name">Groupname</label>
          <input type="text" id="name" className="form-control" required />
        </div>
        <div className="mx-auto input-group gap-3 ">
          {components.map((element, index) => (
            <Person key={index} id={index} />
          ))}
        </div>
        <div className="text-center mt-5 d-flex gap-2">
          <button type="button" onClick={addPerson} className="btn btn-success">
            {t("addPerson")}
          </button>
          <button
            type="button"
            onClick={removePerson}
            className="btn btn-warning"
          >
            {t("removePerson")}
          </button>
        </div>
        <div className="mt-5">
          <label htmlFor="maxPrice">Gift Price</label>
          <input
            type="number"
            step={0.01}
            id="maxPrice"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="submit mt-5">
          {t("submitGroup")}
        </button>
      </form>
    </div>
  );
}
