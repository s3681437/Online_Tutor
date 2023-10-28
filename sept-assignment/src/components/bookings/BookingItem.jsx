import React from 'react'

function BookingItem(props) {
    const { _id, bookingStatus, tutor, timeBooking, dateCreated } = props.bookingItem

    var timeOutput = ''
    for (var key in timeBooking) {
        timeOutput += key + ' - ' + timeBooking[key]
    }

    var bookingDate = (new Date(dateCreated)).toLocaleDateString()

    var tutorReturn = props.tutorArray.filter(t => t._id === tutor).map(e => e.tutorName)

    var classNameStr = bookingStatus === "accepted" ? "badge badge-success" :
        bookingStatus === "declined" ? "badge badge-danger" : "badge badge-warning"

    return (
        <div className="card mt-3" style={bookingCard}>
            <div className="card-header" style={cardHeaderStyle}>
                Booking ID: {_id}
            </div>
            <div className="card-body">
                <h5 className="card-title">Booking Status:
                    <span className={classNameStr}>{bookingStatus}</span>
                </h5>
                <p className="card-text">Booker: {props.user.userFname}</p>
                <p className="card-text">Tutor: {tutorReturn}</p>
                <p className="card-text">Time Booked: {timeOutput}</p>
                <p className="card-text">Date Created: {bookingDate}</p>
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

export default BookingItem;