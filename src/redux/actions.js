import { STORE_ACCESS_TOKEN } from "./actionTypes";

export const setAccessToken = (access_token) => ({
  type: STORE_ACCESS_TOKEN,
  payload: {
    token: access_token
  }
});
