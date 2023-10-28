import React, { Component } from "react"

import { Link } from "react-router-dom"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class RegisterSuccessModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.registered
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
                    <ModalHeader toggle={this.toggle}>Successfully Registered!</ModalHeader>
                    <ModalBody>
                        Your registration is successful! Please log in!
                </ModalBody>
                    <ModalFooter>
                        <Link to="/login" style={{ color: "white" }}>
                            <Button color="primary" onClick={this.toggle}>
                                Login
                            </Button>
                        </Link>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegisterSuccessModal