import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';


const baseUrl = `${process.env.REACT_APP_URL}api/gifts`


const useGifts = () => {
  const {
    getAccessTokenSilently,
  } = useAuth0();
 

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  const getAllOfUserByGroup = useCallback(async (groupId, userId) => {
    const token = await getAccessTokenSilently();
    
    const {
      data
    } = await axios.get(`${baseUrl}/group/${groupId}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessTokenSilently]);

  const getById = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessTokenSilently]);

  const deleteById = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(
      `${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [getAccessTokenSilently]);

  const save = useCallback(async (gift) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = gift;

    const {
      data
    } = await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ? id : ''}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: values,
    });

    return data;
  }, [getAccessTokenSilently]);

  const giftApi = useMemo(() => ({
    getAll,
    getAllOfUserByGroup,
    getById,
    save,
    deleteById,
  }), [getAll, save, getAllOfUserByGroup, getById, deleteById])

  return giftApi;
}

export default useGifts;