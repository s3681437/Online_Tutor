import React, { Component } from "react"
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ErrorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invalidChoice: this.props.invalidChoice
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
                <Modal isOpen={this.state.invalidChoice} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader style={{ color: "red" }} toggle={this.toggle}>Invalid Time Selection!</ModalHeader>
                    <ModalBody>
                        <Alert color="danger">Sorry, the tutor is unavailable at the chosen time.</Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Choose another schedule</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ErrorModal