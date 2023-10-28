import React from 'react'

import ConfirmModal from '../components/modals/ConfirmModal'
import ErrorModal from '../components/modals/ErrorModal'

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hourTime: "",
      minuteTime: "",
      period: "",
      weekDay: "",
      tutorId: this.props.chosenTutor,
      bookerId: localStorage.getItem('userID'),
      disabledTime: this.props.disabledTime,
      disabledDay: "",
      disableOption: [],
      invalidChoice: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    console.log(this.state.disabledTime)
  }

  onSubmitBooking = (e) => {
    e.preventDefault()

    let timeStr = this.state.hourTime + "." + this.state.minuteTime + this.state.period
    let invalidTime = this.props.disabledTime
    this.state.minuteTime !== "00" ?
      timeStr = this.state.hourTime + "." + this.state.minuteTime + this.state.period
      : timeStr = this.state.hourTime + this.state.period

    console.log(invalidTime)

    this.state.weekDay in invalidTime && invalidTime[this.state.weekDay] === timeStr ?
      this.setState({ invalidChoice: true }) :
      this.onAddBooking()
  }

  onAddBooking = () => {
    this.props.addBooking(
      this.state.hourTime,
      this.state.minuteTime,
      this.state.period,
      this.state.weekDay,
      this.state.tutorId,
      this.state.bookerId,
      this.state.invalidChoice
    )
    this.setState({
      hourTime: "",
      minuteTime: "",
      period: "",
      weekDay: "",
      showModal: true
    })
  }

  render() {
    const hourArr = []
    const minuteArr = ["00", "15", "30", "45"]
    const busyTimeObj = this.props.disabledTime
    const keyArr = []
    const dayArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    for (let key in busyTimeObj) {
      keyArr.push(key)
    }

    for (let i = 0; i < 13; i++) {
      hourArr.push(i)
    }

    console.log(this.state.bookerId)

    return (
      <div className="container">
        <form onSubmit={this.onSubmitBooking}>
          <h5>Please select your schedule below:</h5>
          <div className="form-group">
            <label>Select Time</label>
            <div className="form-row">
              <div className="col">
                <select
                  className="custom-select"
                  name="hourTime"
                  value={this.state.hourTime}
                  onChange={this.handleChange}
                >
                  <option hidden >Hour</option>
                  {hourArr.map((hour, index) => <option key={index} value={hour}>{hour}</option>)}
                </select>
              </div>

              <div className="col">
                <select
                  className="custom-select"
                  name="minuteTime"
                  id="SelectTime"
                  value={this.state.minuteTime}
                  onChange={this.handleChange}
                >
                  <option hidden >Minute</option>
                  {minuteArr.map((minute, index) => <option value={minute} key={index}>{minute}</option>)}
                </select>
              </div>

              <div className="col">
                <select
                  className="custom-select"
                  name="period"
                  id="period"
                  value={this.state.period}
                  onChange={this.handleChange}
                >
                  <option hidden >am or pm</option>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group" >
            <label>Select Day</label>
            <select
              className="custom-select"
              name="weekDay"
              value={this.state.weekDay}
              onChange={this.handleChange}
            >
              <option hidden >Day</option>
              {dayArr.map((val, index) =>
                <option
                  key={index}
                  value={val}
                >{val}</option>)}
            </select>
          </div>
          <input type="submit" value="Confirm" className="btn btn-primary" />
        </form >

        {this.state.invalidChoice ? <ErrorModal invalidChoice={this.state.invalidChoice} /> : null}

        {this.state.showModal ? <ConfirmModal showModal={this.state.showModal} bookerId={this.state.bookerId} /> : null}
      </div>
    );
  }
}

export default Schedule