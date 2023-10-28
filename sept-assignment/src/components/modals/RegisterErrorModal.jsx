import React, { Component } from "react"

import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';

class RegisterErrorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.rError
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            invalidChoice: !prevState.invalidChoice
        }));
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader style={{ color: "red" }} toggle={this.toggle}>Error!</ModalHeader>
                    <ModalBody>
                        <Alert color="danger">User already exists!</Alert>
                    </ModalBody>
                    <ModalFooter>
                        <NavLink href="/register">
                            <Button color="danger" onClick={this.toggle}>Register again</Button>
                        </NavLink>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegisterErrorModal