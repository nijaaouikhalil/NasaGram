import React from "react";
import { Card, Placeholder } from "react-bootstrap";

function Skeleton() {
  return (
    <Card>
      <Placeholder as={Card.Img} animation="glow"></Placeholder>
      <Card.Img variant="top" src="./grey.jpg" />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder className="w-100" />
          <Placeholder className="w-100" size="lg" />
        </Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default Skeleton;
