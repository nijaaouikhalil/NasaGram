import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  LIKE_UPDATE_REQUEST,
  LIKE_UPDATE_SUCCESS,
  LIKE_UPDATE_FAIL,
  LIKE_UPDATE_RESET,
} from "../constants/PostConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, ...state };

    case POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
      };

    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };

    //Like

    case LIKE_UPDATE_REQUEST:
      return { ...state, loadingLike: true };

    case LIKE_UPDATE_SUCCESS:
      return {
        ...state,
        loadingLike: false,
        posts: state.posts.map((post) => {
          if (post.title === action.payload.title) {
            //it's already liked Here since there is no login I assume it's only one user so either like it or remove your like
            if (post.likes && post.likes > 0) {
              post.likes = 0;
            } else {
              post.likes = 1;
            }
            return post;
          }
          return post;
        }),
        favorites: state.posts.filter((post) => post.likes && post.likes > 0),
        successLike: true,
      };

    case LIKE_UPDATE_FAIL:
      return { ...state, loadingLike: false, errorLike: action.payload };

    case LIKE_UPDATE_RESET:
      return { posts: [...state.posts, []] };

    default:
      return state;
  }
};
