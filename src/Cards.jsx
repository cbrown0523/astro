import React from "react";
import Card from "react-bootstrap/Card";

function Cards(props) {
  return (
    <Card>
      <Card.Body style={{ width: "140px", height: "80px" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.subTitle}
        </Card.Subtitle>
        <Card.Subtitle>{props.text}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default Cards;
