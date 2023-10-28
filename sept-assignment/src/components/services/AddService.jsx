import React from "react";
// import {
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Col,
//   Container
// } from "reactstrap";

export default class AddService extends React.Component {
  state = {
    name: ""
  };
  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addService(this.state.name);
    this.setState({ name: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className='mb-3 mt-3'>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Add service"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <input
              type="submit"
              value="Add service"
              className="btn btn-primary" />
          </div>
        </div>
      </form>

      // <Container>
      //   <Form onSubmit={this.onSubmit}>
      //     <FormGroup row>
      //       <Label for="serviceName" sm={2}>
      //         Add Service
      //        </Label>
      //       <Col sm={10}>
      //         <Input
      //           type="text"
      //           name="name"
      //           id="serviceName"
      //           placeholder="default"
      //           value={this.state.name}
      //           onChange={this.handleChange}
      //         />
      //       </Col>
      //     </FormGroup>
      //     <Button type="submit" value="Submit" style={{ flex: 1 }}>
      //       Add
      //      </Button>
      //   </Form>
      // </Container> 
    );
  }
}
