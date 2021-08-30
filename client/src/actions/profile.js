import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
} from './types';

// Get user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'get',
            url: `/api/profile/user/${userId}`,
        });

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or update profile
export const createProfile =
    (formData, history, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post('api/profile', formData, config);

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });

            if (!edit) {
                history.push('/dashboard');
            }
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
            }

            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This cannot be undone.')) {
        try {
            await axios.delete('api/profile');
            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
