import { Link, useNavigate } from "react-router-dom";
import GroupItem from "./GroupItem";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGroup from "../../api/groups";
import useUserGroup from "../../api/usergroup";
import Error from "../Error";
import Loader from "../Loader";
import { useAuth0 } from "@auth0/auth0-react";

export default function Account() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const userGroupApi = useUserGroup();
  const groupApi = useGroup();
  const navigate = useNavigate();
  const { user } = useAuth0();

  function routeChange(group) {
    const path = `/group/${group.code}/details`;
    navigate(path);
  }

  async function deleteGroup(index) {
    const helpArray = groups;
    const groupToDelete = groups[index];
    userGroupApi.deleteById(groupToDelete.id);
    const allMembers = await userGroupApi.getByGroupId(groupToDelete.groupId);
    if (!allMembers || allMembers.length === 0) {
      groupApi.deleteById(groupToDelete.groupId);
    }
    helpArray.splice(index, 1);
    setGroups([...helpArray]);
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userGroupApi.getByUserId();
        setGroups(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [userGroupApi]);
  return (
    <>
      <h1 className="text-center title mb-5">Account</h1>
      <div className="account p-3">
        <div className="account-info mb-5">
          <span>{t('username')}: {user.name}</span>
          <br />
          <span>Email: {user.email}</span>
        </div>
        <div className="groupList">
          <div className="list-group">
            <Loader loading={loading} />
            <Error error={error} />
            {groups.map((group, index) => (
              <GroupItem
                name={group.groupName}
                key={group.groupId}
                onClickGroup={() => routeChange(group)}
                onClickClose={() => deleteGroup(index)}
              />
            ))}
          </div>
          <div className="d-flex gap-2">
            <Link to="/group" data-cy='group_create'>
              <button className="btn btn-secondary">{t("createGroup")}</button>
            </Link>
            <Link to="/groupjoin">
              <button className="btn btn-secondary">{t("joinGroup")}</button>
            </Link>
          </div>
        </div>
        {/* <div className="ms-auto mt-5">
          <Link to={`/gift/0`}>
            <button className="btn btn-primary ms-auto">{t("setgift")}</button>
          </Link>
        </div> */}
      </div>
    </>
  );
}
