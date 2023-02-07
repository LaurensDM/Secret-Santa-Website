import { useCallback, useEffect, useState } from "react";
import GiftCard, { CreateGiftCard } from "./GiftCard";
import useGifts from "../../api/gifts";
import useGroups from "../../api/groups";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useUsers from "../../api/users";
import Error from "../Error";
import Loader from "../Loader";

function GiftList({ gifts, handleAdjust, onDelete, auth }) {
  if (gifts.length === 0) {
    return (
      <div className="alert alert-info">
        There are no gift suggestions to show!
      </div>
    );
  }

  return (
    <>
      {gifts.map((gift, index) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          onAdjust={handleAdjust}
          onDelete={() => onDelete(gift.id, index)}
          auth={auth}
        />
      ))}
    </>
  );
}

export default function GiftIdeas() {
  const [gifts, setGifts] = useState([]);
  const [user, setUser] = useState("");
  const [group, setGroup] = useState({id: null, maxPrice: 0});
  const [auth, setAuth] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState({});
  const giftApi = useGifts();
  const userApi = useUsers();
  const groupApi = useGroups();
  const { t } = useTranslation();
  const params = useParams();
  // const navigate = useNavigate();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await userApi.getById(0);
      const newGroup = await groupApi.getByCode(params.code);
      const data = await giftApi.getAllOfUserByGroup(newGroup.id,params.userId);

      setAuth(Number(params.userId) === currentUser.id ? true : false);
      setGroup(newGroup);
      setUser(await userApi.getById(params.userId));
      setGifts(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [params,giftApi, userApi, groupApi]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function handleAdjust(gift) {
    setSelectedGift(gift);
    setShowModal(true);
  }

  function handleCreate() {
    setSelectedGift(undefined);
    setShowModal(true);
  }
  function handleDelete(id, index) {
    const helpArray = [...gifts];
    helpArray.splice(index, 1);
    setGifts(helpArray);
    giftApi.deleteById(id);
  }

  function handleClose(bool) {
    setShowModal(false);
    if (bool) {
      refresh();
    }
  }

  return (
    <>
      <h1 className="text-center title">{`${t("giftIdea")} ${
        user ? user.userName : "userName"
      } `}</h1>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? (
          <GiftList
            gifts={gifts}
            handleAdjust={handleAdjust}
            onDelete={handleDelete}
            auth={auth}
          />
        ) : null}
        <CreateGiftCard
          show={showModal}
          handleClose={handleClose}
          gift={selectedGift}
          group={group}
        />
        { auth ? <button className="btn btn-default colorChange" onClick={handleCreate}>
          {t("createGift")}
        </button> : null}
      </div>
    </>
  );
}
