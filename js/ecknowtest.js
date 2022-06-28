//first enter web site
$(document).ready(function () {
    jsResize()
    
})



let scanned = false;
//upload photo function
var btnUpload = $("#upload_file"),
    btnOuter = $(".uploadArea");
btnUpload.on("change", function (e) {
    var ext = btnUpload.val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
        $(".error_msg").text("Not an Image...");
    } else {
        $(".error_msg").text("");
        btnOuter.addClass("file_uploading");
        setTimeout(function () {
            btnOuter.removeClass("file_uploading");

            var files = e.target.files; //FileList object
            var output = document.getElementById("uploaded_view");

            
                var file = files[1];

                //Only pics
                if (!file.type.match('image')){
                    alert("Your file is not uploaded due to wrong format.")
                
                }
                    
                    var picReader = new FileReader();
                    picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    var zoomLength = $('.zoom').length + 1

                    var div = document.createElement("div");
                    $("#uploaded_view").append('<div class="zoom" id="zoom_' + zoomLength + '" onclick="showImg(' + zoomLength + ')"><div class="imageSet"><img src="' + picFile.result + '"/><span class="file_remove" id="file_remove_' + zoomLength + '" onclick="file_remove(' + zoomLength + ')"><i class="fa-solid fa-xmark"></i></span></div></div>').addClass("show");
                    var yyy = document.getElementById("uploaded_view").innerHTML;
                    console.log(yyy);
        


                    $('#zoom_1').click(function(){
                        if (!scanned){
                         $("#showImg_view").append('<div class="ocrloader" id="ocrloaderDiv"><p>Scanning</p><em></em><span></span></div>').class("show");
                         scanned = true;
                        }
                        alert(scanned)
                    });

                    
                    $('#ocrloaderDiv').ready(function(){
                        setTimeout(()=>{
                            $(".ocrloader").remove();

                        },2000);
                        setTimeout(()=>{

                            $("#exampleModalCenter").modal('show');
                        },2000);
                    });



                
                });
                //Read the image
                picReader.readAsDataURL(file);
            
        }, 1500);//load on server
        jsResize()
    }
});

let position = 0;
//after click photo, display photo on canvas
function showImg(zoomLength) {
    
    $("#backImage").remove();
    $('.mainImg').hide()
    var img = $('#zoom_' + zoomLength + ' img').attr('src');
    $('.tagArea').hide()
    $('.tagArea_' + zoomLength).show()


    var imgDiv = $('#img_' + zoomLength).attr('src')
    var myImg = document.querySelector('#zoom_' + zoomLength + ' img');
    var realWidth = myImg.naturalWidth;
    var realHeight = myImg.naturalHeight;

    // check canvas have src or not
    if (imgDiv) {
        // second click
        $('#mainImg_' + zoomLength).show()

    } else {
        //first click
        $("#showImg_view").append('<div class="mainImg" id="mainImg_' + zoomLength + '" value="0"><div class="removeImgBtn" id="removeImgBtn_' + zoomLength + '" onclick="removeImg(' + zoomLength + ')"><div class="iconArea"><i class="fa-solid fa-trash-can"></i></div></div><canvas data-dismiss="modal" data-toggle="modal" data-target="#exampleModalCenter5" data-backdrop="false" class="image" id="img_' + zoomLength + '" src="' + img + '"></canvas><p>Scanning</p><em><</div>').addClass("show");
    }

                      
 


   
    var canvas = document.getElementById('img_' + zoomLength);
    var context = canvas.getContext("2d");

    // set photo width and height
    canvas.setAttribute('width', realWidth);
    canvas.setAttribute('height', realHeight);

    var mapSprite = new Image();
    mapSprite.src = $('#zoom_' + zoomLength + ' img').attr('src');

    var Marker = function () {
        this.Sprite = new Image();
        this.Sprite.src = "./img/point.png"
        this.Width = 12;
        this.Height = 20;
        this.XPos = 0;
        this.YPos = 0;
    }

    var Markers = new Array();
    var mouseClicked = function (mouse) {
        // Get corrent mouse coords
        var rect = canvas.getBoundingClientRect();
        var mouseXPos = (mouse.x - rect.left);
        var mouseYPos = (mouse.y - rect.top);

        console.log("Marker added");

        // Move the marker when placed to a better location
        var marker = new Marker();
        marker.XPos = Math.round(mouseXPos - (marker.Width / 2));
        marker.YPos = Math.round(mouseYPos - marker.Height);
        var markerY = marker.YPos - 225 + "px";
        var markerX = marker.XPos - 360 + "px";
        
        
        

        $("#exampleModalCenter5").css("margin-top",markerY);
        $("#exampleModalCenter5").css("margin-left",markerX);
        

        Markers.push(marker);

        // make row id
        var tagInputLength = $('#mainImg_' + zoomLength).val()

        if (tagInputLength == "") {
            tagInputLength = 1
            console.log(tagInputLength)
        }
        $("#mainImg_" + zoomLength).val(Number(tagInputLength) + 1);


        var check = 0
        for (let i = 1; i < tagInputLength; i++) {
            var xVal = $('.tagArea_' + zoomLength + ' #pointX_' + i).val()
            var yVal = $('.tagArea_' + zoomLength + ' #pointY_' + i).val()
            if (marker.XPos == xVal || marker.YPos == yVal) {
                check = 1
            }
            jsResize(zoomLength)
        }

        // add check point input
        position = position + 1;


    }
    // Add mouse click event listener to canvas
    canvas.addEventListener("mousedown", mouseClicked, false);

    var firstLoad = function () {
        context.font = "15px Georgia";
        context.textAlign = "center";
    }

    firstLoad();

    var main = function () {
        draw();
    };

    var draw = function () {
        // Clear Canvas
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw map
        // Sprite, X location, Y location, Image width, Image height
        // You can leave the image height and width off, if you do it will draw the image at default size
        context.drawImage(mapSprite, 0, 0, realWidth, realHeight);

        // Draw markers 
        
        for (var i = 0; i < Markers.length; i++) {
            
            var tempMarker = Markers[i];
            // Draw marker
            context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

            // Calculate position text

            var markerText = "Position " + (i+1);
            
            


            // Draw a simple box so you can see the position
            var textMeasurements = context.measureText(markerText);
            context.fillStyle = "#666";
            context.globalAlpha = 0.7;
            context.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
            context.globalAlpha = 1;

            // Draw position above
            context.fillStyle = "#000";
            context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
            
        }

    };
    if (!(imgDiv)) {
        setInterval(main, (1000 / 500)); // Refresh 60 times a second
    }
    jsResize(zoomLength)
}

