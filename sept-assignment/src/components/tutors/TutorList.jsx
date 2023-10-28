import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import TutorItem from "./TutorItem";

class TutorList extends Component {
  render() {
    return (
      <Container>
        <Row>
          {this.props.tutorList.map(tutorItem =>
            <TutorItem key={tutorItem._id} tutorItem={tutorItem} passTutor={this.props.passTutor} />
          )}
        </Row>
      </Container>
    );
  }
}

export default TutorList;

