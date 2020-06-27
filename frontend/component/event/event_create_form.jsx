import React, { useState, useEffect } from 'react';
import moment from 'moment'
import DatePicker from "react-modern-calendar-datepicker";
import { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';
import { withRouter } from 'react-router-dom'; 
import { displayDate } from './event_create_selectors'

const EventCreateForm = ({ groupId }) => {
    let today = utils().getToday()
    const [ title, setTitle ] = useState('')
    const [ selectedDay, setSelectedDay ] = useState(today)
    const [ selectedDay2, setSelectedDay2 ] = useState(selectedDay)
    // const [ duration, setDuration ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ location, setLocation ] = useState('')

    const startDateInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            value={displayDate(selectedDay)}
            style={{
                minWidth: '250px',
                padding: '16px',
                fontSize: '1.5rem',
                border: '1px solid #a2a2a2',
                borderRadius: '3px',
                backgroundColor: 'white',
                fontFamily: 'sans-serif',
                fontSize: '16px', 
                color: '#2e3e48',
                textAlign: 'center',
                marginRight: '20px'
            }}
        />
    )

    const endDateInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            value={displayDate(selectedDay2)}
            style={{
                minWidth: '250px',
                padding: '16px',
                fontSize: '1.5rem',
                border: '1px solid #a2a2a2',
                borderRadius: '3px',
                backgroundColor: 'white',
                fontFamily: 'sans-serif',
                fontSize: '16px', 
                color: '#2e3e48',
                textAlign: 'center',
                marginRight: '20px'
            }}
        />
    )

    return (
        <div className='ce-strip'>
            <div className='ce-form-strip'>
                <form className='ce-form' >
                    <div className='ce-main'>
                        <div className='ce-left'>
                            <div className='ce-header'>
                                <h1>Create an Event</h1>
                                <p>Group Name Goes Here</p>
                            </div>
                            <div className='ce-input'>
                                <h1>Title (required)</h1>
                                <input
                                    className='ce-input-box'
                                    onChange={ ()=> setTitle(event.target.value)}
                                    value={ title }
                                />
                            </div>
                            <div className='ce-input'>
                                <h1> Start Date and Time</h1>
                                <DatePicker 
                                    value={selectedDay}
                                    onChange={setSelectedDay}
                                    minimumDate={today}
                                    renderInput={startDateInput}
                                />
                                <TimePicker 
                                
                                
                                />
                            </div>
                            <div className='ce-input'>
                                <h1> End Date and Time</h1>
                                <DatePicker
                                    value={selectedDay2}
                                    onChange={setSelectedDay2}
                                    minimumDate={selectedDay}
                                    renderInput={endDateInput}
                                />


                                <TimePicker 
                                
                                
                                />
                            </div>
                            <div className='ce-input'>
                                <h1>Description</h1>
                                <p>Let your attendees know what to expect, including the agenda, what they need to bring, and how to find the group.</p>
                                <textarea
                                    className='ce-input-big-box'
                                    onChange={ ()=> setDescription(event.target.value)}
                                    value={description}
                                />
                            </div>
                            <div className='ce-input'>
                                <h1>Location</h1>
                                <input
                                    className='ce-input-box'
                                    onChange={ ()=> setLocation(event.target.value)}
                                    value={location}
                                />
                            </div>
                            {/* <div className='ce-input'>
                                <h1>Date and Time</h1>
                                <input
                                    className='ce-input-box'
                                    onChange={this.handleUpdate('date')}
                                    value={this.state.date}
                                />
                            </div>
                            <div className='ce-input'>
                                <h1>Duration</h1>
                                <input
                                    className='ce-input-box'
                                    onChange={this.handleUpdate('time')}
                                    value={this.state.time}
                                />
                            </div>
                            <div className='ce-input'>
                                <h1>Description</h1>
                                <p>Let your attendees know what to expect, including the agenda, what they need to bring, and how to find the group.</p>
                                <textarea
                                    className='ce-input-big-box'
                                    onChange={this.handleUpdate('description')}
                                    value={this.state.description}
                                />
                            </div>
                            <div className='ce-input'>
                                <h1>Location</h1>
                                <input
                                    className='ce-input-box'
                                    onChange={this.handleUpdate('location')}
                                    value={this.state.location}
                                />
                            </div> */}
                        </div>
                        <div className='ce-right'>
                            <div className='ce-tips'>
                                <h1>
                                    Tips for a great event
                                    </h1>
                                <p className='ce-tip-header'>
                                    Be descriptive
                                    </p>
                                <p className='ce-tip'>
                                    A good title immediately gives people an idea of what the event is about.
                                    </p>
                                <p className='ce-tip-header'>
                                    Get organized
                                    </p>
                                <p className='ce-tip'>
                                    Describe things in a clear order so it's easy to digest. Start with an overall description of the event and include a basic agenda, before you move into really specific details.
                                    </p>
                                <p className='ce-tip-header'>
                                    Add an image
                                    </p>
                                <p className='ce-tip'>
                                    Upload a photo or image to give members a better feel for the event.
                                    </p>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div className='ce-footer'>
                <input
                    className='ce-submit'
                    type="submit"
                    value='Publish' />

                {/* For Possible Cancel, Preview button features
                    <div className='ce-footer-left'>
                    </div>
                    <div className='ce-footer-right'>
                    </div> */}
            </div>
        </div>
    ) 
}

