var lock = configureLock();
var userProfile;


function configureLock() {
    lock = new Auth0Lock('UP3jY0e9mUkXoQTFFQjPoNTapChMAyK5', 'vsarit.auth0.com', {
        auth: {
            params: {
                scope: 'openid email'
            }
        }
    });
    return lock;
}


$('.btn-login').click(function (e) {
    e.preventDefault();
    lock.show();
});

lock.on("authenticated", function (authResult) {
    lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
            // Handle error
            return;
        }

        localStorage.setItem('id_token', authResult.idToken);

        // Display user information
        $('.nickname').text(profile.nickname);
        $('.avatar').attr('src', profile.picture);
    });
});