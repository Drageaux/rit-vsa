$(document).ready(function () {
    getMembersAjax();
});


function getMembersAjax() {
    $.ajax({
        url: "custom/js/members.json",
        dataType: "json",
        success: function (members) {
            console.log(members);

            html = "";
            $.each(members, function (index, mem) {
                htmlMember =
                    '<div class="card">' +
                    '<div class="image">' +
                    '<img src="' + mem.avatar + '" alt="' + mem.name + '">' +
                    '</div>' +
                    '<div class = "content">' +
                    '<div class="header member-name">' +
                    mem.name +
                    '</div>' +
                    '<div class="meta">' +
                    '<div class= "member-major">' +
                    mem.major +
                    '</div>' +
                    '</div>' +
                    '<div class="description member-bio">' +
                    mem.bio +
                    '</div>' +
                    '</div>' +
                    '<div class= "extra content">' +
                    '<span class= "right floated member-year-joined">' +
                    'Joined in ' + mem.year_joined +
                    '</span>' +
                    '</div>' +
                    '</div>';
                html += htmlMember;
            });

            $("#members .ui.cards").append(html);
        }
    });
}