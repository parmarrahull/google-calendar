import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Container, Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', color: '#3174ad' });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSaveEvent = (e) => {
        e.preventDefault();
        setEvents([...events, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }]);
        handleCloseModal();
        setNewEvent('')
    };

    const eventPropGetter = (event) => {
        const backgroundColor = event.color;
        return { style: { backgroundColor } };
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Google Calendar</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Button variant="outline-light" onClick={handleShowModal}>
                            Add Event
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    eventPropGetter={eventPropGetter}
                />
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveEvent}>
                        <Form.Group controlId="formEventTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleEventChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventStart">
                            <Form.Label>Start Date and Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="start"
                                value={newEvent.start}
                                onChange={handleEventChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventEnd">
                            <Form.Label>End Date and Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="end"
                                value={newEvent.end}
                                onChange={handleEventChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventColor">
                            <Form.Label>Event Color</Form.Label>
                            <Form.Control
                                type="color"
                                name="color"
                                value={newEvent.color}
                                onChange={handleEventChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Event
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
