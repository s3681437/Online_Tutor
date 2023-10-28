import React, { Component } from 'react'
import RegisterSuccessModal from './modals/RegisterSuccessModal';
import RegisterErrorModal from './modals/RegisterErrorModal';

class Register extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            fName: "",
            lName: "",
            contact: "",
            address: ""
        }
    }

    onRegisterChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onRegister = (e) => {
        e.preventDefault()
        this.props.addUser(this.state.email, this.state.password,
            this.state.fName, this.state.lName,
            this.state.contact, this.state.address)
        this.setState({
            email: "",
            password: "",
            fName: "",
            lName: "",
            contact: "",
            address: ""
        })

    }

    render() {
        console.log(this.props.registered)
        return (
            <div>
                <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Register</h2>
                <form onSubmit={this.onRegister}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-5">
                            <input
                                type="text"
                                name="fName"
                                className="form-control"
                                placeholder="First name"
                                value={this.state.fName}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                        <div className="col-sm-5">
                            <input
                                type="text"
                                className="form-control"
                                name="lName"
                                placeholder="Last name"
                                value={this.state.lName}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="contact"
                                placeholder="Contact Number"
                                value={this.state.contact}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Address"
                                value={this.state.address}
                                onChange={this.onRegisterChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>

                {this.props.registered ? <RegisterSuccessModal registered={this.props.registered} /> : null}

                {this.props.rError ? <RegisterErrorModal rError={this.props.rError} /> : null}
            </div>
        )
    }

}

export default Register 