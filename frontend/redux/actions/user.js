import axios from "axios";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoaduserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data,
      message,
    });
  }
};
