import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Navigation from "./components/Navigation";

import ServiceList from "./components/services/ServiceList";
import Services from "./components/services/Services";
import AddService from "./components/services/AddService";

import Tutors from "./components/tutors/Tutors";
import TutorList from "./components/tutors/TutorList";
import CustomizeTutor from "./components/tutors/CustomizeTutor";
import TutorGroup from "./components/tutors/TutorGroup";

import Bookings from "./components/bookings/Bookings";
import BookingList from "./components/bookings/BookingList";

import Schedule from "./components/Schedule";

import Register from "./components/Register";
import Login from "./components/Login"

import UserProfile from "./components/users/UserProfile";
import EditProfile from "./components/users/EditProfile";

import "./App.css";


class App extends Component {
  state = {
    services: [],
    tutors: [],
    bookings: [],
    user: {},
    bookingRequests: [],
    editService: "",
    chosenTutorId: "",
    disabledTime: {},
    userId: localStorage.getItem('userID'),
    message: "",
    registered: false,
    rError: false
  };

  componentDidMount() {
    axios.get("http://localhost:8080/services")
      .then(res => this.setState({ services: res.data }))

    axios.get(`http://localhost:8080/bookings/${this.state.userId}`)
      .then(res => this.setState({ bookings: res.data }))

    axios.get("http://localhost:8080/bookingRequests")
      .then(res => this.setState({ bookingRequests: res.data }))

    axios.get("http://localhost:8080/tutors")
      .then(res => this.setState({ tutors: res.data }))

    axios.get(`http://localhost:8080/users/${this.state.userId}`)
      .then(res => this.setState({ user: res.data })
      )

  }


  addService = name => {
    axios.post('http://localhost:8080/services', {
      serviceName: name
    })
      .then(res => this.setState({ services: [...this.state.services, res.data] }))
  };

  delService = (id) => {
    axios.delete(`http://localhost:8080/services/${id}`)
      .then(res => this.setState({ services: [...this.state.services.filter(service => service._id !== id)] }))
  }

  onEditSubmit = (id, name) => {
    axios.put(`http://localhost:8080/services/${id}`, {
      serviceName: name
    })
      .then(res => this.setState({
        services: [...this.state.services.map(service =>
          service._id === id ? { ...service, serviceName: name } : service)]
      }))
  }

  acceptBooking = (id) => {
    console.log(id)
    axios.put(`http://localhost:8080/acceptBookingReq/${id}`, {
      bookingStatus: 'accepted'
    })
      .then(res => this.setState({
        bookingRequests: [...this.state.bookingRequests.filter(request => request._id !== id)]
      }))
  }

  declineBooking = (id) => {
    console.log(id)
    axios.put(`http://localhost:8080/declineBookingReq/${id}`, {
      bookingStatus: 'declined'
    })
      .then(res => this.setState({
        bookingRequests: [...this.state.bookingRequests.filter(request => request._id !== id)]
      }))
  }

  addTutor = (name, age, gender, nationality, specialty,
    experience, day, hour, minute, image) => {

    let aTimeStr = hour + "." + minute
    let aSheduleObj = {}
    aSheduleObj[day] = aTimeStr

    axios.post('http://localhost:8080/tutors', {
      tutorName: name,
      tutorAge: age,
      tutorGender: gender,
      tutorNationality: nationality,
      tutorSpecialty: specialty,
      tutorExperience: experience,
      busyTime: aSheduleObj,
      tutorImage: image
    })
      .then(res => this.setState({ tutors: [...this.state.tutors, res.data] }))
  };

  onEditTutorSubmit = (id, tutorName, tutorAge, tutorGender, tutorNationality,
    tutorSpecialty, tutorExperience, day, hour, minute, image) => {

    let eTimeStr = hour + "." + minute
    let eSheduleObj = {}
    eSheduleObj[day] = eTimeStr

    axios.put(`http://localhost:8080/tutors/${id}`, {
      tutorName: tutorName,
      tutorAge: tutorAge,
      tutorGender: tutorGender,
      tutorNationality: tutorNationality,
      tutorSpecialty: tutorSpecialty,
      tutorExperience: tutorExperience,
      busyTime: eSheduleObj,
      tutorImage: image
    })
      .then(res => this.setState({
        tutors: [...this.state.tutors.map(tutor =>
          tutor._id === id ? {
            ...tutor, tutorName: tutorName, tutorAge: tutorAge, tutorGender: tutorGender,
            tutorNationality: tutorNationality, tutorSpecialty: tutorSpecialty,
            tutorExperience: tutorExperience, busyTime: eSheduleObj, tutorImage: image
          } : tutor)]
      }))

  }

  delTutor = (id) => {
    axios.delete(`http://localhost:8080/tutors/${id}`)
      .then(res => this.setState({ tutors: [...this.state.tutors.filter(tutor => tutor._id !== id)] }))
  }

