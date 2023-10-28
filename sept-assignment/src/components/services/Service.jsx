import React, { Component } from "react";


class Service extends Component {

  state = {
    isEdit: false,
    editName: ""
  }

  onEdit = () => {
    this.setState({ isEdit: !this.state.isEdit })
    console.log(this.state.isEdit)
  }

  onEditSubmit = (event) => {
    this.onEdit()
    event.preventDefault()
    this.props.onEditSubmit(this.props.service._id, this.state.editName)
    this.setState({ editName: "" })
  }

  handleChange = (event) => {
    this.setState({ editName: event.target.value })

  }

  render() {
    const { serviceName, _id } = this.props.service;
    return (
      <div >
        <li className="list-group-item">
          {serviceName}
          {
            this.state.isEdit ?
              <form onSubmit={this.onEditSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.editName}
                    onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Save</button>
              </form>
              : <div className='right'>

                <button
                  type="button"
                  className="btn btn-warning btn-sm mr-2"
                  onClick={this.onEdit.bind(this)}
                >Edit</button>
                <button
                  type="button"
                  className="btn btn-danger  btn-sm"
                  onClick={this.props.delService.bind(this, _id)}>Delete</button>

              </div>
          }

        </li>
      </div>

    );
  }
}

export default Service;
