import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

function PostCarousel() {
  const postsList = useSelector((state) => state.postsList);
  const { error, loading, favorites } = postsList;

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {favorites.map((post) => (
        <Carousel.Item key={post.title}>
          <Link to={`/post/${post.title}`}>
            <Image src={post.hdurl} alt={post.explanation} fluid />
            <Carousel.Caption className="carousel.caption">
              <h4>{post.title}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PostCarousel;
