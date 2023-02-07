import { useLocation, useParams } from "react-router";
import useUsers from "../../api/users";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PullName() {
  const { state } = useLocation();
  const [namePulled, setNamePulled] = useState("");
  const { getById } = useUsers();
  const userGroup = state ? state.userGroupUpdated : undefined;
  const code = useParams().code;

  useEffect(() => {
    async function fetchData() {
      if (userGroup) {
        const data = await getById(userGroup.userPulledId);
        setNamePulled(data);
      }
    }
    fetchData();
  }, [userGroup, getById]);

  return (
    <div className="pullNameContainer justify-content-center">
      <legend className="pullName text-center text-wrap">
        {state
          ? `Your secret santa is ${namePulled.userName}`
          : "This group has not yet pulled names"}
      </legend>
      <Link to={`/group/${code}/gift/${namePulled.id}`}>
        <button className="returnHome">View the gifts of this person</button>
      </Link>
    </div>
  );
}
