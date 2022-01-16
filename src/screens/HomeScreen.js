import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import posts from "../posts";
import { Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PostCarousel from "../components/PostCarousel";
import Skeleton from "../components/Skeleton";
import { listPosts } from "../actions/PostActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const postsList = useSelector((state) => state.postsList);
  const { error, loading, posts } = postsList;

  const loadMore = useRef(null);

  //Infinite Scroll : Load more on scroll down :
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loadMore.current) {
      observer.observe(loadMore.current);
    }
  }, []);

  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch, page]);

  return (
    <div>
      {<PostCarousel></PostCarousel>}
      <h1> Astronomy Picture of the Day</h1>
      {loading ? (
        <div>
          <Loader />
          <div className="container mx-auto">
            <Row className="row-eq-height">
              {[1, 2, 3, 4, 5].map((index) => (
                <Col
                  key={index}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="Col_profile"
                >
                  <Skeleton />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container mx-auto">
          <Row className="row-eq-height">
            {posts.map((post, index) => (
              <Col
                key={index}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="Col_profile"
              >
                <Post post={post}></Post>
              </Col>
            ))}
          </Row>

          <div className="loading" ref={loadMore}>
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
