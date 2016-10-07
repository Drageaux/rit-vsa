var ProfileCard = React.createClass({
    render(){
        return (
            <div className="ui card">
                <div className="image">
                    <img src={this.props.member.avatar} alt={this.props.member.name}/>
                </div>
                <div className="content">
                    <div className="header member-name">
                        {this.props.member.name}
                    </div>
                    <div className="meta">
                        <div>
                            {this.props.member.role} <br/> {this.props.member.major}
                        </div>
                    </div>
                    <div className="description member-bio">
                        {this.props.member.bio}
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated member-year-joined">
                        {this.props.member.year_joined > 0 && this.props.member.year_joined != null ?
                        'Joined in ' + this.props.member.year_joined : ''}
                    </span>
                </div>
            </div>
        )
    }
});

var ProfileList = React.createClass({
    getInitialState: function () {
        return {members: []};
    },
    componentDidMount: function () {
        $.get({
            url: "user/all",
            dataType: "json",
            success: function (members) {
                this.setState({members: members});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("user/all", status, err.toString());
            }.bind(this)
        })
    },
    handleProfileUpdate: function () {
        $.get({
            url: "user/all",
            dataType: "json",
            success: function (members) {
                this.setState({members: members});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("user/all", status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="ui cards">
                {this.state.members.map((member) => (
                    <ProfileCard key={member.name} member={member}/>
                ))}
                <ProfileModal onProfileUpdate={this.handleProfileUpdate}/>
            </div>
        )
    }
});
ReactDOM.render(
    <ProfileList/>,
    document.getElementById("members-list")
);

