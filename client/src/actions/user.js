import axios from 'axios';
import { setUser } from '../reducers/userReducer';
import { API_URL } from '../config';

export const registration = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/api/auth/registration`, { email, password });
		alert(response.data.message);
	} catch (err) {
		alert(err.response?.data.message || err);
	}
};

export const login = (email, password) => {
	return async dispatch => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
			localStorage.setItem('token', response.data.token);
			dispatch(setUser(response.data.user));
		} catch (err) {
			alert(err.response?.data.message || err);
		}
	};
};

export const auth = () => {
	return async dispatch => {
		try {
			const response = await axios.get(`${API_URL}/api/auth/auth`, {
				headers: { Authorization: `Bearer: ${localStorage.getItem('token')}` },
			});
			localStorage.setItem('token', response.data.token);
			dispatch(setUser(response.data.user));
		} catch (err) {
			alert(err.response?.data.message || err);
			localStorage.removeItem('token');
		}
	};
};

export const uploadAvatar = file => {
	return async dispatch => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post(`${API_URL}/api/files/avatar`, formData, {
				headers: { Authorization: `Bearer: ${localStorage.getItem('token')}` },
			});

			dispatch(setUser(response.data));
		} catch (err) {
			alert(err.response?.data.message || err);
		}
	};
};

export const deleteAvatar = () => {
	return async dispatch => {
		try {
			const response = await axios.delete(`${API_URL}/api/files/avatar`, {
				headers: { Authorization: `Bearer: ${localStorage.getItem('token')}` },
			});
			dispatch(setUser(response.data));
		} catch (err) {
			alert(err.response?.data.message || err);
		}
	};
};
