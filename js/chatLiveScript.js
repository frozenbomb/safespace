$(function () {
    $('#chatLiveModal').modal('show');

    $('#chatLiveModalBtn').click(function () {
        newLiveChat();
    });
});

/*Set topic and initial message*/
function newLiveChat() {
    var topic = $("#inputChatTopic").val();
    var body = $("#inputChatMsg").val();

    if (topic !== '' && body !== '') {
        $('#chatLiveTopic').text(topic);
        $('#chatLiveMsg').text(body);

        $("#chatLiveModal").modal('hide');
    }
};