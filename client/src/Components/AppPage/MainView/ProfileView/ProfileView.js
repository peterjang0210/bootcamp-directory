import React from 'react';
import UserProfile from "./UserProfile";
import Profile from "./Profile";

const ProfileView = (props) => (
    <div className="bounce-in-top">
        {props.editable
            ? <UserProfile 
                handleCloseProfile={props.handleCloseProfile}
                userId={props.userId} 
                accessToken={props.accessToken}
                save={props.save}/> 
            : <Profile 
                handleCloseProfile={props.handleCloseProfile}
                profile={props.profile}/>}
    </div>
)

export default ProfileView;