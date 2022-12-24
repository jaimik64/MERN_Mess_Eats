import React from 'react'
import Card from 'react-bootstrap/Card'
import { MdShareLocation } from 'react-icons/md'
import { IoMdCall } from 'react-icons/io'
import { FcViewDetails } from 'react-icons/fc'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MCardSubs = ({ mesh, handleData }) => {
    // label="Select Mesh"

    return (
        <Card
            style={{ width: "18rem", padding: "0%", borderRadius: "5%" }}
        >
            <Form>
                <Card.Body>
                    <Card.Title>{mesh.name}</Card.Title>
                    <Card.Subtitle></Card.Subtitle>
                    <Card.Text>
                        <span style={{ display: 'block', paddingTop: "0.5rem", paddingBottom: "0.3rem" }}>
                            <MdShareLocation size='2rem' /> {mesh.location}, {mesh.city}
                        </span>
                    </Card.Text>

                </Card.Body>
                <Button onClick={handleData("meshId", mesh._id)}>
                    Select Mess
                </Button>
            </Form>
        </Card>
    )
}

export default MCardSubs