import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';

const baseUrl = `${process.env.REACT_APP_URL}api/groups`;

const useGroups = () => {
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

  const getByCode = useCallback(async (code) => {
    const token = await getAccessTokenSilently();
    const {
      data
    } = await axios.get(`${baseUrl}/code/${code}`, {
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

  const saveGroup = useCallback(async (group) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = group;

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

  const groupApi = useMemo(() => ({
    getAll,
    getById,
    getByCode,
    deleteById,
    saveGroup,
  }), [getAll, getById, getByCode, deleteById, saveGroup])

  return groupApi;
}

export default useGroups;