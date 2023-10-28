import React, { Component } from 'react'

class UpdateService extends Component {
    constructor() {
        super()
        this.state = {
            updatedName: ""
        }

        handleSubmit = (e) => {
            e.preventDefault()
            this.props.updateService(this.state.updatedName)
            this.setState({ updatedName: "" })
        }

        handleChange = (e) => {
            this.setState({ updatedName: e.target.value })
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>New Service Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.updatedName}
                        onChange={this.handleChange}></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default UpdateService
