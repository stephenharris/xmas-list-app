import { STORE_ACCESS_TOKEN } from "../actionTypes";

const initialState = {
  access_token: localStorage.getItem('accessToken')//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaXN0IjoiNjdhZTAxNmEtMTMyOS00ZmY5LTg4ZTQtYTZiMmE5NDAzZWUzIiwiaWF0IjoxNTc1NDkxMzY0LCJleHAiOjE1Nzc1NjQ5NjR9.sggXRf4x67VLOezpDTrXrf1X6IymIMIbFsbp8lgv7qw'
};

//http://localhost:3000/list/9bd8960a-6b7d-4ec5-b38f-1c0c7f47f6fd

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
