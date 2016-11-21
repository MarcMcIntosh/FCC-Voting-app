'use strict';

import {
  GET_COOKIE_CONSENT,
  SET_COOKIE_CONSENT,
} from '../actions/GetCookieConsent';

export default function (state, action) {
  switch (action.type) {
    case GET_COOKIE_CONSENT: return state;
    case SET_COOKIE_CONSENT: return {
      ...state,
      ...action.cookieConsent,
    };
    default: return state;
  }
}
