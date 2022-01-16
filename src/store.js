import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { postListReducer } from "./reducers/PostReducers";

const reducer = combineReducers({ postsList: postListReducer });

const LikedPostsFromStorage = localStorage.getItem("LikedPosts")
  ? JSON.parse(localStorage.getItem("LikedPosts"))
  : [];

const initialState = {
  postsList: {
    posts: LikedPostsFromStorage,
    favorites: LikedPostsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
