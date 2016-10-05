$(document).ready(function () {
    getMembersAjax();
});


function getMembersAjax() {
    $.get({
        url: "user/all",
        dataType: "json",
        success: function (members) {
            console.log(members);

            html = "";
            $.each(members, function (index, mem) {
                htmlMember =
                    '<div class="card">' +
                    '   <div class="image">' +
                    '       <img src="' + mem.avatar + '" alt="' + mem.name + '">' +
                    '   </div>' +
                    '   <div class = "content">' +
                    '       <div class="header member-name">' +
                    mem.name +
                    '       </div>' +
                    '       <div class="meta">' +
                    '           <div>' +
                    mem.role + '<br>' + mem.major +
                    '           </div>' +
                    '       </div>' +
                    '       <div class="description member-bio">' +
                    mem.bio +
                    '       </div>' +
                    '   </div>';
                htmlMember +=
                    '   <div class= "extra content">' +
                    '       <span class= "right floated member-year-joined">';
                htmlMember += mem.year_joined ? 'Joined in ' + mem.year_joined : '';
                htmlMember +=
                    '       </span>' +
                    '   </div>' +
                    '</div>';
                html += htmlMember;
            });

            $("#members .ui.cards").append(html);
        }
    });
}

function editModal() {
    $('.ui.modal#profile-modal')
        .modal('show');
}