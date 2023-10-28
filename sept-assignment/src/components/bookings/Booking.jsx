import React from 'react'

function Booking(props) {
    const { _id, bookingStatus, booker, tutor, timeBooking, dateCreated } = props.booking

    var timeOutput = ''
    for (var key in timeBooking) {
        timeOutput += key + ' - ' + timeBooking[key]
    }

    var bookingDate = (new Date(dateCreated)).toLocaleDateString()

    var tutorReturn = props.tutorArray.filter(t => t._id === tutor).map(e => e.tutorName)

    return (
        <div className="card mt-3" style={bookingCard}>
            <div className="card-header" style={cardHeaderStyle}>
                Booking ID: {_id}
            </div>
            <div className="card-body">
                <h5 className="card-title">Booking Status:
                    <span className="badge badge-warning">{bookingStatus}</span>
                </h5>
                <p className="card-text">Booker ID: {booker}</p>
                <p className="card-text">Tutor: {tutorReturn}</p>
                <p className="card-text">Time Booked: {timeOutput}</p>
                <p className="card-text">Date Created: {bookingDate}</p>
                <button
                    type="button"
                    className="btn btn-success btn-sm mr-2"
                    onClick={props.acceptBooking.bind(this, _id)}
                >Accept</button>
                <button
                    type="button"
                    className="btn btn-danger btn-sm mr-2"
                    onClick={props.declineBooking.bind(this, _id)}
                >Decline</button>
            </div>
        </div>
    )
}

const bookingCard = {
    border: "solid black 2px",
    width: "18rem",
    display: "inline-block",
    margin: "10px "
}


const cardHeaderStyle = {
    backgroundColor: "grey",
    color: "white"
}

export default Booking;