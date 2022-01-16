import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { LikePost } from "../actions/PostActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function PostDetail() {
  const { title } = useParams();
  const dispatch = useDispatch();

  const postsList = useSelector((state) => state.postsList);
  const { error, loading, posts } = postsList;
  //using the title as unique id
  const post = posts.find((x) => x.title === title);
  const LikePosttHandler = (e) => {
    e.preventDefault();
    dispatch(LikePost(post));
  };
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {post ? (
            <Row className="my-3 p-3 rounded text-center">
              <Col md={6}>
                {post.media_type === "image" ? (
                  <Image
                    alt={post.title}
                    src={post.hdurl ? post.hdurl : post.url}
                    className="zoom"
                    fluid
                  />
                ) : post.media_type === "video" ? (
                  <iframe
                    height={"100%"}
                    width={"100%"}
                    src={post.url}
                    title={post.title}
                  ></iframe>
                ) : (
                  <LazyLoadImage
                    alt={post.title}
                    effect="blur"
                    src={"notsupported.png"}
                    className="zoom fluid"
                  />
                )}
              </Col>

              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{post.title}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {post.explanation}
                  </ListGroup.Item>
                </ListGroup>

                <Button
                  className="my-3 p-3 text-center"
                  variant="outline-light"
                  onClick={LikePosttHandler}
                >
                  {post.likes ? (
                    <i style={{ color: "red" }} className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </Button>
              </Col>
            </Row>
          ) : (
            <Message variant="danger">
              <Link to="/" className="btn my-3">
                Someting went wrong! Go Back
              </Link>
            </Message>
          )}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
