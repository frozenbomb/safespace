$(function () {
    $('#chatLiveModal').modal({show:true, backdrop: 'static', keyboard: false});

    $('#chatLiveModalBtn').click(function () {
        newLiveChat();
    });

    $('#chatLiveSendMsg').click(function () {
        updateCloudText();
        $("#chatLiveMsgInput").val('');
    });

    /*New Topic Button*/
    $("#newTopicButton").click(function () {
        editTopic();
    });

    // move emoji code by Glenn
    $('.emoji_area')
   .find('.emojis')
   .animate({
         top: 60
      },
      'slow'
   );
});

/*Set topic and initial message*/
function newLiveChat() {
    var topic = $("#inputChatTopic").val();
    var body = $("#inputChatMsg").val();

    if (topic !== '' && body !== '') {
        $('#chatLiveTopic').text(topic);
        $('#chatLiveMsg').text(body);
        $("#cloudModalBody").text(body);

        $("#chatLiveModal").modal('hide');
    }
};

/*Update Cloud from Message Box */
function updateCloudText() {
    var updatedText = $("#chatLiveMsgInput").val();

    if (updatedText !== '')
    {
        $("#chatLiveMsg").text(updatedText);
        $("#cloudModalBody").text(updatedText);
    }
};

/* Edit Topic from modal*/
function editTopic() {
    var input = $("#editTopicInput").val();

    if (input !== '') {
        $("#chatLiveTopic").text(input);
        $("#editTopicModal").modal('hide');
        $("#editTopicInput").val('');
    }
};