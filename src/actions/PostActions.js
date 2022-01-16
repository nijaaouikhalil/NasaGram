import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  LIKE_UPDATE_REQUEST,
  LIKE_UPDATE_SUCCESS,
  LIKE_UPDATE_FAIL,
} from "../constants/PostConstants";
import axios from "axios";
import { NASA_KEY } from "../Secret/ApiKeys";
export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&count=9`
    );

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const LikePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_UPDATE_REQUEST });

    dispatch({
      type: LIKE_UPDATE_SUCCESS,
      payload: post,
    });
    //saving only the liked posts for future visits
    let favoriteTosave = getState().postsList.posts.filter(
      (post) => post.likes && post.likes > 0
    );
    localStorage.setItem("LikedPosts", JSON.stringify(favoriteTosave));
  } catch (error) {
    dispatch({
      type: LIKE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
