import React, { Component } from "react"
import ServiceItem from "./ServiceItem";

class ServiceList extends Component {
    render() {
        return (
            <div className="container">
                <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Choose a subject</h2>
                <div className="row">
                    {this.props.serviceList.map(serviceItem =>
                        <ServiceItem
                            key={serviceItem._id}
                            serviceItem={serviceItem}
                            tutorNumber={this.props.tutorNumber}
                            tutors={this.props.tutors}
                        />)
                    }
                </div>
            </div>
        )
    }
}

export default ServiceList;