export default withRouter (EventCreateForm)

// class CreateEventForm extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             creator_id: this.props.creatorId, 
//             title: '',
//             start_time: '',
//             end_time: '',
//             description: '',
//             location: ''
//         }

//         this.handleSubmit = this.handleSubmit.bind(this); 
//         this.handleDayClick = this.handleDayClick.bind(this); 
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         this.props.createEvent(this.state).then((promise) => {
//             return (
//                 this.props.history.push(`/groups/${promise.group.id}/events`)
//             );
//         });
//     }

//     handleUpdate(field) {
//         return (event) => {
//             this.setState({ [field]: event.target.value });
//         };
//     }

//     handleDayClick(day, { selected }) {
//         this.setState({
//             start_time: selected ? undefined : day,
//         });
//     }

//     render () {
//         return (
//             <div className='ce-strip'>
//                 <div className='ce-form-strip'>
//                     <form className='ce-form' onSubmit={this.handleSubmit}>
//                         <div className='ce-main'>
//                             <div className='ce-left'>
//                                 <div className='ce-header'>
//                                     <h1>Create an Event</h1>
//                                     <p>Group Name Goes Here</p>
//                                 </div>
//                                 <div className='ce-input'>
//                                     <h1>Title (required)</h1>
//                                     <input
//                                         className='ce-input-box'
//                                         onChange={this.handleUpdate('title')}
//                                         value={this.state.title}
//                                     />
//                                 </div>
//                                 <div className='ce-input'>
//                                     <h1>Date and Time</h1>
//                                     <input
//                                         className='ce-input-box'
//                                         onChange={this.handleUpdate('date')}
//                                         value={this.state.date}
//                                     />
//                                 </div>
//                                 <div className='ce-input'>
//                                     <h1>Duration</h1>
//                                     <input
//                                         className='ce-input-box'
//                                         onChange={this.handleUpdate('time')}
//                                         value={this.state.time}
//                                     />
//                                 </div>
//                                 <div className='ce-input'>
//                                     <h1>Description</h1>
//                                     <p>Let your attendees know what to expect, including the agenda, what they need to bring, and how to find the group.</p>
//                                     <textarea
//                                         className='ce-input-big-box'
//                                         onChange={this.handleUpdate('description')}
//                                         value={this.state.description}
//                                     />
//                                 </div>
//                                 <div className='ce-input'>
//                                     <h1>Location</h1>
//                                     <input
//                                         className='ce-input-box'
//                                         onChange={this.handleUpdate('location')}
//                                         value={this.state.location}
//                                     />
//                                 </div>
//                             </div>
//                             <div className='ce-right'>
//                                 <div className='ce-tips'>
//                                     <h1>
//                                         Tips for a great event
//                                     </h1>
//                                     <p className='ce-tip-header'>
//                                         Be descriptive
//                                     </p>
//                                     <p className='ce-tip'>
//                                         A good title immediately gives people an idea of what the event is about.
//                                     </p>
//                                     <p className='ce-tip-header'>
//                                         Get organized
//                                     </p>
//                                     <p className='ce-tip'>
//                                         Describe things in a clear order so it's easy to digest. Start with an overall description of the event and include a basic agenda, before you move into really specific details.
//                                     </p>
//                                     <p className='ce-tip-header'>
//                                         Add an image
//                                     </p>
//                                     <p className='ce-tip'>
//                                         Upload a photo or image to give members a better feel for the event.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                     </form>
//                 </div>
//                 <div className='ce-footer'>
//                     <input
//                         className='ce-submit'
//                         type="submit"
//                         value='Publish' />

//                     {/* For Possible Cancel, Preview button features
//                     <div className='ce-footer-left'>
//                     </div>
//                     <div className='ce-footer-right'>
//                     </div> */}
//                 </div>
//             </div>
//         ) 
//     }
// }

// export default withRouter (CreateEventForm); 