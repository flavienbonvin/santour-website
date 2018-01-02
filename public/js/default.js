$(document).ready(function () {
    $('.collapsible').collapsible();
});

function deleteTrack(id,e){
    e.preventDefault();
    e.stopPropagation();
}

function resetPass(){
    if(document.getElementById('username')){
        var email = document.getElementById('username').value;
        if(email.length > 5){
            window.location = '/users/resetPasswordEmail/'+email;
        }
    }
}