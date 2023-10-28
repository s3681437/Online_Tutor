import React, { Component } from "react";


class Tutor extends Component {

  state = {
    isEdit: false,
    editTutorName: "",
    editTutorAge: "",
    editTutorGender: "",
    editTutorNationality: "",
    editTutorSpecialty: "",
    editTutorExperience: "",
    editTutorbusyTime: {},
    editDay: "",
    editHour: "",
    editMinute: "",
    editTutorImage: ""
  }

  onEdit = (name, age, gender, nationality, specialty, experience) => {

    this.setState({
      isEdit: !this.state.isEdit, editTutorName: name, editTutorAge: age,
      editTutorGender: gender, editTutorNationality: nationality,
      editTutorSpecialty: specialty, editTutorExperience: experience
    })
  }

  onEditTutorSubmit = (event) => {
    this.onEdit()
    event.preventDefault()
    this.props.onEditTutorSubmit(
      this.props.tutor._id,
      this.state.editTutorName,
      this.state.editTutorAge,
      this.state.editTutorGender,
      this.state.editTutorNationality,
      this.state.editTutorSpecialty,
      this.state.editTutorExperience,
      this.state.editDay,
      this.state.editHour,
      this.state.editMinute,
      this.state.editTutorImage,
    )
    this.setState({
      editTutorName: "",
      editTutorAge: "",
      editTutorGender: "",
      editTutorNationality: "",
      editTutorSpecialty: "",
      editTutorExperience: "",
      editDay: "",
      editHour: "",
      editMinute: "",
      editTutorImage: "",
    })
  }

  handleChangeEditTutor = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { tutorName, _id, tutorAge, tutorGender, tutorNationality, tutorSpecialty,
      tutorExperience } = this.props.tutor;
    return (
      <div >
        <li className="list-group-item">
          {_id}
          <br />
          Name: {tutorName}
          <br />
          Age: {tutorAge}
          <br />
          Gender: {tutorGender}
          <br />
          Nationality: {tutorNationality}
          <br />
          Specialty: {tutorSpecialty}
          <br />
          Experience: {tutorExperience}
          <br />

          {
            this.state.isEdit ?
              <form onSubmit={this.onEditTutorSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="editTutorName"
                    className="form-control"
                    placeholder="Tutor Name"
                    value={this.state.editTutorName}
                    onChange={this.handleChangeEditTutor} />
                  <input
                    type="text"
                    className="form-control"
                    name="editTutorAge"
                    placeholder="Tutor Age"
                    value={this.state.editTutorAge}
                    onChange={this.handleChangeEditTutor} />
                  <input
                    type="text"
                    name="editTutorGender"
                    className="form-control"
                    placeholder="Tutor Gender"
                    value={this.state.editTutorGender}
                    onChange={this.handleChangeEditTutor} />
                  <input
                    type="text"
                    name="editTutorNationality"
                    className="form-control"
                    placeholder="Tutor Nationality"
                    value={this.state.editTutorNationality}
                    onChange={this.handleChangeEditTutor} />
                  <input
                    type="text"
                    name="editTutorSpecialty"
                    className="form-control"
                    placeholder="Tutor Specialty"
                    value={this.state.editTutorSpecialty}
                    onChange={this.handleChangeEditTutor} />
                  <input
                    type="text"
                    name="editTutorExperience"
                    className="form-control"
                    placeholder="Tutor Experience"
                    value={this.state.editTutorExperience}
                    onChange={this.handleChangeEditTutor} />

                  <input
                    type="text"
                    name="editTutorImage"
                    className="form-control"
                    placeholder="Image Url"
                    value={this.state.editTutorImage}
                    onChange={this.handleChangeEditTutor} />

                  <select
                    name="editDay"
                    placeholder="Day"
                    value={this.state.editDay}
                    onChange={this.handleChangeEditTutor}
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
                    name="editHour"
                    value={this.state.editHour}
                    placeholder="Hour"
                    onChange={this.handleChangeEditTutor}
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
                    name="editMinute"
                    value={this.state.editMinute}
                    placeholder="Minute"
                    onChange={this.handleChangeEditTutor}
                  >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" >Save</button>
              </form>
              : <div>

                <button
                  type="button"
                  className="btn btn-warning btn-sm mr-2"
                  onClick={this.onEdit.bind(this, _id, tutorName, tutorAge, tutorGender,
                    tutorNationality, tutorSpecialty, tutorExperience)}
                >Edit</button>
                <button
                  type="button"
                  className="btn btn-danger  btn-sm"
                  onClick={this.props.delTutor.bind(this, _id)}>Delete</button>
              </div>
          }

        </li>
      </div>

    );
  }
}

export default Tutor;
