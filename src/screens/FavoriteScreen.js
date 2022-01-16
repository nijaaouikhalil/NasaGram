import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import Loader from "../components/Loader";
import Message from "../components/Message";

function FavoriteScreen() {
  const postsList = useSelector((state) => state.postsList);
  const { error, loading, favorites } = postsList;

  return (
    <div>
      <h1>Liked posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row justify-content-between container">
          <Row className="row-eq-height">
            {favorites.map((post, index) => (
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
        </div>
      )}
    </div>
  );
}

export default FavoriteScreen;
