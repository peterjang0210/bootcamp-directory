import React from "react";
import SideNav from "./SideNav/SideNav";
import PostView from "./MainView/PostView/PostView";
import ProfileView from "./MainView/ProfileView/ProfileView";
import * as $ from "axios";


class AppPage extends React.Component {
    state = {
        profiles: [],
        activeProfile: {},
        userProfile: {},
        viewPosts: true,
        userId: localStorage.getItem("userId"),
        cohortId: localStorage.getItem("cohortId"),
        accessToken: localStorage.getItem("token"),
        // userId: "5c86a8ea9b7bc3bc21709df8",
        // cohortId: "GTATL201901",
        // accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzg2YThlYTliN2JjM2JjMjE3MDlkZjgiLCJjb2hvcnRJZCI6IkdUQVRMMjAxOTAxIiwiaWF0IjoxNTUyMzYxMTI4LCJleHAiOjE1NTIzNzE5Mjh9.0RTSDkEL9FCJGgbNxRR2vpgktpLKbB-ySYtLXBVTl_k",
        canEdit: true
    }

    componentDidMount() {
        this.getProfiles();
    }

    getProfiles = () => {
        $({
            url: `/api/users/${this.state.userId}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + this.state.accessToken }
        }).then((userProfile) => {
            this.setState({
                userProfile: userProfile.data,
            });
            })
        $({
            url: '/api/profiles',
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + this.state.accessToken }
        })
            .then((getProfilesResponse) => {
                const allProfiles = getProfilesResponse.data;
                this.setState({
                    profiles: allProfiles,
                    activeProfile: this.state.userProfile,
                    canEdit: false
                })
            })
    }

    handleContactClick = (contactId, e) => {
        e.preventDefault();
        const activeContactId = contactId;
        const activeProfile = this.state.profiles.find((profile) => {
            return profile._id === activeContactId
        })
        this.setState({
            viewPosts: false,
            activeProfile: activeProfile,
            canEdit: false
        })
        // toggle css class of selected contact to indicate active status
    }
    handleUserContactClick = (e) => {
        e.preventDefault();
        this.setState({
            viewPosts: false,
            activeProfile: this.state.userProfile,
            canEdit: true
        })
        // toggle css class of selected contact to indicate active status
    }
    handleCloseProfile = (e) => {
        e.preventDefault();
        this.setState({
            viewPosts: true,
            activeProfile: {},
            canEdit: false

        })
    }

    handleUserProfileSave = () => {
        this.getProfiles();
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-4">
                        <SideNav
                            cohortId={this.state.cohortId}
                            profiles={this.state.profiles}
                            userProfile={this.state.userProfile}
                            handleUserContactClick={this.handleUserContactClick}
                            handleContactClick={this.handleContactClick} />
                    </div>
                    <div className='col-8' >
                        {this.state.viewPosts
                            ? <PostView
                                userId={this.state.userId}
                                cohortId={this.state.cohortId}
                                accessToken={this.state.accessToken} />
                            : <ProfileView
                                handleCloseProfile={this.handleCloseProfile}
                                userId={this.state.userId}
                                accessToken={this.state.accessToken}
                                editable={this.state.canEdit}
                                profile={this.state.activeProfile}
                                save={this.handleUserProfileSave} />
                        }
                    </div>
                </div>
                <footer className="footer">Copyright <i className="far fa-copyright"></i></footer>
            </div>
        )
    }
}

export default AppPage;