  addBooking = (hour, minute, period, day, tutorId, bookerId) => {
    let timeString = ""
    minute === "00" ? timeString = hour + period : timeString = hour + "." + minute + period
    let sheduleObj = {}
    sheduleObj[day] = timeString

    axios.post(`http://localhost:8080/bookings/${bookerId}`, {
      tutor: tutorId,
      booker: bookerId,
      timeBooking: sheduleObj
    }).then(res => this.setState({ bookings: [...this.state.bookings, res.data] }))

    const matchTutorArr = this.state.tutors.filter(tutor => tutor._id === tutorId)
    matchTutorArr[0].busyTime[day] = timeString
    console.log(matchTutorArr[0])

    axios.put(`http://localhost:8080/tutors/${tutorId}`, matchTutorArr[0])
  }

  passTutor = (tId, busyTime) => {
    console.log(busyTime)
    this.setState({
      chosenTutorId: tId,
      disabledTime: busyTime
    })
  }

  addUser = (email, password, fName, lName, contact, address) => {
    var headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    axios.post("http://localhost:8080/users", {
      userEmail: email,
      userPassword: password,
      userFname: fName,
      userLname: lName,
      userContact: contact,
      userAddress: address
    },
      { headers: headers }
    )
      .then(res => {
        this.setState({ registered: true })
      }
      )
      .catch(error => this.setState({ rError: true }))
  }

  loginInfo = (email, password) => {
    axios.post('http://localhost:8080/login', {
      userEmail: email,
      userPassword: password
    })

      .then(res => {
        console.log(res.data)
        if (res.data === 'error') {
          alert('Wrong username or password!')
        } else {

          localStorage.setItem('userID', res.data._id)
          localStorage.setItem('isLogged', '1')
          console.log(localStorage.getItem('userID'))
          window.location = '/services'
        }
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }

  editUser = (id, fName, lName, contact, address) => {
    axios.put(`http://localhost:8080/users/${id}`, {
      userFname: fName,
      userLname: lName,
      userContact: contact,
      userAddress: address
    })
      .then(res => this.setState({
        user: {
          ...this.state.user,
          userFname: fName,
          userLname: lName,
          userContact: contact,
          userAddress: address
        }
      }))
  }

  render() {
    return (
      <Router>
        <Navigation
          userId={this.state.userId}
          user={this.state.user}
          loggedIn={this.state.loggedIn}
        />
        <div className="App">
          <div className="container">
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <ServiceList serviceList={this.state.services} tutors={this.state.tutors} />
                </React.Fragment>
              )}
            />

            <Route
              path="/services"
              exact
              render={props => (
                <ServiceList serviceList={this.state.services} tutors={this.state.tutors} />
              )}
            />

            <Route
              path="/services/admin"
              render={props => (
                <React.Fragment>
                  <AddService addService={this.addService} />
                  <Services
                    services={this.state.services}
                    delService={this.delService}
                    onEditSubmit={this.onEditSubmit}
                    updateService={this.updateService}
                  />
                </React.Fragment>
              )}
            />

            <Route
              exact
              path="/tutors"
              render={props =>
                <TutorList tutorList={this.state.tutors} passTutor={this.passTutor} />}
            />

            <Route
              path='/tutors/:serviceName'
              render={props => <TutorGroup {...props} tutors={this.state.tutors} passTutor={this.passTutor} />}
            />


            <Route
              path="/tutors/admin"
              render={props => (
                <React.Fragment>
                  <CustomizeTutor
                    addTutor={this.addTutor}
                  />
                  <Tutors
                    tutors={this.state.tutors}
                    delTutor={this.delTutor}
                    onEditTutorSubmit={this.onEditTutorSubmit}
                  />
                </React.Fragment>
              )}
            />

            <Route
              path='/bookings/:userID'
              exact
              render={props => (localStorage.getItem('isLogged') === '1' ?
                <BookingList {...props}
                  bookingList={this.state.bookings}
                  tutorArray={this.state.tutors}
                  userId={this.state.userId}
                  user={this.state.user}
                /> : <Redirect to="/login" />
              )}
            />

            <Route
              path="/bookingRequests/:userID"
              render={props => (
                localStorage.getItem('isLogged') === '1' ? <Bookings bookings={this.state.bookingRequests}
                  acceptBooking={this.acceptBooking}
                  declineBooking={this.declineBooking}
                  tutorArray={this.state.tutors}
                /> : <Redirect to="/login" />
              )}
            />

            <Route
              path="/schedule/:userID"
              render={props => localStorage.getItem('isLogged') === '1' ?
                <Schedule
                  chosenTutor={this.state.chosenTutorId}
                  disabledTime={this.state.disabledTime}
                  addBooking={this.addBooking} />
                : <Redirect to="/login" />}
            />

            <Route
              path="/register"
              render={props => (
                <Register
                  addUser={this.addUser}
                  registered={this.state.registered}
                  rError={this.state.rError} />
              )}
            />

            <Route
              path="/login"
              render={props => (
                <Login loginInfo={this.loginInfo}
                  message={this.state.message}
                />
              )}
            />

            <Route
              path="/users/:id"
              exact
              render={props =>
                localStorage.getItem('isLogged') === '1' ?
                  <UserProfile  {...props} userId={this.state.userId} user={this.state.user} />
                  : (<Redirect to="/login" />)
              }
            />

            <Route
              path="/users/edit/:id"
              exact
              render={props =>
                localStorage.getItem('isLogged') === '1' ?
                  <EditProfile  {...props} userId={this.state.userId} user={this.state.user} editUser={this.editUser} />
                  : (<Redirect to="/login" />)
              }
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
