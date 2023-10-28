import React, { Component } from "react"

import { Link } from "react-router-dom"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.showModal
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Successful Booking</ModalHeader>
                    <ModalBody>
                        Your booking is successful!
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            <Link to={`/bookings/${this.props.bookerId}`} style={{ color: "white" }}>View Bookings
                            </Link>
                        </Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ConfirmModal