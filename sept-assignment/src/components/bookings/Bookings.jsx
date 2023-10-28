import React, { Component } from 'react'
import Booking from './Booking'

class Bookings extends Component {
    render() {
        return (
            <div>
                <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Booking Requests</h2>
                {this.props.bookings.map(booking =>
                    <Booking
                        key={booking._id}
                        booking={booking}
                        acceptBooking={this.props.acceptBooking}
                        declineBooking={this.props.declineBooking}
                        tutorArray={this.props.tutorArray}
                    />
                )}
            </div>
        )
    }
}

export default Bookings;