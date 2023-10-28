import React, { Component } from 'react'
import BookingItem from './BookingItem'

class BookingList extends Component {
    render() {

        return (
            <div>
                <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Booking History</h2>
                {this.props.bookingList.filter(booking =>
                    booking.booker === this.props.match.params.userID).map(bookingItem =>
                        <BookingItem
                            key={bookingItem._id}
                            bookingItem={bookingItem}
                            tutorArray={this.props.tutorArray}
                            user={this.props.user}
                        />
                    )}
            </div>
        )
    }
}

export default BookingList;