$(document).ready(function () {
    jsResize2()




    //upload photo function
var btnUpload = $("#upload_file_back"),
btnOuter = $(".uploadArea2");
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
        var output = document.getElementById("uploaded_view_back");

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')){
                alert("Your file is not uploaded due to wrong format.")
                continue;
            }
                
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                var picFileB = event.target;
                var zoomLength2 = $('.zoom2').length + 1
                alert(zoomLength2);
                
                
                var div = document.createElement("div");
                $("#uploaded_view_back").append('<div class="zoom2" id="backzoom_' + zoomLength2 + '" onclick="showImg2(' + zoomLength2 + ')"><div class="imageSet"><img src="' + picFileB.result + '"/><span class="file_remove2" id="backfile_remove_' + zoomLength2 + '" onclick="file_remove2(' + zoomLength2 + ')"><i class="fa-solid fa-xmark"></i></span></div></div>').addClass("show");
                
                var xxx = document.getElementById("uploaded_view_back").innerHTML;
                console.log(xxx);
            
            });
            //Read the image
            picReader.readAsDataURL(file);
        }
    }, 1500);//load on server
    jsResize2()
}
});

let position = 0;
//after click photo, display photo on canvas
function showImg2(zoomLength2) {

$("#backImage2").remove();

$('.mainImg').hide();
var img2 = $('#backzoom_' + zoomLength2 + ' img').attr('src');
$('.tagArea').hide();
$('.tagArea_' + zoomLength2).show();


var imgDiv2 = $('#backimg_' + zoomLength2).attr('src');
var myImg = document.querySelector('#backzoom_' + zoomLength2 + ' img');
var realWidth = myImg.naturalWidth;
var realHeight = myImg.naturalHeight;

// check canvas have src or not
if (imgDiv2) {
    // second click
    $('#backmainImg_' + zoomLength2).show()



    
} else {
    //first click
    $("#showImg_view_back").append('<div class="mainImg" id="backmainImg_' + zoomLength2 + '" value="0"><div class="removeImgBtn" id="backremoveImgBtn_' + zoomLength2 + '" onclick="removeImg2(' + zoomLength2 + ')"><div class="iconArea"><i class="fa-solid fa-trash-can"></i></div></div><canvas class="image" id="backimg_' + zoomLength2 + '" src="' + img2 + '"></canvas>').addClass("show");
    alert("2");
}

                  




var canvas2 = document.getElementById('backimg_' + zoomLength2);
var context2 = canvas2.getContext("2d");

// set photo width and height
canvas2.setAttribute('width', realWidth);
canvas2.setAttribute('height', realHeight);

var mapSprite2 = new Image();
mapSprite2.src = $('#backzoom_' + zoomLength2 + ' img').attr('src');

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
    var rect = canvas2.getBoundingClientRect();
    var mouseXPos = (mouse.x - rect.left);
    var mouseYPos = (mouse.y - rect.top);

    console.log("Marker added");

    // Move the marker when placed to a better location
    var marker2 = new Marker();
    marker2.XPos = Math.round(mouseXPos - (marker2.Width / 2));
    marker2.YPos = Math.round(mouseYPos - marker2.Height);
    var marker2Y = marker2.YPos - 225 + "px";
    var marker2X = marker2.XPos - 360 + "px";
    
    
    

    $("#exampleModalCenter5").css("margin-top",markerY);
    $("#exampleModalCenter5").css("margin-left",markerX);
    

    Markers.push(marker);

    // make row id
    var tagInputLength = $('#backmainImg_' + zoomLength2).val()

    if (tagInputLength == "") {
        tagInputLength = 1
        console.log(tagInputLength)
    }
    $("#backmainImg_" + zoomLength2).val(Number(tagInputLength) + 1);


    var check = 0
    for (let i = 1; i < tagInputLength; i++) {
        var xVal = $('.tagArea_' + zoomLength2 + ' #pointX_' + i).val()
        var yVal = $('.tagArea_' + zoomLength2 + ' #pointY_' + i).val()
        if (marker.XPos == xVal || marker.YPos == yVal) {
            check = 1
        }
        jsResize2(zoomLength2)
    }

    // add check point input
    position = position + 1;


}
// Add mouse click event listener to canvas
canvas2.addEventListener("mousedown", mouseClicked, false);

var firstLoad = function () {
    context2.font = "15px Georgia";
    context2.textAlign = "center";
}

firstLoad();

var main = function () {
    draw();
};

var draw = function () {
    // Clear Canvas
    context2.fillStyle = "#000";
    context2.fillRect(0, 0, canvas2.width, canvas2.height);

    // Draw map
    // Sprite, X location, Y location, Image width, Image height
    // You can leave the image height and width off, if you do it will draw the image at default size
    context2.drawImage(mapSprite, 0, 0, realWidth, realHeight);

    // Draw markers 
    
    for (var i = 0; i < Markers.length; i++) {
        
        var tempMarker = Markers[i];
        // Draw marker
        context2.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos, tempMarker.Width, tempMarker.Height);

        // Calculate position text

        var markerText2 = "Position " + (i+1);

        // Draw a simple box so you can see the position
        var textMeasurements = context2.measureText(markerText);
        context2.fillStyle = "#666";
        context2.globalAlpha = 0.7;
        context2.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
        context2.globalAlpha = 1;

        // Draw position above
        context2.fillStyle = "#000";
        context2.fillText(markerText2, tempMarker.XPos, tempMarker.YPos);
        
    }

};
if (!(imgDiv2)) {
    setInterval(main, (1000 / 500)); // Refresh 60 times a second
}
jsResize2(zoomLength2)
}

