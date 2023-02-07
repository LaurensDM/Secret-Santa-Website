import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';

const baseUrl = `${process.env.REACT_APP_URL}api/userGroups`

const useUserGroups = () => {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently])

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

  const getByUserId = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(`${baseUrl}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data;
  }, [getAccessTokenSilently])

  const getByGroupId = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(`${baseUrl}/group/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessTokenSilently])

  const getByUserAndGroupId = useCallback(async (groupId) => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(`${baseUrl}/user/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data[0];
  }, [getAccessTokenSilently])

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

  const save = useCallback(async (userGroup) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = userGroup;
    const {
      data
    } = await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ? id : ''}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });
    return data;
  }, [getAccessTokenSilently]);

  const userGroupApi = useMemo(() => ({
    getAll,
    getById,
    getByGroupId,
    getByUserId,
    getByUserAndGroupId,
    deleteById,
    save,
  }), [getAll, getById, getByGroupId, getByUserId, getByUserAndGroupId, deleteById, save, ])
  return userGroupApi;
}

export default useUserGroups;