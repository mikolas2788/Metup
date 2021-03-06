import React from 'react'; 
import { Link } from 'react-router-dom';

class GroupShow extends React.Component {

    constructor(props) {
        super(props); 

        this.state = { dropdownMenu: false }
        this.deleteGroup = this.deleteGroup.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.groupButton = this.groupButton.bind(this);
        this.memberCount = this.memberCount.bind(this);
        this.organizer = this.organizer.bind(this); 
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this); 
    }

    componentDidMount () {
        window.scrollTo(0, 0);
        this.props.fetchGroup(this.props.match.params.groupId); 
    }

    componentDidUpdate (oldProps) {
        if (this.props.match.params.groupId !== oldProps.match.params.groupId) {
            this.props.fetchGroup(this.props.match.params.groupId); 
        }
    }

    deleteGroup (event) {
        event.preventDefault();
        this.props.deleteGroup(this.props.group.id)
            .then(() => this.props.history.push('/home')); 
    }

    joinGroup (event) {
        event.preventDefault(); 
        this.props.joinGroup(this.props.group.id); 
    }

    leaveGroup (event) {
        event.preventDefault(); 
        this.props.leaveGroup(this.props.group.id); 
    }
 
    showDropdown (event) {
        event.preventDefault(); 
        this.setState({ dropdownMenu: true });
        document.getElementById('dropdown-button').addEventListener('mouseleave', this.hideDropdown); 
    }
    
    hideDropdown (e) {
        e.preventDefault(); 
        this.setState({
            dropdownMenu: false
        })
    }
    
    displayDropdown () {
        if ( this.state.dropdownMenu ) {
            return (
                <div className='dropdown-content'>
                    <Link
                        className='group-button'
                        to={`/groups/${this.props.group.id}/edit`}>
                        Edit your group
                    </Link>  
                    <button 
                        className='group-button' 
                        onClick={this.deleteGroup}>
                        Delete your group
                    </button>
                    <Link 
                        className='group-button'
                        to={`/groups/${this.props.group.id}/events/create`}
                    >
                    Create an event
                    </Link>
                </div>
            )
        }
    }

    handlePhoto (e) {
        const file = e.currentTarget.files[0];
        const formData = new FormData (); 
        formData.append('group[photo]', file);
        this.props.updateGroupPhoto(formData, this.props.group.id); 
    }

    groupButton () { 
        let button; 
        if (this.props.currentUser.id === this.props.group.organizer_id) {
            button = <div 
                        className='dropdown-button'
                        id='dropdown-button'
                        onMouseEnter={this.showDropdown}>
                        Manage your group
                        {this.displayDropdown()}
                    </div>
        } else if ((this.props.currentUser) && 
        (!this.props.group.member_ids.includes(this.props.currentUser.id))) {
            button = <button 
                        className='group-button'    
                        onClick={this.joinGroup}>
                        Join this group
                    </button>
        } else if ((this.props.currentUser) && 
        (this.props.group.member_ids.includes(this.props.currentUser.id))) {
            button = <button 
                        className='group-button'
                        onClick={this.leaveGroup}>
                        Leave this group
                    </button>
        } else {
            button = <Link 
                        className='group-link' 
                        to='/login'>
                        Join this group
                    </Link>
        }
        return button; 
    }

    organizer () {
        if (this.props.organizer) {
            return this.props.organizer.name
        }
    }

    memberCount () {
        return this.props.group.member_ids.length
    }

    memberIconCreator () {
        const members = []; 
        for (let i = 0; i < this.memberCount(); i++) {
            members.push(<img className='organizer-icon' key={i} src="https://picsum.photos/50/50/?random" alt="" />);
        }
        return members; 
    }

    photoButton () {
        if (this.props.currentUser.id === this.props.group.organizer_id) {
            return ( 
                <button className='group-add-photo'>
                    <label htmlFor='file'>
                        Upload a Photo
                        <input
                            type="file"
                            onChange={this.handlePhoto.bind(this)}
                            className='group-photo-input'
                        />
                    </label>
                </button>
            )
        } 
    }

    render () {
        let photoUrl; 
        if ( !this.props.group ) {
            return null;
        } else {
            photoUrl = this.props.group.photoUrl || 'https://s3.amazonaws.com/rendezvous-meetup-dev/mxCCsykrJvfv7ucfX3f99Yh4'
        }

        return (
            <div className='group-show-strip'>
                <div className='group-top'>
                    <div className='group-buffer'>
                        <div className='group-photo-box'>
                            {this.photoButton()}
                            <img className='group-pic' src={photoUrl} />
                        </div>
                        <div className='group-info'>
                            <h1>{this.props.group.title}</h1>
                            <div>
                                <i className="far fa-compass"></i>
                                <p>{this.props.group.location}</p>
                            </div>
                            <div>
                                <i className="fas fa-users"></i>
                                <p>{ this.memberCount() } members</p>
                            </div>
                            <div>
                                <i className="fas fa-user-shield"></i>
                                <p>Organized by { this.organizer() }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='group-mid'>
                    <div className='group-buffer'>
                        <div className='group-tabs'>
                            <Link to='#' className='group-tab'>About</Link>
                            <Link to='#' className='group-tab'>Events</Link>
                            <Link to='#' className='group-tab'>Members</Link>
                            <Link to='#' className='group-tab'>Photos</Link>
                            <Link to='#' className='group-tab'>Discussions</Link>
                            <Link to='#' className='group-tab'>More</Link>
                        </div>
                            { this.groupButton() }
                    </div>
                </div>
                <div className='group-bottom'>
                    <div className='group-buffer'>
                        <div className='group-bottom-left'>
                            <div className='left-content'>
                                <h1>What we're about</h1>
                                {this.props.group.about}
                            </div>
                        </div>
                        <div className='group-bottom-right'>
                            <div className='group-organizer'>
                                <h1>Organizer</h1>
                                <div className='group-organizer-details'> 
                                    <img className='organizer-icon' src="https://picsum.photos/50/50/?random" alt=""/>
                                    <h2> { this.organizer() } </h2>
                                </div>
                            </div>
                            <div className='group-members'>
                                <h1>Members ({this.memberCount()})</h1>
                                <div className='member-icon'>
                                    {this.memberIconCreator()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupShow; 