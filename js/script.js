var accessToken = "45d2bce3675c4dc5ac0db079f0302dba";
var baseUrl = "https://api.api.ai/v1/";

$(document).ready(function() {

	//the status of overlay box
	var isOpen = false;
	var selectedImage = null;

	function sendMessage()
	{
		var message = $("#message-box").val();
		console.log("the msg is" + message);
		$("#message-box").val("");

		$("#chat_box").append('<div class="message"><img class="user-img" src="assets/ic_account_circle_black_48px.svg"><div class="msg-content"><h4 class="user-name">You</h4><p class="user-msg">' + message + '</p></div></div>');


		var replied = ""
		if (message == "hi"){
			replied = "hey, how are you?";
		} else if (message.includes("good")) {
			replied = "good to hear that";
		}
		else {
			replied = "I will see what i can do";
		}

		// AI gets error if msg is empty
		if (message!='')
		{
			sendToAI(message);
		}

		// removed below b/c sendToAi no makes the textbox response.
		//$("#chat_box").append('<div class="message"> <img class="dogPFP user-img animated zoomIn" src="http://img15.deviantart.net/257d/i/2013/276/4/a/lovin_oven_dog_by_mannydragon5-d6p3i1h.png"><div class="msg-content"><h4 class="user-name">Dog</h4><p class="user-msg">' + replied + '</p></div></div>');

		$("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
	}

	//function to display the box
	function showOverlayBox()
	{
	    //if box is not set to open then don't do anything
	    if(isOpen == false)
		{
			return;
		}

	    // set the properties of the overlay box, the left and top positions
	    $('.overlayBox').css(
	    {
	        display:'block',
	        left:($(window).width() - $('.overlayBox').width())/2,
	        top:($(window).height() - $('.overlayBox').height())/2 - 20,
	        position:'absolute'
	    });

	    // set the window background for the overlay. i.e the body becomes darker
	    $('.bgCover').css(
	    {
	        display:'block',
	        width: $(window).width(),
	        height:$(window).height(),
	    });
	}

	function doOverlayOpen()
	{
	    //set status to open
	    isOpen = true;
	    showOverlayBox();
	    $('.bgCover').css({opacity:0}).animate({opacity:0.5, backgroundColor:'#000'});

	    // dont follow the link : so return false.
	    return false;
	}

	function doOverlayClose()
	{
		resetOverlay();

	    //set status to closed
	    isOpen = false;
	    $('.overlayBox').css( 'display', 'none' );

	    // now animate the background to fade out to opacity 0
	    // and then hide it after the animation is complete.
	    $('.bgCover').animate( {opacity:0}, null, null, function() {$(this).hide();});
	}

	function sendToAI(userMsg)
	{
		var text = userMsg;
		var response;
		$.ajax({
			type: "POST",
			url: baseUrl + "query?v=20150910",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			//data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
			data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

			success: function(data) {
				//setResponse(JSON.stringify(data, undefined, 2));
				response = JSON.stringify(data, undefined, 2);
				console.log(JSON.stringify(data, undefined, 2));
				var inBetween;
				//inBetween = JSON.parse(data.result.fulfillment.speech);
				console.log(JSON.stringify(data.result.fulfillment.speech));
				//response = JSON.stringify(data.result.fulfillment.speech);
				//response = JSON.stringify(JSON.parse(data.result.fulfillment.speech));
				//resposne = JSON.parse(data);
				//inBetween = JSON.parse(data);
				//console.log(inBetween.result);

				response = JSON.stringify(data.result.fulfillment.speech);
				//response = JSON.parse(JSON.stringify(data.result.fulfillment.speech));
				//console.log("response " + JSON.stringify(response));
				//response = JSON.stringify(response);
				$("#chat_box").append('<div class="message"> <img class="dogPFP user-img animated zoomIn" src="http://img15.deviantart.net/257d/i/2013/276/4/a/lovin_oven_dog_by_mannydragon5-d6p3i1h.png"><div class="msg-content"><h4 class="user-name">Dog</h4><p class="user-msg">' + response + '</p></div></div>');
			},
			error: function() {
				//setResponse("Internal Server Error");
				$("#chat_box").append('<div class="message"> <img class="dogPFP user-img animated zoomIn" src="http://img15.deviantart.net/257d/i/2013/276/4/a/lovin_oven_dog_by_mannydragon5-d6p3i1h.png"><div class="msg-content"><h4 class="user-name">Dog</h4><p class="user-msg">' + "Internal Server Error" + '</p></div></div>');
			}
		});
		//setResponse("Loading...");
		console.log("reached here!");
	}

	// if window is resized then reposition the overlay box
	$(window).bind('resize',showOverlayBox);

	// activate when the link with class upload-btn is clicked
	$('#upload-btn').click(doOverlayOpen);

	// close it when closeLink is clicked
	$('#overlay-close-btn').click(doOverlayClose);

	$("#send-btn").click(sendMessage);

	$('#overlay-upload-area').on('click', '#cancel-upload-btn', function(){
    	resetOverlay();
	});

	$('#overlay-upload-area').on('click', '#confirm-upload-btn', function(){
		uploadPicture();
    	resetOverlay();
    	doOverlayClose();
	});
});
