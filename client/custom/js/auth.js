var lock = configureLock();
var user;

$(document).ready(function () {
    user = getUser();
});



function getUser() {
    var id_token = localStorage.getItem('id_token');

    if (null != id_token) {
        lock.getProfile(id_token, function (err, profile) {
            if (err) {
                // remove expired token (if any) from localStorage
                localStorage.removeItem('id_token');
                console.log('There was an error getting the profile: ' + err.message);
                displayAuthButtons(null);
                return null;
            } else {
                // user is authenticated
                $.post({
                    url: "user",
                    data: profile,
                    dataType: "json",
                    success: function (user) {
                        console.log(user);
                        displayAuthButtons(user);
                        return user;
                    }
                });
            }
        });
    } else {
        displayAuthButtons(null);
        return null;
    }
}

function displayAuthButtons(user) {
    var html = "";

    if (user != null) {
        html += '<li><a class="username" onclick="editModal()">' + user.nickname + '</a></li>';
        html += '<li><a class="btn-logout" onclick="logout()"><i class="sign out icon"></i>Log Out</a></li>';
        console.log(html);
        $("#auth-buttons").html(html);
    } else {
        html = '<li><a class="btn-login" href="#" onclick="login()">Join Us / Login</a></li>';
        $("#auth-buttons").html(html);
    }
}

function login() {
    lock.show();
}

function logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.href = "http://localhost:3000";
    displayAuthButtons(user);
    // TODO: Display some message
}


/** Listeners **/
lock.on("authenticated", function (authResult) {
    lock.getProfile(authResult.idToken, function (err, profile) {
        if (err) {
            // Remove expired token (if any)
            localStorage.removeItem('id_token');
            // Remove expired profile (if any)
            localStorage.removeItem('profile');
            return alert('There was an error getting the profile: ' + err.message);
        } else {
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
            $.post({
                url: "user",
                data: profile,
                dataType: "json",
                success: function (newUser) {
                    console.log(newUser);
                    displayAuthButtons(newUser);
                },
                fail: function () {
                    displayAuthButtons(null);
                }
            });

        }
    });
});


/** Settings **/
function configureLock() {
    lock = new Auth0Lock('UP3jY0e9mUkXoQTFFQjPoNTapChMAyK5', 'vsarit.auth0.com', {
        auth: {
            params: {
                scope: 'openid email'
            }
        },
        languageDictionary: {
            emailInputPlaceholder: "RIT Emails only",
            title: "Welcome to RIT VSA!"
        },
        theme: {
            logo: 'custom/img/vsa-logo.jpg',
            primaryColor: '#25BDB1'
        }
    });
    return lock;
}