//remove image
function removeImg2(rowId) {
console.log('start')
$('#backmainImg_' + rowId).remove()
$('.tagArea_' + rowId).remove()

var tagAreaRowLength = $('.tagArea').length
if (tagAreaRowLength == 0) {
    $('#click_position_tags_message2 p').html("please point image to provide information")
}
}

// remove one upload photo
function file_remove2(zoomLength2) {
$("#backzoom_" + zoomLength2).remove();
$("#backfile_remove_" + zoomLength2).remove();
$(".tagArea_" + zoomLength2).remove();
$('#backmainImg_' + zoomLength2).html("");
jsResize2(zoomLength2)
}

//window loading resize
$(window).resize(function () {
jsResize2();
});

//resize change css
function jsResize2(zoomLength2) {

// header height is 69px
var h = window.innerHeight - 340;
var w = window.innerWidth;
var panelPaddingTop = $('.panel').css("padding-top")
var uploadArea2 = $('.uploadArea2').css('height')
var backArea = $('.backArea').css('height')
var backAreaMarginBottom = $('.backArea').css("margin-bottom")

$("#showImg_view_back").height(h)

//upload image area setting
var uploadedViewHeight = $('#uploaded_view_back').height()
$('.mainImg').height(h)
$('#uploaded_view_back').height(h - parseInt(panelPaddingTop) - parseInt(uploadArea2) - parseInt(backArea) - parseInt(backAreaMarginBottom))
$('.container').height(h)
var uploadViewAreaHeight = parseInt(uploadedViewHeight) + parseInt(panelPaddingTop) + parseInt(uploadArea2) + parseInt(backArea) + parseInt(backAreaMarginBottom);
if (uploadViewAreaHeight > h) {
    $('.container ').height('unset')
}

 //position tag area setting
var positionTagsAreaPaddingTop = $('#click_position_tags2').css('padding-top')
var positionTagsMessageHeight = $('#click_position_tags_message2').height()
var nextAreaPadding = $('.nextArea').css('margin-bottom')
var nextAreaHeight = $('.nextArea').height()
var tagMessageHeight = parseInt(positionTagsAreaPaddingTop) + parseInt(nextAreaPadding) + parseInt(nextAreaHeight) + (positionTagsMessageHeight) + 50;
var tagsAreaHeight = h - parseInt(positionTagsAreaPaddingTop) - parseInt(nextAreaPadding) - parseInt(nextAreaHeight)

$('#click_position_tags_message2').height(tagsAreaHeight)
if (tagMessageHeight > h) {
    $("#click_position_tags_message2").css("overflow", "scroll");
}

//show image setting
var mainImg = $('#backmainImg_' + zoomLength2).height()
if (mainImg > h) {
    $("#backmainImg_" + zoomLength2).height()
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
    $('#uploaded_view_back').height((h - parseInt(panelPaddingTop) - parseInt(uploadArea2) - parseInt(backArea) - parseInt(backAreaMarginBottom)) / 2)
    $('#showImg_view_back').height(h)
}
}

var btnSaveYes = $("#buttonYes");
btnSaveYes.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Product type: Jacket</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge1");
btnSaveFirstAge.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Age Group: 9 months - 6 yrs old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge2");
btnSaveFirstAge.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Age Group: 7 - 14 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge3");
btnSaveFirstAge.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Age Group: 14 - 22 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge4");
btnSaveFirstAge.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Age Group: 22 - 34 years old</div>").class("show");
}
)

var btnSaveFirstAge = $("#buttonAge5");
btnSaveFirstAge.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Age Group: 34 - 48 years old</div>").class("show");
}
)

var btnSaveWoven = $("#buttonWoven");
btnSaveWoven.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Material: Woven</div>").class("show");
}
)

var btnSaveKnitted = $("#buttonKnitted");
btnSaveKnitted.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'>Material: Knitted</div>").class("show");
}
)

var btnSaveZipper = $("#buttonZipper");
btnSaveZipper.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'> Position " + position + ": Zipper.</div>").class("show"); 

}
)

var btnSaveButton = $("#buttonButton");
btnSaveButton.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'> Position " + position + ": Button.</div>").class("show");
}
)

var btnSaveTrims = $("#buttonTrims");
btnSaveTrims.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'> Position " + position + ": Trims.</div>").class("show");
}
)

var btnSavePrinting = $("#buttonPrinting");
btnSavePrinting.on("click",function(e){
$("#click_position_tags_message2").append("<div class='tagsFeature'> Position " + position + ": Printing.</div>").class("show");
}
)


})