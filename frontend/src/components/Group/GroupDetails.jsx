import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useGroups from "../../api/groups";
import useUserGroups from "../../api/usergroup";
import Error from "../Error";
import Loader from "../Loader";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function GroupDetails() {
  const { code } = useParams();
  const [group, setGroup] = useState({});
  const [userGroups, setUserGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const groupApi = useGroups();
  const userGroupApi = useUserGroups();
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const groupData = await groupApi.getByCode(code);
        const usergroup = await userGroupApi.getByUserAndGroupId(groupData.id);
        const data = await userGroupApi.getByGroupId(groupData.id);

        setGroup(groupData);
        setAuth(usergroup.authorizationLevel === 1 ? true : false);
        setUserGroups([...data]);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [code, groupApi, userGroupApi]);

  async function kickUser(index) {
    const deleteUserGroup = await userGroupApi.deleteById(userGroups[index].id);
    const helpArray = userGroups;
    helpArray.splice(index, 1);
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
      icon: "info",
      title: `${deleteUserGroup.userName} has been removed!`,
      customClass: "alert-font",
      grow: "row",
    });

    if (!helpArray || helpArray.length === 0) {
      groupApi.deleteById(group.id);
      navigate("/account", { replace: true });
    }
    setUserGroups([...helpArray]);
  }

  function goToDetails(user) {
    navigate(`/group/${group.code}/gift/${user.userId}`);
  }

  async function viewPulledName() {
    const userGroupUpdated = await userGroupApi.getByUserAndGroupId(group.id);
    navigate(`/group/${group.code}/pullname`, {
      state: { userGroupUpdated },
      replace: true,
    });
  }

  function shuffleIndex(length) {
    return Math.floor(Math.random() * (length - 1)) + 1;
  }

  async function secretSanta() {
    const length = userGroups.length;
    const shiftIndex = shuffleIndex(length);
    for (let index = 0; index < length; index++) {
      const userGroup = userGroups[index];

      let namePulledIndex = (index + shiftIndex) % length;

      await userGroupApi.save({
        id: userGroup.id,
        authorizationLevel: userGroup.authorizationLevel,
        userPulledId: userGroups[namePulledIndex].userId,
      });
      emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          to_name: userGroup.userName,
          secretsanta_user: userGroups[namePulledIndex].userName,
          gift_url: `https://frontendweb-secretsanta.onrender.com/group/${group.code}/gift/${userGroups[namePulledIndex].userId}`,
          email: userGroup.email,
        },
        process.env.REACT_APP_API_KEY
      );
    }

    await groupApi.saveGroup({
      id: group.id,
      name: group.name,
      maxPrice: group.maxPrice,
      namesDrawn: true,
    });

    viewPulledName();
  }

  return (
    <div>
      <div className="title text-center">
        <h1>{group.name}</h1>
        <h2>Group Code: {group.code}</h2>
      </div>
      <h3 className="text-center">
        <p style={{ fontWeight: "bold" }}>Gift price: €{group.maxPrice}</p>
      </h3>
      <div className="d-flex mx-auto justify-content-center">
        <div className="">
          <Loader loading={loading} />
          <Error error={error} />
          {userGroups.map((user, index) => (
            <div className="d-flex flex-row btn-group mt-3" key={user.id}>
              <button
                className="btn btn-default colorChange w-100"
                onClick={() => goToDetails(user)}
              >
                {user.email}
              </button>
              {auth ? (
                <button
                  className="btn btn-danger "
                  onClick={() => kickUser(index)}
                >
                  X
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        {group.namesDrawn ? (
          <button
            className="btn btn-default colorChange text-center"
            onClick={viewPulledName}
          >
            View pulled name
          </button>
        ) : auth ? (
          <button
            className="btn btn-default colorChange text-center"
            onClick={secretSanta}
          >
            Draw Names
          </button>
        ) : null}
      </div>
    </div>
  );
}
