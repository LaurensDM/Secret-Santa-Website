import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useGroups from "../../api/groups";
import useUserGroups from "../../api/usergroup";
import Error from "../Error";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function GroupJoin() {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const groupApi = useGroups();
  const userGroupApi = useUserGroups();
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null)
    try {
      const code = document.getElementById("code").value;
      const group = await groupApi.getByCode(code);
      const usergroup = await userGroupApi.getByUserAndGroupId(group.id);
      if (usergroup) {
        throw new ReferenceError("You're already in this group!");
      } else {
        userGroupApi.save({
          id: null,
          groupId: group.id,
          authorizationLevel: 2,
          userPulledId: null,
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
          title: "Succesfully joined the group!",
          customClass: "alert-font",
          grow: "row",
        });
        navigate("/account", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="text-center title">

      <h1 className="mb-5">{t("joinGroup")}</h1>
      <div className="w-50 mx-auto">
        <Error error={error} />
      </div>
      
      <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center gap-3">
        <label htmlFor="code">{t("inputCode")}</label>
        <input
          type="text"
          name="code"
          className="form-control w-25"
          id="code"
          placeholder="code"
        />
        
        <button type="submit" className="btn colorChange">
          {t("join")}
        </button>
      </form>
    </div>
  );
}
