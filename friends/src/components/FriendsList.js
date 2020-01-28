  
import React from 'react';
import { axiosWithAuth } from "../utilities/axiosAuth";

import Friend from './Friend';
import NewFriendForm from './NewFriendForm';
import Alert from './audio';
class FriendsList extends React.Component {
    state = {
        friends: []
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                console.log(res);
                this.setState({
                    friends: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    };

//post request added to add new friend to database

    addFriend = friend => {
        axiosWithAuth()
            .post('http://localhost:5000/api/friends', JSON.parse(JSON.stringify(friend)))
            .then(res => {
                this.getData();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return(
            <div>
            <Alert>
            <audio ref="audio_tag" src="./assets/FriendsThemesongwith.mp3" controls autoPlay/>
            </Alert>
                <NewFriendForm addFriend={this.addFriend} />
                {this.state.friends.map(friend => {
                    return <Friend key={friend.id} data={friend}/>
                })}
            </div>
        );
    }
}

export default FriendsList; 