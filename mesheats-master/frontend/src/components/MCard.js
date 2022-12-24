import React from 'react'
import Card from 'react-bootstrap/Card'
import { MdShareLocation } from 'react-icons/md'
import { IoMdCall } from 'react-icons/io'
import { FcViewDetails } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const MCard = ({ mesh, label = "View Dishes" }) => {

    let mob = "tel:+91" + mesh.mobile


    return (
        <Card
            style={{ width: "18rem", padding: "0%", borderRadius: "5%" }}
        >
            <Card.Body>
                <Card.Title>{mesh.name}</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text>
                    <span style={{ display: 'block', paddingTop: "0.5rem", paddingBottom: "0.3rem" }}>
                        <MdShareLocation size='2rem' /> {mesh.location}, {mesh.city}
                    </span>
                </Card.Text>

                <a href={mob} className="Primary"><IoMdCall size='2rem' /></a>
                <Link to={`/user/dishes/${mesh._id}`} style={{ marginTop: "0.3rem", marginLeft: "2rem" }}>
                    <FcViewDetails size='2rem' /> {label}
                </Link>
            </Card.Body>
        </Card>
    )
}

export default MCard