function getTrackDetails(id) {
    window.location = 'tracks/' + id;
}

function getUserDetails(id) {
    window.location = 'users/user=' + id;
}

function unlockUserEditMode() {
    $("#usertype").removeAttr("disabled");
    $('select').material_select();
    $('#newpassword-input').show();
    $('#confirmpassword-input').show();
    $('#user-edit-off-button').show();
    $('#user-edit-save-button').show();
    $('#user-edit-on-button').hide();

}

function lockUserEditMode() {
    $("#usertype").prop("disabled", "disabled");
    $('select').material_select();
    $('#newpassword-input').hide();
    $('#confirmpassword-input').hide();
    $('#user-edit-off-button').hide();
    $('#user-edit-save-button').hide();
    $('#user-edit-on-button').show();
    $("#usertype").attr('disabled', 'disabled');
}

function newUserMode() {
    window.location = 'users/add';
}

function editDiff(id) {
    var txt = document.getElementById('diff' + id).innerHTML;
    if(txt.indexOf("<input")!=-1){
        return;
    }
    var inp = '<input type="text" value="' + txt + '" id="textToEdit" onblur="updateDiff(\'' + id + '\')"/>';
    document.getElementById('diff' + id).innerHTML = inp;
    document.getElementById("textToEdit").focus();
}

function updateDiff(id) {
    var name = document.getElementById('textToEdit').value;
    $.ajax({
        url: '/admin/difficulties/update/' + id,
        type: 'POST',
        data: { name: name },
        success: function (res) {
            document.getElementById('textToEdit').parentNode.innerHTML = name;
        }
    })
}

function editCat(id) {
    var txt = document.getElementById('cat' + id).innerHTML;
    if(txt.indexOf("<input")!=-1){
        return;
    }
    var inp = '<input type="text" value="' + txt + '" id="textToEdit" onblur="updateCat(\'' + id + '\')"/>';
    document.getElementById('cat' + id).innerHTML = inp;
    document.getElementById("textToEdit").focus();
}

function updateCat(id) {
    var name = document.getElementById('textToEdit').value;
    $.ajax({
        url: '/admin/categories/update/' + id,
        type: 'POST',
        data: { name: name },
        success: function (res) {
            document.getElementById('textToEdit').parentNode.innerHTML = name;
        }
    })
}