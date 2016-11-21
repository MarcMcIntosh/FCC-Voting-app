'use strict';

export const SET_COOKIE_CONSENT = 'SET_COOKIE_CONSENT';
export function setCookieConsent(payload) {
  return {
    type: SET_COOKIE_CONSENT,
    payload,
  };
}

export const GET_COOKIE_CONSENT = 'GET_COOKIE_CONSENT';
export default function () {
  return (dispatch) => {
    dispatch({ type: GET_COOKIE_CONSENT });
    return dispatch(setCookieConsent({
      cookieConsent: true,
    }));
  };
}
