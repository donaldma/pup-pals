import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

class LargeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_going: [],
      disabled: "",
      flag: false
    }
  }
  fetchRsvp = () => {
    return axios.get(`/api/attend/${this.props.event.id}`) 
      .then((response) => {
        this.setState({user_going: response.data});
        if(this.props.user){
          let users_going = this.state.user_going;
          users_going.forEach((user) => {
            if(this.props.user.id === user.user_id){
              this.setState({
                flag: true
              });
            }
          });
        } else {
          this.setState({disabled: "disabled"});
        }
    });
  }

  handleClick = () => {
    this.props.toggleHidden();
  }
  
  handleRsvp = (e) => {
    e.stopPropagation();
    this.props.RSVP(this.props.event.id)
    .then((e) => {
      return this.fetchRsvp();
    });
  }

  handleCancelRsvp = (e) => {
    e.stopPropagation();
    this.setState({
      flag: false
    });  
    this.props.CancelRSVP(this.props.event.id);  
  }

  componentDidMount() {
    this.fetchRsvp()
  }
  
  render() {
    if (this.state.flag){
      return (
        <div className="largedetails-container">
          <div className="largedetails-titlebar">
            <h1 className="largedetails-titlebar-title">{this.props.event.title}</h1>
            <h2 className="largedetails-titlebar-subtitle">{this.props.event.count} Going</h2>
            <a href="#" onClick={this.handleClick} className="largedetails-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 80">
              <path fill="#FFFFFF" d="M34.4 40L1.174 73.168c-1.563 1.56-1.566 4.093-.006 5.657s4.09 1.567 5.654.007L40 45.66s-.003.004 33.173 33.17c1.56 1.56 4.098 1.56 5.658 0 1.56-1.56 1.56-4.1 0-5.66C45.678 40.043 45.6 40 45.6 40s.077.043 33.23-33.17c1.56-1.56 1.56-4.13 0-5.66-1.56-1.56-4.087-1.56-5.657 0C39.997 34.36 39.997 34.4 39.997 34.4L6.825 1.172C5.265-.39 2.732-.39 1.17 1.172c-1.56 1.562-1.56 4.094 0 5.656L34.4 40z"></path>
              </svg>
            </a>
          </div>
          <div className="largedetails-content">
            <div className="largedetails-section">
              <span className="largedetails-date"><i className="fa fa-calendar-o" aria-hidden="true"></i> <Moment format="ddd MMMM Do YYYY">{this.props.event.date_time}</Moment></span>
              <span className="largedetails-time"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment format="h:mm a">{this.props.event.date_time}</Moment></span>
              <span className="largedetails-location"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.event.location}</span>
              <br />
              <br />
              <a href={"/events/" + this.props.event.id} className="btn btn-primary largedetails-eventpage">Go to event page</a>                        
            </div>
            <div className="largedetails-section">
              <span className="largedetails-detailbody"><i className="fa fa-sticky-note" aria-hidden="true"></i> {this.props.event.description}</span>
            </div>
            <div className="largedetails-footer">
              <span className="largedetails-rsvp">
                <button type="button" onClick={this.handleCancelRsvp} className="btn btn-danger rsvp-btn">Not Going</button>
              </span>
            </div>
          </div>  
        </div>
      );
    } else {
      return (
        <div className="largedetails-container">
          <div className="largedetails-titlebar">
            <h1 className="largedetails-titlebar-title">{this.props.event.title}</h1>
            <h2 className="largedetails-titlebar-subtitle">{this.props.event.count} Going</h2>
            <a href="#" onClick={this.handleClick} className="largedetails-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 80">
              <path fill="#FFFFFF" d="M34.4 40L1.174 73.168c-1.563 1.56-1.566 4.093-.006 5.657s4.09 1.567 5.654.007L40 45.66s-.003.004 33.173 33.17c1.56 1.56 4.098 1.56 5.658 0 1.56-1.56 1.56-4.1 0-5.66C45.678 40.043 45.6 40 45.6 40s.077.043 33.23-33.17c1.56-1.56 1.56-4.13 0-5.66-1.56-1.56-4.087-1.56-5.657 0C39.997 34.36 39.997 34.4 39.997 34.4L6.825 1.172C5.265-.39 2.732-.39 1.17 1.172c-1.56 1.562-1.56 4.094 0 5.656L34.4 40z"></path>
              </svg>
            </a>
          </div>
          <div className="largedetails-content">
            <div className="largedetails-section">
              <span className="largedetails-date"><i className="fa fa-calendar-o" aria-hidden="true"></i> <Moment format="ddd MMMM Do YYYY">{this.props.event.date_time}</Moment></span>
              <span className="largedetails-time"><i className="fa fa-clock-o" aria-hidden="true"></i> <Moment format="h:mm a">{this.props.event.date_time}</Moment></span>
              <span className="largedetails-location"><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.event.location}</span>
              <br />
              <br />
              <a href={"/events/" + this.props.event.id} className="btn btn-primary largedetails-eventpage">Go to event page</a>                        
            </div>
            <div className="largedetails-section">
              <span className="largedetails-detailbody"><i className="fa fa-sticky-note" aria-hidden="true"></i> {this.props.event.description}</span>
            </div>
            <div className="largedetails-footer">
              <span className="largedetails-rsvp">
                <button disabled={this.state.disabled} type="button" onClick={this.handleRsvp} className="btn btn-primary rsvp-btn">Going</button>
              </span>
            </div>
          </div>  
        </div>
      );
    }
  }
}

export default LargeDetails;