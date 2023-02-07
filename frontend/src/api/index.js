// import axiosRoot from "axios";


// export const axios = axiosRoot.create({
// 	baseURL: process.env.REACT_APP_URL || config.base_url,
// 	headers: {
// 		// Make sure an existing token is set before the first request is executed
// 		Authorization: `Bearer ${localStorage.getItem(config.token_key)}`,
// 	},
// });

// export const setAuthToken = (token) => {
// 	if (token) {
// 		axios.defaults.headers["Authorization"] = `Bearer ${token}`;
// 	} else {
// 		delete axios.defaults.headers["Authorization"];
// 	}
// };