import React, { Component } from "react";

import PropTypes from 'prop-types';

import EachTutor from "./EachTutor"

class TutorGroup extends Component {
    render() {
        const tutorMatchArr = this.props.tutors.filter(tutor =>
            (tutor.tutorSpecialty === this.props.match.params.serviceName)).map(tutor =>
                <EachTutor
                    key={tutor._id}
                    tutor={tutor}
                    passTutor={this.props.passTutor}
                />)

        return (
            <div>
                {tutorMatchArr.length ? tutorMatchArr :
                    <h3>Sorry, there are no available tutor at the moment!</h3>
                }

            </div>
        )
    }
}

TutorGroup.propTypes = {
    tutors: PropTypes.array.isRequired
}

export default TutorGroup