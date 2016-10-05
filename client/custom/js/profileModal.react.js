var ProfileModal = React.createClass({
    getInitialState: function () {
        return {user: null, email: JSON.parse(localStorage.getItem("profile")).email};
    },
    componentDidMount: function () {
        $.get({
            url: "user/byEmail/" + this.state.email,
            dataType: "json",
            success: function (user) {
                console.log(user);
                this.setState({user: user});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("user/byEmail/" + email, status, err.toString());
            }.bind(this)
        })
    },
    render: function () {
        return (
            <div className="ui modal" id="profile-modal">
                <i className="close icon"></i>
                <div className="header">
                    Update Profile
                </div>
                <div className="image content">
                    <div className="ui medium image">
                        //Avatar and Upload button
                        <img src={this.state.user.avatar}/>
                    </div>
                    <div className="description">
                        <div className="ui header">We've auto-chosen a profile image for you. Please update your own!
                        </div>
                        //Form to edit info
                    </div>
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Cancel
                    </div>
                    <div className="ui positive right labeled icon button">
                        //TODO: bind click event
                        Save
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <ProfileModal />,
    document.getElementById("profile-modal-react")
);