$(function () {
    /*Navbar choices*/
    $("#pageAI").click(function () {
        $(".chatAI").removeClass("hide");
        $(".chatLive").addClass("hide");
        $(".chatListen").addClass("hide");
    });

    $("#pageVent").click(function () {
        $(".chatAI").addClass("hide");
        $(".chatLive").removeClass("hide");
        $(".chatListen").addClass("hide");

        if (!$("#pageVent").hasClass('chatCreated')) {
            $("#newLiveChatModal").modal("show");
        }
    });

    $("#pageListen").click(function () {
        $(".chatAI").addClass("hide");
        $(".chatLive").addClass("hide");
        $(".chatListen").removeClass("hide");
    });

    /*Send Buttons*/
    $("#messageButton").click(function () {
        sendAIMessage();
        $("#messageInput").val('');
        setTimeout(function () {
            sendAIMessage("Oh no! Tell me more.");
        }, 1500);
    });

    $("#messageVentButton").click(function () {
        sendLiveChatMessage();
        $("#messageVentInput").val('');
    });

    /*New Topic Button*/
    $("#newTopicButton").click(function () {
        editTopic();
    });

    /*New Live Chat Button*/
    $("#newLiveChatButton").click(function () {
        newLiveChat();
    });
});

/*
 *Message Alternating Side for AI
 *Parameter for message text
 *If parameter is null or undefined, uses message box
*/
function sendAIMessage(msg) {
    var message = '<li class="speech-bubble"></li>';
    var input;
    var side = 'speechRight';

    if (msg == undefined)
        input = $('#messageInput').val();
    else
        input = msg;

    if (input !== '') {
        if ($(".messages li:last-child").hasClass("speechRight")) {
            side = 'speechLeft';
        }
        $(".messages").append(message);
        $(".messages li:last-child").text(input);
        $(".messages li:last-child").addClass(side);
        $(".messages").scrollTop($(".messages")[0].scrollHeight);
    }
    $('#messageInput').focus();
};

/*
 *Message with only left speech bubbles for live chat
 *Parameter for message text
 *If parameter is null or undefined, uses message box
 */
function sendLiveChatMessage(msg) {
    var message = '<li class="speech-bubble"></li>';
    var input;
    var side = 'speechLeft';

    if (msg == undefined)
        input = $('#messageVentInput').val();
    else
        input = msg;

    if (input !== '') {
        $(".messagesVent").append(message);
        $(".messagesVent li:last-child").text(input);
        $(".messagesVent li:last-child").addClass(side);
        $(".messagesVent").scrollTop($(".messagesVent")[0].scrollHeight);
    }
    $('#messageVentInput').focus();
};

/*
 *Edit Live topic 
 *Parameter for new topic
 *If paramter is null or undefined, uses edit topic modal
 */
function editTopic(msg) {
    var input;

    if (msg == undefined)
        input = $("#editTopicInput").val();
    else
        input = msg;

    if (input !== '') {
        $("#ventTopic").text(input);
        $("#editTopicModal").modal('hide');
        $("#editTopicInput").val('');
    }
};

/*Set topic and initial message*/
function newLiveChat() {
    var topic = $("#newLiveChatTopic").val();
    var body = $("#newLiveChatBody").val();
    var message = '<li class="speech-bubble"></li>';
    var side = 'speechLeft';

    if (topic !== '' && body !== '') {
        editTopic(topic);
        sendLiveChatMessage(body);

        $("#newLiveChatModal").modal('hide');
        $("#pageVent").addClass('chatCreated');
    }
};