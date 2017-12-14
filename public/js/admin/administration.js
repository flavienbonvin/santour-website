function getTrackDetails(id) {
    window.location = 'tracks/track='+id;
}

function getUserDetails(id) {
    window.location = 'users/user='+id;
}

function unlockUserEditMode() {
    $('#newpassword-input').show();
    $('#confirmpassword-input').show();
    $('#user-edit-off-button').show();
    $('#user-edit-save-button').show();
    $('#user-edit-on-button').hide();
}

function lockUserEditMode() {
    $('#newpassword-input').hide();
    $('#confirmpassword-input').hide();
    $('#user-edit-off-button').hide();
    $('#user-edit-save-button').hide();
    $('#user-edit-on-button').show();
}