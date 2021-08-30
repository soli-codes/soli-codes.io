import axios from 'axios';
import { set } from 'mongoose';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
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

            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

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
            const res = await axios.delete('api/profile');
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
