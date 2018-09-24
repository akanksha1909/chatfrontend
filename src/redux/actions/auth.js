import generateActionTypes from '../utils/generateActionTypes'
import { fetchJson, setToken, removeToken } from '../constants/Api'
import axios from 'axios'
import config from '../../config'
import { browserHistory } from 'react-router';
import _ from 'lodash'
import Moment from 'moment'

export const actionTypes = generateActionTypes(
    'LOCAL_SIGNUP_SUCCESS',
    'LOCAL_SIGNUP_FAILURE',
    'LOCAL_LOGIN_SUCCESS',
    'LOCAL_LOGIN_FAILURE'

)

function signupSuccess(response) {
    return { message: response.message, type: actionTypes.LOCAL_SIGNUP_SUCCESS }
}

function signupFailure(event, error) {
    return { event, error: error || 'Signup failed', type: actionTypes.LOCAL_SIGNUP_FAILURE }
}

function loginSuccess(response) {
    return { message: response.message, type: actionTypes.LOCAL_LOGIN_SUCCESS }
}

function loginFailure(event, error) {
    return { event, error: error || 'Login failed', type: actionTypes.LOCAL_LOGIN_FAILURE }
}
export function signup(user) {
    //redux-thunk
    return dispatch => {
        axios.post(config.api_url + '/user/signUp', {
            ...user
        }).then(function (resp) {
            if (resp.status === 200) {
                return dispatch(signupSuccess(resp.data));
            }
        }).catch(function (err, response) {
            if (err.response.status === 409) {
                return dispatch(signupFailure('signupfail', err.response.data.message));
            }
        });
    }
}
export function login(user) {
    //redux-thunk
    return dispatch => {
        axios.post(config.api_url + '/user/login', {
            ...user
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                return dispatch(loginSuccess(response.data));
            }

        }).catch(function (err, response) {
            if (err.response.status === 409 || err.response.status === 404 ) {
                return dispatch(loginFailure('loginfail', err.response.data.message));
            }
        });
    }
}