//remove image
function removeImg(rowId) {
    console.log('start')
    $('#mainImg_' + rowId).remove()
    $('.tagArea_' + rowId).remove()

    var tagAreaRowLength = $('.tagArea').length
    if (tagAreaRowLength == 0) {
        $('#click_position_tags_message p').html("lease point image to provide information")
    }
}

// remove one upload photo
function file_remove(zoomLength) {
    $("#zoom_" + zoomLength).remove();
    $("#file_remove_" + zoomLength).remove();
    $(".tagArea_" + zoomLength).remove();
    $('#mainImg_' + zoomLength).html("");
    jsResize(zoomLength)
}

//window loading resize
$(window).resize(function () {
    jsResize();
});

//resize change css
function jsResize(zoomLength) {

    // header height is 69px
    var h = window.innerHeight - 340;
    var w = window.innerWidth;
    var panelPaddingTop = $('.panel').css("padding-top")
    var uploadArea = $('.uploadArea').css('height')
    var backArea = $('.backArea').css('height')
    var backAreaMarginBottom = $('.backArea').css("margin-bottom")

    $("#showImg_view").height(h)

    //upload image area setting
    var uploadedViewHeight = $('#uploaded_view').height()
    $('.mainImg').height(h)
    $('#uploaded_view').height(h - parseInt(panelPaddingTop) - parseInt(uploadArea) - parseInt(backArea) - parseInt(backAreaMarginBottom))
    $('.container').height(h)
    var uploadViewAreaHeight = parseInt(uploadedViewHeight) + parseInt(panelPaddingTop) + parseInt(uploadArea) + parseInt(backArea) + parseInt(backAreaMarginBottom);
    if (uploadViewAreaHeight > h) {
        $('.container ').height('unset')
    }

     //position tag area setting
    var positionTagsAreaPaddingTop = $('#click_position_tags').css('padding-top')
    var positionTagsMessageHeight = $('#click_position_tags_message').height()
    var nextAreaPadding = $('.nextArea').css('margin-bottom')
    var nextAreaHeight = $('.nextArea').height()
    var tagMessageHeight = parseInt(positionTagsAreaPaddingTop) + parseInt(nextAreaPadding) + parseInt(nextAreaHeight) + (positionTagsMessageHeight) + 50;
    var tagsAreaHeight = h - parseInt(positionTagsAreaPaddingTop) - parseInt(nextAreaPadding) - parseInt(nextAreaHeight)

    $('#click_position_tags_message').height(tagsAreaHeight)
    if (tagMessageHeight > h) {
        $("#click_position_tags_message").css("overflow", "scroll");
    }

    //show image setting
    var mainImg = $('#mainImg_' + zoomLength).height()
    if (mainImg > h) {
        $("#mainImg_" + zoomLength).height()
    }

    //normal width
    $(".showImg_view").width(80 + '%')
    $(".click_position_tags").width(30 + '%')
    $(".panel").width(20 + '%')

    //mobile version css
    if (w <= 992) {
        $(".showImg_view").width(w)
        $(".click_position_tags").width(w)
        $(".panel").width(w)
        $('#uploaded_view').height((h - parseInt(panelPaddingTop) - parseInt(uploadArea) - parseInt(backArea) - parseInt(backAreaMarginBottom)) / 2)
        $('#showImg_view').height(h)
    }
}

var btnSaveYes = $("#buttonYes");
btnSaveYes.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Product type: Jacket</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge1");
btnSaveFirstAge.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Age Group: 9 months - 6 yrs old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge2");
btnSaveFirstAge.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Age Group: 7 - 14 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge3");
btnSaveFirstAge.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Age Group: 14 - 22 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge4");
btnSaveFirstAge.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Age Group: 22 - 34 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge5");
btnSaveFirstAge.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Age Group: 34 - 48 years old</div>").class("show");
}
)

var btnSaveWoven = $("#buttonWoven");
btnSaveWoven.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Material: Woven</div>").class("show");
}
)

var btnSaveKnitted = $("#buttonKnitted");
btnSaveKnitted.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'>Material: Knitted</div>").class("show");
}
)

var btnSaveZipper = $("#buttonZipper");
btnSaveZipper.on("click",function(e){
   $("#click_position_tags_message").append("<div class='tagsFeature'> Position " + position + ": Zipper.</div>").class("show"); 
   
}
)

var btnSaveButton = $("#buttonButton");
btnSaveButton.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'> Position " + position + ": Button.</div>").class("show");
}
)

var btnSaveTrims = $("#buttonTrims");
btnSaveTrims.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'> Position " + position + ": Trims.</div>").class("show");
}
)

var btnSavePrinting = $("#buttonPrinting");
btnSavePrinting.on("click",function(e){
    $("#click_position_tags_message").append("<div class='tagsFeature'> Position " + position + ": Printing.</div>").class("show");
}
)

















