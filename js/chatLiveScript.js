$(function () {
    $('#chatLiveModal').modal({show:true, backdrop: 'static', keyboard: false});

    $('#chatLiveModalBtn').click(function () {
        newLiveChat();
        heartInterval();
    });

    $('#chatLiveSendMsg').click(function () {
        updateCloudText();
        //createHearts();
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
         top: 0,
         left: 150
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

var heartCounter = 0;

function createHearts(){
    var imgDestination = document.getElementById("emoji-area");

    //single emoji attempt

    /*
    var imgAdded = document.createElement("img");
    imgAdded.src = "https://imgur.com/a6FwBWM.png";
    imgAdded.height="42" 
    imgAdded.width="42"
    imgDestination.appendChild(imgAdded);
    heartInitialPosition(imgAdded);
    */

    //Loop attempt code
    var numHearts = getRandomInt(3,7)

    for (i = 0; i < numHearts; i++)
    {
        var loopImg = document.createElement("img");
        loopImg.src = "https://imgur.com/HZyVCQY.png";
        loopImg.height=42;
        loopImg.width=42;
        //loopImg.addEventListener('click', popHeart1(currID));
        //loopImg.addEventListener('click', function(){ popBubble(currID)});
        loopImg.addEventListener('click', function(){ popBubble(this)});
        //loopImg.onclick=popBubble(currID);
        imgDestination.appendChild(loopImg);
        heartInitialPosition(loopImg);

        heartCounter++;
        var currID = "heartLoop" + heartCounter;
        console.log(currID);
        loopImg.setAttribute("id", currID);

        //below not working
        /*
        $('.emoji_area')
        .find(currID)
        .animate({
         top: 30,
         left: 200
        },
        'slow'
        );
        */

        //jQuery("#heartLoop1").addClass("animated shake"); //works
        //jQuery("#"+currID).addClass("animated shake");
        //jQuery("#heart1").animate({top:100, left:0}); // not works
        //jQuery('#my_div').myfunction(currID); //works
        //jQuery("#heart1").addClass("animated shake"); //works

        /*
        jQuery('.emoji_area') // works
        .find('.emojis')
        .animate({
         top: 0,
         left: 0
        },
        'slow'
        );
        */

        jQuery('.emoji_area') // WORKS!!!!
        .find("#"+currID)
        .animate({
         top: getRandomInt(0,250)
        },
        'slow'
        );


    }
};


function heartInitialPosition(imgAdded){
    var imagestyle = imgAdded.style;
    imagestyle.position = "absolute";
    var xx = getRandomInt(0, window.innerWidth) +"px";
    //imagestyle.left = "350px";
    imagestyle.left = xx;
    imagestyle.top = "1000px"; //starting from very bottom
    //imagestyle.top = "350px";
}

function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
}

function popHeart1(word)
{
    //document.getElementById("heart1").classList.add("emoji_area");
    jQuery('#heart1').addClass('animated zoomOut');
    console.log(word);
}

function popBubble(popID)
{
    jQuery(popID).addClass('animated zoomOut');
}

function heartInterval()
{
    var intervalLength = getRandomInt(3000,6000)
    setInterval(createHearts,intervalLength);
}

(function( $ ){
   $.fn.myfunction = function(word) {
      alert(word); //working
      $(word).animate({top:30, left:200}); //not working
      return this;
   }; 
})( jQuery );