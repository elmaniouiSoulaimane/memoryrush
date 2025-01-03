import React, { Component, createRef } from 'react';
//import { Store } from 'react-notifications-component';
import styles from "../../modules/MemoryGame.module.css";
import { Store } from 'react-notifications-component';

class RoomDetailsStep extends Component {
  constructor(props) {
    super(props);
    this.RoomNameRef = createRef();
    this.RoomPasswordRef = createRef();
    this.state = {
      roomName: '',
      roomPassword: '',
      errorMessage: '',
      wsConnected: false,
      isNextButtonDisabled: false,
    };
  }
  
  validateInput = (event) => {
    const { value } = event.target;
    const regex = /^[a-zA-Z0-9 _-]*$/;

    if (regex.test(value)) {
      this.setState({
        roomName: value,
        errorMessage: '',
        wsConnected: false
      });

    } else {
      this.setState({
        errorMessage: 'Only normal characters, numbers, and underscores are allowed.',
      });
    }
  }

  validatePassword = (event) => {
    const { value } = event.target;
    const regex = /^(?!.*['"`;])[\w!@#$%^&*()_+={}\[\]|\\:;,.<>?~`-]{4,}$/;

    if (regex.test(value)) {
      this.setState({
        roomPassword: value,
        errorMessage: '',
        wsConnected: false
      });

    } else {
      this.setState({
        roomPassword: value,
        errorMessage: 'Password must be at least 4 characters long',
      });
    }
  }
 
  handleClick = () => {    
    if (this.state.roomName !== '' && this.state.roomPassword !== '' && this.state.errorMessage === ''){
      console.log("passed validation")
      if (this.state.wsConnected === false) {
        let ws = null
        if (this.props.isRoomAdmin) {
          ws = new WebSocket(process.env.REACT_APP_API + `/create/${this.state.roomName}`);
        }else{
          ws = new WebSocket(process.env.REACT_APP_API + `/join/${this.state.roomName}`);
        }

        ws.onopen = (success) => {
          console.log("Websocket connection opened")
          ws.send(JSON.stringify({
            event: 'authenticate',
            step: this.props.isRoomAdmin ? 'create' : 'join',
            password: this.state.roomPassword
          }));
          this.props.setRoomName(this.state.roomName)
          this.props.setWebSocket(ws);
          this.setState({ wsConnected: true });
        };

        ws.onerror = (error) => {
          console.log("In error", error)
          Store.addNotification({
            title: "Error",
            message: error.message || "An unknown error occurred",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          })
        }


      }else{
        this.props.nextStep();
      }
    }else if (this.state.roomName === '') {
      this.setState({
        errorMessage: 'Please provide a room name'
      })
    }else if (this.state.roomPassword === '') {
      this.setState({
        errorMessage: 'Please provide a password'
      })
    }
  }

  previousStep = () => {
    //set input value to empty string
    this.setState({
      roomName: '',
      roomPassword: '',
      errorMessage: ''
    });

    this.props.previousStep();
  }

  render() {
    return (
      <div className={styles.step}>
        <div className={styles.form}> 
          <h2>Step 1: Provide room details</h2>
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <span>Please provide the room's name: </span>
              <input
                type="text"
                ref={this.RoomNameRef}
                onChange={this.validateInput}
                value={this.state.roomName}
              />
            </div>
            {this.props.isRoomAdmin ? (
              <div className={styles.inputContainer}>
                <span>Please provide a password: </span>
                <input
                  type="text"
                  ref={this.RoomPasswordRef}
                  onChange={this.validatePassword}
                  value={this.state.roomPassword}
                />
              </div>
            ):
            (
              <>
                <div className={styles.inputContainer}>
                  <span>Please provide this room's password: </span>
                  <input
                    type="text"
                    ref={this.RoomPasswordRef}
                    onChange={this.validatePassword}
                    value={this.state.roomPassword}
                  />
                </div>
              </>
            )}
            {this.state.errorMessage && <p style={{ color: '#fb3e93' }}>{this.state.errorMessage}</p>}
            <div className={styles.btnsContainer}>
              <button onClick={this.previousStep} className={styles.prevBtn}>Previous</button>
              <button onClick={this.handleClick} className={styles.nextBtn} disabled={this.state.isNextButtonDisabled}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomDetailsStep