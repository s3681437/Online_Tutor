import React, { Component } from "react";
import Tutor from "./Tutor";

import { Container, Row } from "reactstrap";

class Tutors extends Component {
  render() {
    // console.log(this.props.match.params);
    // const tutorListing = this.props.tutors.map(tutor => (
    //   <div key={tutor._id}>
    //     {tutor.tutorSpecialty === this.props.match.params.serviceName ? (
    //       <Tutor tutor={tutor} />
    //     ) : null}
    //   </div>
    // ));

    return (
      <Container>
        <Row>
          {this.props.tutors.map(tutor => <Tutor key={tutor._id} tutor={tutor}
            delTutor={this.props.delTutor}
            onEditTutorSubmit={this.props.onEditTutorSubmit} />)}
        </Row>
      </Container>
    );
  }
}

export default Tutors;
