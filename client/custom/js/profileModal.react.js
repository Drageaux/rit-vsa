var ProfileForm = React.createClass({
    getInitialState: function () {
        return {name: "", role: "", year_joined: "", major: "", bio: ""};
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.user.name,
            role: nextProps.user.role,
            year_joined: nextProps.user.year_joined,
            major: nextProps.user.major,
            bio: nextProps.user.bio
        });
    },
    handleNameChange: function (e) {
        this.setState({name: e.target.value})
    },
    handleRoleChange: function (e) {
        this.setState({role: e.target.value})
    },
    handleYearChange: function (e) {
        this.setState({year_joined: e.target.value})
    },
    handleMajorChange: function (e) {
        this.setState({major: e.target.value})
    },
    handleBioChange: function (e) {
        this.setState({bio: e.target.value})
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name ? this.state.name.trim() : this.state.name;
        console.log(name);
        var role = this.state.role ? this.state.role.trim() : this.state.role;
        var year_joined = this.state.year_joined ? this.state.year_joined.trim() : this.state.year_joined;
        var major = this.state.major ? this.state.major.trim() : this.state.major;
        var bio = this.state.bio ? this.state.bio.trim() : this.state.bio;

        this.props.onFormSubmit({
            name: name,
            role: role,
            year_joined: year_joined,
            major: major,
            bio: bio
        });
        this.setState({name: "", role: "", year_joined: "", major: "", bio: ""});
    },
    render: function () {
        return (
            <div className="profile-form ui form">
                <div className="field">
                    <label>Full Name</label>
                    <input type="text"
                           placeholder="Public display name"
                           value={this.state.name || ""}
                           onChange={this.handleNameChange}/>
                </div>
                <div className="field">
                    <label>Role</label>
                    <input type="text"
                           placeholder="Your role in VSA"
                           value={this.state.role || ""}
                           onChange={this.handleRoleChange}/>
                </div>
                <div className="field">
                    <label>Year Joined</label>
                    <input type="text"
                           placeholder="When did you join VSA?"
                           value={this.state.year_joined || ""}
                           onChange={this.handleYearChange}/>
                </div>
                <div className="field">
                    <label>Major</label>
                    <input type="text"
                           placeholder="Your major at RIT"
                           value={this.state.major || ""}
                           onChange={this.handleMajorChange}/>
                </div>
                <div className="field">
                    <label>Bio</label>
                    <input type="text"
                           placeholder="Short description about you"
                           value={this.state.bio || ""}
                           onChange={this.handleBioChange}/>
                </div>


                <div className="ui positive right labeled icon button"
                     onClick={this.handleSubmit}>
                    Save
                    <i className="checkmark icon"></i>
                </div>
            </div>
        );
    }
});

var ProfileModal = React.createClass({
    getInitialState: function () {
        return {user: {}};
    },
    componentDidMount: function () {
        var email = JSON.parse(localStorage.getItem("profile")).email;
        $.get({
            url: "user/byEmail/" + email,
            dataType: "json",
            success: function (user) {
                this.setState({user: user});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("user/byEmail/" + email, status, err.toString());
            }.bind(this)
        })
    },
    handleFormSubmit: function (user) {
        $.post({
            url: "user",
            data: user,
            dataType: "json",
            success: function (user) {
                this.setState({user: user});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("user", status, err.toString());
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
                        //TODO: Process image and save
                        <img src={this.state.user.avatar}/>

                        <a className="file-upload ui button">
                            <span>Upload</span>
                            <input type="file" className="upload"/>
                        </a>
                    </div>
                    <div className="description">
                        <div className="ui header">
                            {this.state.user.avatar == "custom/img/avatars/steve.jpg" ?
                                "We've auto-chosen a profile image for you. Please update your own!" :
                                ""}
                        </div>
                        <ProfileForm user={this.state.user}
                                     onFormSubmit={this.handleFormSubmit}/>
                    </div>
                </div>

                <div className="actions">
                    <div className="ui black deny button">
                        Cancel
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

