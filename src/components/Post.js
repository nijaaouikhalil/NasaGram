import React from "react";
import { Card, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LikePost } from "../actions/PostActions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Post({ post }) {
  const dispatch = useDispatch();

  const LikePosttHandler = (e) => {
    e.preventDefault();
    dispatch(LikePost(post));
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {post.title}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Card className="my-3 p-3 rounded text-center zoom">
        <Link to={`/post/${post.title}`}>
          {post.media_type === "image" ? (
            <LazyLoadImage
              alt={post.title}
              effect="blur"
              src={post.hdurl ? post.hdurl : post.url}
              className="profile_image_theme"
            />
          ) : post.media_type === "video" ? (
            <iframe
              title={post.title}
              src={post.url}
              className="profile_image_theme"
            ></iframe>
          ) : (
            <LazyLoadImage
              alt={post.title}
              effect="blur"
              src={"notsupported.png"}
              className="profile_image_theme"
            />
          )}
        </Link>

        <Card.Body>
          <Link to={`/post/${post.title}`}>
            <Card.Title as="div">
              <strong
                className="d-inline-block text-truncate"
                style={{ maxWidth: "200px" }}
              >
                {post.title}
              </strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              <Button variant="outline-light" onClick={LikePosttHandler}>
                {post.likes ? (
                  <i style={{ color: "red" }} className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </Button>
            </div>
          </Card.Text>

          <Card.Text as="h3">{post.date}</Card.Text>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
}

export default Post;
