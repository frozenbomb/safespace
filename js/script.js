$(document).ready(function() {

	var users = [
		{
			firstname: 'markus',
			lastname: 'smith',
			username: 'mark',
			email: 'test@test.com',
			password: '123',
			userpicture: '',

		},
		{
			firstname: 'john',
			lastname: 'henry',
			username: 'joe',
			email: 'test1@test.com',
			password: '123',
			userpicture: '',

		},
		{
			firstname: 'andrea',
			lastname: 'bunt',
			username: 'andy',
			email: 'test2@test.com',
			password: '123',
			userpicture: '',

		},

	];

	//add member
	$(".addmember-form").submit(function(event) {
		console.log($this.serializeArray());
	});

	//Sign up
	$("#sign-up").submit(function(event) {
		var success = false;
		var data = $(this).serializeArray();
		var newUser = {
			firstname: data[0].value,
			lastname: data[1].value,
			username: data[2].value,
			email: data[3].value,
			password: data[4].value,
			userpicture: ''
		}
		users.push(newUser);
		window.location.href = 'groups.html';
		event.preventDefault();
	});

	//Login validation
	$( ".signin-form" ).submit(function( event ) {
		var success = false;
		var data = $( this ).serializeArray();
  		for (var i=0; i<users.length; i++) {
  			if (users[i].email == data[0].value && users[i].password == data[1].value) {
  				success = true;
  			}
  		}
  		if (success) {
  			window.location.href = 'groups.html';
  		} else {
  			$('#loginerr').removeClass("hidden");
  		}
  		event.preventDefault();
	});

	//the status of overlay box
	var isOpen = false;
	var selectedImage = null;

	function sendMessage()
	{
		var message = $("#message-box").val();
		$("#message-box").val("");

		$("#chat_box").append('<div class="message"><img class="user-img" src="assets/ic_account_circle_black_48px.svg"><div class="msg-content"><h4 class="user-name">Dog</h4><p class="user-msg">' + message + '</p></div></div>');
		var replied = ""
		if (message == "hi"){
			replied = "hey, how are you?";
		} else if (message.includes("good")) {
			replied = "good to hear that";
		}
		else {
			replied = "I will see what i can do";
		}
		$("#chat_box").append('<div class="message"> <img class="dogPFP user-img animated zoomIn" src="http://img15.deviantart.net/257d/i/2013/276/4/a/lovin_oven_dog_by_mannydragon5-d6p3i1h.png"><div class="msg-content"><h4 class="user-name">Dog</h4><p class="user-msg">' + replied + '</p></div></div>');

		$("#chat_box").scrollTop($("#chat_box")[0].scrollHeight);
	}

	//function to reset box
	function resetOverlay()
	{
		$('#overlay-upload-area').html('<h3>Drag pictures here to upload to group chat.</h3><p>Alternatively, browse and select the image you want to upload.</p><input type="file" accept="image/*" id="img-selector">');
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

	// if window is resized then reposition the overlay box
	$(window).bind('resize',showOverlayBox);

	// activate when the link with class upload-btn is clicked
	$('#upload-btn').click(doOverlayOpen);

	// close it when closeLink is clicked
	$('#overlay-close-btn').click(doOverlayClose);

	$("#send-btn").click(sendMessage);

	function readURL(input)
	{
	    if(input.files && input.files[0])
	    {
	        var reader = new FileReader();

	        reader.onload = function(e)
	        {
	        	selectedImage = e.target.result;

	            $('#overlay-upload-area').html('<img src="' + selectedImage + '"></img>');
	            $("#overlay-upload-area").append("<h3>Are you sure you want to upload this picture?</h3>");
	            $('#overlay-upload-area').append('<div id="upload-buttons"><button class="btn btn-success btn-lg btn-block" id="confirm-upload-btn">Yes</button><button class="btn btn-danger btn-lg btn-block" id="cancel-upload-btn">No</button></div>');
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$('#overlay-upload-area').on('change', '#img-selector', function(){
	    readURL(this);
	});

	$('#overlay-upload-area').on('click', '#cancel-upload-btn', function(){
    	resetOverlay();
	});

	$('#overlay-upload-area').on('click', '#confirm-upload-btn', function(){
		uploadPicture();
    	resetOverlay();
    	doOverlayClose();
	});

	$('.overlayBox').on({
		'dragover dragenter': function(e)
		{
	        e.preventDefault();
	        e.stopPropagation();
	    },
	    'drop': function(e)
	    {
	    	var dataTransfer = e.originalEvent.dataTransfer;

	        if(dataTransfer && dataTransfer.files.length)
	        {
	            e.preventDefault();
	            e.stopPropagation();

              	var reader = new FileReader();

	           	reader.onload = function(e)
		        {
		        	selectedImage = e.target.result;

		            $('#overlay-upload-area').html('<img src="' + selectedImage + '"></img>');
		            $("#overlay-upload-area").append("<h3>Are you sure you want to upload this picture?</h3>");
		            $('#overlay-upload-area').append('<div id="upload-buttons"><button class="btn btn-success btn-lg btn-block" id="confirm-upload-btn">Yes</button><button class="btn btn-danger btn-lg btn-block" id="cancel-upload-btn">No</button></div>');
		        }

		        reader.readAsDataURL(dataTransfer.files[0]);
	    	}
		}
		//$(".user-img").addClass("animated bounce");
	});
});
