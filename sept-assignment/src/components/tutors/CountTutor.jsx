import React, { Component } from 'react'

class CountTutor extends Component {
    render() {

        const matchTutor = this.props.tutors.filter(tutor => tutor.tutorSpecialty === this.props.serviceName)
        const count = matchTutor.length

        return (
            <span className="badge badge-primary">{count}</span>
        )
    }
}

export default CountTutor

