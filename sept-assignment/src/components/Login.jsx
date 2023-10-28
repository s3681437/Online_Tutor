import React from 'react';

import { Link } from 'react-router-dom'

export default class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.email === '' || this.state.password === '') {
            this.setState({ email: "", password: "", message: "Please fill in your email and password! " })
        }
        else {
            this.props.loginInfo(this.state.email,
                this.state.password,
                this.state.message)
            this.setState({ email: "", password: "", message: '' })
        }
    }

    render() {
        return (
            <div>
                <h2>Log in</h2>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10" >
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                        <h5 style={{ color: "red" }}>{this.state.message}</h5>
                    </div>
                </form>
                <div className="col-sm-10" style={{ fontSize: 20 }}>
                    Don't have an account? Sign up here:
            <button className="btn btn-primary">
                        <Link to="/register" style={{ color: "white" }}>Register</Link>
                    </button>
                </div>
            </div>
        )
    }
}