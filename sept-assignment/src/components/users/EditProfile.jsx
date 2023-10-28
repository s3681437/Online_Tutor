import React, { Component } from 'react';

import axios from "axios";

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            email: "",
            fName: "",
            lName: "",
            contact: "",
            address: ""
        }
    }

    componentWillMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        let userId = this.props.match.params.id;

        axios.get(`http://localhost:8080/users/${userId}`)
            .then(res => this.setState({
                id: res.data._id,
                email: res.data.userEmail,
                fName: res.data.userFname,
                lName: res.data.userLname,
                contact: res.data.userContact,
                address: res.data.userAddress
            })
            )
    }

    onChangeEdit = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onEdit = (e) => {
        e.preventDefault()
        this.props.editUser(
            this.state.id,
            this.state.fName,
            this.state.lName,
            this.state.contact,
            this.state.address
        )
        this.setState({
            fName: "",
            lName: "",
            contact: "",
            address: ""
        })

    }

    render() {
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Edit your profile</h4>
                            </div>
                            <div className="card-body">
                                <form className="form" onSubmit={this.onEdit}>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item" style={{ fontWeight: "bold" }}>{this.state.email}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">First name</label>
                                        <div className="col-lg-9">
                                            <input
                                                name="fName"
                                                className="form-control"
                                                type="text"
                                                value={this.state.fName}
                                                onChange={this.onChangeEdit}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                                        <div className="col-lg-9">
                                            <input
                                                name="lName"
                                                className="form-control"
                                                type="text"
                                                value={this.state.lName}
                                                onChange={this.onChangeEdit}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Contact</label>
                                        <div className="col-lg-9">
                                            <input
                                                name="contact"
                                                className="form-control"
                                                type="text"
                                                value={this.state.contact}
                                                onChange={this.onChangeEdit}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                        <div className="col-lg-9">
                                            <input
                                                name="address"
                                                className="form-control"
                                                type="text"
                                                value={this.state.address}
                                                onChange={this.onChangeEdit}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3" style={{ float: "right" }}>
                                        <input
                                            className="form-control btn btn-primary"
                                            type="submit"
                                            value="Save"
                                        />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default EditProfile