import React from "react";
import styles from "../../modules/MemoryGame.module.css";

import {
  av1,
  av2,
  av3,
  av4,
  av5,
  av6,
  av7,
  av8,
  av9,
  av10,
  av11,
  av12,
  av13,
} from "../../imports";

import {
  Bird,
  Crab,
  Dragon,
  Friends,
  Pharaoh,
  Pizza,
  Plane,
  Robot,
  Sloth,
  Soccer
} from "../../imports"

class UserDetailsStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          errorMessage: '',
          isNextButtonDisabled: true,
          selectedAvatar: '',
        };
    }
    
    handleAvatarSelect = (avatarName) => {    
      this.setState({ 
        selectedAvatar: avatarName,
      }, () => {
        this.setState({
          isNextButtonDisabled: !this.state.selectedAvatar || !this.state.username ? true : false
        });
      });
    }
    
    validateInput = (event) => {
      const { value } = event.target;
      const regex = /^[a-zA-Z0-9 _-]*$/;
    
      if (regex.test(value)) {
        this.setState({
          username: value,
          errorMessage: '',
        }, () => {
          this.setState({
            isNextButtonDisabled: !this.state.selectedAvatar || !this.state.username ? true : false
          });
        });
    
      } else {
    
        this.setState({
          errorMessage: 'Only normal characters, numbers, underscores(_) and dashes(-) are allowed!',
          isNextButtonDisabled: true
        });
      }
    };

    handleClick = () => {
      
      if (this.props.ws && this.state.selectedAvatar !== '' && this.state.username !== '') {
                
        const current_player = {
          user_name: this.state.username,
          avatar: this.state.selectedAvatar,
          points: 0,
          cards:this.shuffleArray([
            { name: 'Bird', imageUrl: Bird, flipped: false},
            { name: 'Crab', imageUrl: Crab, flipped: false},
            { name: 'Dragon', imageUrl: Dragon, flipped: false },
            { name: 'Friends', imageUrl: Friends, flipped: false },
            { name: 'Pharaoh', imageUrl: Pharaoh, flipped: false },
            { name: 'Pizza', imageUrl: Pizza, flipped: false },
            { name: 'Plane', imageUrl: Plane, flipped: false },
            { name: 'Robot', imageUrl: Robot, flipped: false },
            { name: 'Sloth', imageUrl: Sloth, flipped: false },
            { name: 'Soccer', imageUrl: Soccer, flipped: false },
            { name: 'Bird', imageUrl: Bird, flipped: false},
            { name: 'Crab', imageUrl: Crab, flipped: false},
            { name: 'Dragon', imageUrl: Dragon, flipped: false },
            { name: 'Friends', imageUrl: Friends, flipped: false },
            { name: 'Pharaoh', imageUrl: Pharaoh, flipped: false },
            { name: 'Pizza', imageUrl: Pizza, flipped: false },
            { name: 'Plane', imageUrl: Plane, flipped: false },
            { name: 'Robot', imageUrl: Robot, flipped: false },
            { name: 'Sloth', imageUrl: Sloth, flipped: false },
            { name: 'Soccer', imageUrl: Soccer, flipped: false },
          ])
        }

        const update = "Player " + current_player.user_name + " has joined the room."

        this.props.ws.send(
          JSON.stringify(
            { 
              "event":"player-joined", 
              "update":update, 
              "player": current_player
            }
          )
        );

        this.props.setMainPlayer(current_player);
      }
      
      this.props.nextStep();
    }

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    render() {
        const avatars = [
        { id: 1, name: 'Avatar 1', imageUrl: av1 },
        { id: 2, name: 'Avatar 2', imageUrl: av2 },
        { id: 3, name: 'Avatar 3', imageUrl: av3 },
        { id: 4, name: 'Avatar 4', imageUrl: av4 },
        { id: 5, name: 'Avatar 5', imageUrl: av5 },
        { id: 6, name: 'Avatar 6', imageUrl: av6 },
        { id: 7, name: 'Avatar 7', imageUrl: av7 },
        { id: 8, name: 'Avatar 8', imageUrl: av8 },
        { id: 9, name: 'Avatar 9', imageUrl: av9 },
        { id: 10, name: 'Avatar 10', imageUrl: av10 },
        { id: 11, name: 'Avatar 11', imageUrl: av11 },
        { id: 12, name: 'Avatar 12', imageUrl: av12 },
        { id: 13, name: 'Avatar 13', imageUrl: av13 },
        ];
    
        return (
        <div className={styles.step}>
            <h2>Step 3: Provide your username and choose your avatar</h2>
            <div className={styles.formContainer}> 
                <span>Your username:</span>
                <input
                  type="text"
                  onChange={this.validateInput}
                />
            </div>
            {this.state.errorMessage && <p style={{ color: 'red' }}>{this.state.errorMessage}</p>}
    
            
            <div className={styles.avatarsInput}>
                <p>Choose an avatar:</p>
                <div className={styles.avatars}>
                    {avatars.map((avatar) => (
                        <div className={this.state.selectedAvatar === avatar.imageUrl ? styles.avatarSelected : styles.avatar } key={avatar.id} 
                            onClick={() => this.handleAvatarSelect(avatar.imageUrl)}
                            >
                            <img src={avatar.imageUrl} alt={avatar.name} />
                        </div>
                    ))}
                </div>
            </div>
    
            <div className={styles.btnsContainer}>
                <button onClick={this.props.previousStep} className={styles.prevBtn}>Previous</button>
                <button onClick={this.handleClick} className={styles.nextBtn} disabled={this.state.isNextButtonDisabled}>Ready!</button>
            </div>
        </div>
        );
    }
}

export default UserDetailsStep