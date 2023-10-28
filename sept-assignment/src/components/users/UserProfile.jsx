import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class UserProfile extends Component {
    render() {
        const user = this.props.user
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">User Profile</h4>
                            </div>
                            <div className="card-body">
                                <form className="form">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item">{user.userEmail}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">First name</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item">{user.userFname}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item">{user.userLname}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Contact</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item">{user.userContact}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                        <div className="col-lg-9">
                                            <li className="list-group-item">{user.userAddress}</li>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label"></label>
                                        <div className="col-lg-9">
                                            <Link to={`/users/edit/${user._id}`}>
                                                <button type="button" className="btn btn-warning">
                                                    Edit Profile
                                                </button></Link>
                                        </div>
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

export default UserProfile