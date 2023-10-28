import React, { Component } from "react";
import { Link } from "react-router-dom";

class TutorItem extends Component {
  render() {
    const { _id, tutorName, tutorAge, tutorGender, tutorNationality,
      tutorSpecialty, tutorExperience, busyTime, dateCreated, tutorImage } = this.props.tutorItem;

    const dateFormat = new Date(dateCreated).toLocaleDateString()

    var busyTimeDisplay = ""

    for (var pair in busyTime) {
      console.log(pair + busyTime[pair])
      busyTimeDisplay += pair + " - " + busyTime[pair] + ", "
    }

    return (
      <div>
        <div className="card" style={tutorCard}>
          <img className="card-img-top" src={tutorImage} alt="" />
          <div className="card-body">
            <h5 className="card-title">Name: {tutorName}</h5>
            <p className="card-text">Age: {tutorAge}</p>
            <p className="card-text">Gender: {tutorGender}</p>
            <p className="card-text">Nationality: {tutorNationality}</p>
            <p className="card-text">Specialty: {tutorSpecialty}</p>
            <p className="card-text">Experience: {tutorExperience}</p>
            <p className="card-text">Busy Time: {busyTimeDisplay}</p>
            <p className="card-text">Date Created: {dateFormat}</p>

            <button className="btn btn-dark" onClick={this.props.passTutor.bind(this, _id)}>
              <Link to="/schedule" style={{ color: "white" }}>Choose a schedule</Link>
            </button>
          </div>
        </div>
      </div >
    );
  }
}

const tutorCard = {
  border: "solid black 2px",
  width: "18rem",
  display: "inline-block",
  margin: "10px "
}

export default TutorItem;
