import React from 'react'

import { Link } from "react-router-dom"
import CountTutor from '../tutors/CountTutor';

function ServiceItem(props) {

    const { serviceName } = props.serviceItem

    return (
        <Link to={`/tutors/${serviceName}`} className="col-6">
            <li className="list-group-item list-group-item-action">
                <div className="d-flex bd-highlight">
                    <div className="p-2 w-100 bd-highlight">{serviceName}</div>
                    <div className="p-2 flex-shrink-1 bd-highlight">
                        <CountTutor serviceName={serviceName} tutors={props.tutors} />
                    </div>

                </div>
            </li>
        </Link>
    )
}

export default ServiceItem;