import { actionTypes } from '../actions/auth'
const { LOCAL_LOGIN_SUCCESS, LOCAL_LOGIN_FAILURE,LOCAL_SIGNUP_SUCCESS,LOCAL_SIGNUP_FAILURE,
    PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE, REMIND_ME_SUCCESS,SOCIAL_SYNC, RECENT_LOGINS_DATA, CLEAR_MESSAGE,
    EMAIL_VERIFIED, EMAIL_VERIFY_ERROR, RESEND_VERIFICATION, RESEND_VERIFICATION_ERROR, CLEAR_RESEND_MESSAGE, 
    TOOGLE_FREE_NOW_POPUP,
    AUTHORIZED, NOT_AUTHORIZED,USER_VERFIY_SUCCESS,USER_VERFIY_FAILED,USER_RESET_SUCCESS,USER_RESET_FAILED,
    LOGOUT } = actionTypes;

const initialState = {
    signup : {
        error : "",
        success : "",
        redirect : false
    },
    signin : {
        error : "",
        success : "",
        redirect : false
    },
    authorized : "",
}

export default function auth(state = initialState, action) {
    console.log(action.type);
    switch(action.type) {
        case LOCAL_SIGNUP_SUCCESS:
            return { ...state, type: 'signup', signup : { message : action.message, success : action.message, redirect : true } }
        case LOCAL_SIGNUP_FAILURE:
            return { ...state, type: action.event, signup : { error: action.error, message : "", success : "", redirect : false } }
        case LOCAL_LOGIN_SUCCESS:
            return { ...state,  signin : { message : action.message, success : action.message, redirect : true } }
        case LOCAL_LOGIN_FAILURE:
            return { ...state, signin: { error: action.error, message : "", success : "", redirect : false } }
        default:
            return state
    }
}