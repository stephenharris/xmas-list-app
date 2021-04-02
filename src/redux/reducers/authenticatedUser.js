import { STORE_ACCESS_TOKEN } from "../actionTypes";

const initialState = {
  access_token: sessionStorage.getItem('accessToken')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STORE_ACCESS_TOKEN: {
      const { token } = action.payload;

      sessionStorage.setItem('accessToken', token ? token : '');
      return {
        ...state,
        access_token: token
      };
    }
    default:
      return state;
  }
}
