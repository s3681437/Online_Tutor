import React from "react";

export default class CustomizeTutor extends React.Component {
  state = {
    tutorName: "",
    tutorAge: "",
    tutorGender: "",
    tutorNationality: "",
    tutorSpecialty: "",
    tutorExpenrience: "",
    tutorImage: "",
    weekDay: "",
    hourTime: "",
    minuteTime: ""
  };

  handleChangeTutor = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitTutor = e => {
    console.log(this.state.weekDay)
    console.log(this.state.hourTime)
    console.log(this.state.minuteTime)

    e.preventDefault()
    this.props.addTutor(this.state.tutorName, this.state.tutorAge,
      this.state.tutorGender, this.state.tutorNationality, this.state.tutorSpecialty,
      this.state.tutorExpenrience, this.state.weekDay, this.state.hourTime, this.state.minuteTime, this.state.tutorImage)
    this.setState({
      tutorname: "",
      tutorAge: "",
      tutorGender: "",
      tutorNationality: "",
      tutorSpecialty: "",
      tutorExpenrience: "",
      tutorImage: "",
      weekDay: "",
      hourTime: "",
      minuteTime: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitTutor} className='mb-3 mt-3'>
        <div className="form-row">
          <div className="col">
            <h5>Tutor Form</h5>
            <input
              type="text"
              name="tutorName"
              className="form-control"
              placeholder="Tutor Name"
              value={this.state.tutorName}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              name="tutorAge"
              className="form-control"
              placeholder="Tutor Age"
              value={this.state.tutorAge}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              name="tutorGender"
              className="form-control"
              placeholder="Tutor Gender"
              value={this.state.tutorGender}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              className="form-control"
              name="tutorNationality"
              placeholder="Tutor Nationality"
              value={this.state.tutorNationality}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              name="tutorSpecialty"
              className="form-control"
              placeholder="Tutor Specialty"
              value={this.state.tutorSpecialty}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              className="form-control"
              name="tutorExpenrience"
              placeholder="Tutor Experience"
              value={this.state.tutorExpenrience}
              onChange={this.handleChangeTutor}
            />
            <input
              type="text"
              className="form-control"
              name="tutorImage"
              placeholder="Image Url"
              value={this.state.tutorImage}
              onChange={this.handleChangeTutor}
            />
            <p>
              Busy Time <span></span>
              <select
                name="weekDay"
                placeholder="Day"
                value={this.state.weekDay}
                onChange={this.handleChangeTutor}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>

              <select
                name="hourTime"
                value={this.state.hourTime}
                placeholder="Hour"
                onChange={this.handleChangeTutor}
              >
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>

              <select
                name="minuteTime"
                value={this.state.minuteTime}
                placeholder="Minute"
                onChange={this.handleChangeTutor}
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </p>
          </div>

        </div>
        <div className="col">
          <input
            type="submit"
            value="Add Tutor"
            className="btn btn-primary" />
        </div>
      </form>
    )
  }
}