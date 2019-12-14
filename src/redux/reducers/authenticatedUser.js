import { STORE_ACCESS_TOKEN } from "../actionTypes";

const initialState = {
  access_token: localStorage.getItem('accessToken')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STORE_ACCESS_TOKEN: {
        console.log(STORE_ACCESS_TOKEN, action, state);
      const { token } = action.payload;

      console.log(action.payload);
      console.log(token);
      localStorage.setItem('accessToken', token ? token : '');
      return {
        ...state,
        access_token: token
      };
    }
    default:
      return state;
  }
}
