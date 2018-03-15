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

var emojiCounter = 0;

function createEmojis(){
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
    var numHearts = getRandomInt(1,3)

    for (i = 0; i < numHearts; i++)
    {
        var loopImg = document.createElement("img");
        //loopImg.src = "https://imgur.com/HZyVCQY.png";
        loopImg.src = emojiRandomizer();
        loopImg.height=42;
        loopImg.width=42;
        //loopImg.addEventListener('click', popHeart1(currID));
        //loopImg.addEventListener('click', function(){ popBubble(currID)});
        loopImg.addEventListener('click', function(){ popBubble(this)});
        //loopImg.onclick=popBubble(currID);
        imgDestination.appendChild(loopImg);
        heartInitialPosition(loopImg);

        emojiCounter++;
        var currID = "heartLoop" + emojiCounter;
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
    emojiCounter--;
    console.log("emoji counter pop: "+emojiCounter);
    jQuery(popID).addClass('animated zoomOut');

}

function heartInterval()
{
    var intervalLength = getRandomInt(5000,7000)
    setInterval(createEmojis,intervalLength);
}

// note const doesn't work on old IE browser versions
const HEART_EMOJI = "https://imgur.com/HZyVCQY.png";
const CRY_EMOJI = "https://imgur.com/PRYkCj3.png";
const TEARY_EMOJI = "https://imgur.com/50K3UDr.png";
const EAR_EMOJI = "https://imgur.com/jE5sEab.png";
const TWO_HEARTS_EMOJI = "https://imgur.com/ysDnhbK.png";
const PRAY_EMOJI = "https://imgur.com/d3UgPNs.png";

var emojiArray = [HEART_EMOJI, CRY_EMOJI, TEARY_EMOJI, EAR_EMOJI, TWO_HEARTS_EMOJI, PRAY_EMOJI];

function emojiRandomizer()
{
    length = emojiArray.length;
    var currEmoji;
    var index = getRandomInt(0,length-1);
    currEmoji = emojiArray[index];
    return currEmoji;
}

(function( $ ){
   $.fn.myfunction = function(word) {
      alert(word); //working
      $(word).animate({top:30, left:200}); //not working
      return this;
   }; 
})( jQuery );