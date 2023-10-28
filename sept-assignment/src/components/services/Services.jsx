import React, { Component } from "react";
import Service from "./Service";
import { Container } from "reactstrap";

class Services extends Component {
  render() {
    return (
      <Container>
        {/* {this.props.services.map(service => (
          <Link to={`/tutors/${service._id}`} key={service._id}>
            <Service
              service={service}
              delService={this.props.delService}
              updateService={this.props.updateService}
              onEditSubmit={this.props.onEditSubmit}
            // isEdit={this.props.isEdit}
            // onEdit={this.props.onEdit}
            />
          </Link>
        ))} */}
        {this.props.services.map(service => <Service key={service._id} service={service}
          delService={this.props.delService}
          updateService={this.props.updateService}
          onEditSubmit={this.props.onEditSubmit} />)}

      </Container>
    );
  }
}

export default Services;
