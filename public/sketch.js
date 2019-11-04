let capture;
let personalButtonIcon;
let mediaButtonIcon;
let houseButtonIcon;
let cancelButtonIcon;
let screenshotButtonIcon;
let youtubeButtonIcon;
let doorLockButtonIcon;
let doorUnlockButtonIcon;
let weatherButtonIcon;
let lightOnIcon;
let lightOffIcon;
let musicIcon;
let hideMusicIcon;
let playPauseIcon;
let calendarButtonIcon;
var calendarinfo;
let healthButtonIcon;
var healthInfo;

var tempSlider;
var needPasscode = true;
var getPasscode = false;
var showCanvas = false;
var skipMsg = false;
var showWeather = false;
var lockStatus = false;
var personalButton = false;
var mediaButton = false;
var houseButton = false;
var lightStatus = false;
var songStatus = false;//<---uses for seeing if the spotify button is out or not
var calendarStatus = false;
var healthStatus = false;

var passcodeCount = 0;
var txtTemp;
var weather;
var txtStatus;
var musicVolumeSlider;
var currentSong;
var w = 1;
var h = 50;


function preload() {
  calendarinfo = loadImage('calendarinfo.jpg');
  healthInfo = loadImage("health.png");
}

function setup() {
  mycanvas = createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.hide();

 
    this.embedded = createDiv('').size(w, h);

  
  
  personalButtonIcon = createImg("https://img.icons8.com/ios-filled/50/000000/name.png");
  personalButtonIcon.size(60, 60).position(30, 25);

  
  mediaButtonIcon = createImg("https://img.icons8.com/color/96/000000/film-reel.png");
  mediaButtonIcon.size(60, 60).position(30, 150);

  houseButtonIcon = createImg("https://img.icons8.com/cotton/64/000000/cottage.png");
  houseButtonIcon.size(60, 60).position(30, 275);
  
  cancelButtonIcon = createImg("https://img.icons8.com/color/48/000000/double-left.png");
  cancelButtonIcon.size(60, 60).position(30, 400);

  tempSlider = createSlider(60, 90, 100);
  tempSlider.position(120, 300);
  tempSlider.hide();

  doorLockButtonIcon = createImg("https://img.icons8.com/dusk/64/000000/lock-2.png");
  doorLockButtonIcon.hide();

  doorUnlockButtonIcon = createImg("https://img.icons8.com/dusk/64/000000/unlock-2.png");
  doorUnlockButtonIcon.hide();

  screenshotButtonIcon = createImg("https://img.icons8.com/dusk/64/000000/screenshot.png");
  screenshotButtonIcon.hide();
  
  healthButtonIcon = createImg("https://img.icons8.com/dusk/100/000000/like.png");
  healthButtonIcon.hide();
  
  calendarButtonIcon = createImg("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-256.png");
  calendarButtonIcon.hide();
  
  youtubeButtonIcon = createImg("https://img.icons8.com/cotton/64/000000/youtube.png");
  youtubeButtonIcon.hide();

  weatherButtonIcon = createImg("https://img.icons8.com/dusk/64/000000/thermometer-automation.png");
  weatherButtonIcon.size(50, 50).position(560, 30);

  lightOffIcon = createImg("https://img.icons8.com/officel/80/000000/light-off.png");
  lightOffIcon.hide();

  lightOnIcon = createImg("https://img.icons8.com/officel/80/000000/light-on.png");
  lightOnIcon.hide();
  
  musicIcon = createImg("https://img.icons8.com/cute-clipart/64/000000/photos-folder.png");
  musicIcon.hide();
  
//  musicVolumeSlider = createSlider(0, 100, 100);
//  musicVolumeSlider.position(320, 420);
 // musicVolumeSlider.hide();
  
  hideMusicIcon = createImg("https://img.icons8.com/officel/40/000000/expand-arrow.png");
  hideMusicIcon.hide();
  hideMusicIcon.position(320, 440);
  
//  playPauseIcon =  createImg("https://img.icons8.com/office/40/000000/resume-button.png");
//  playPauseIcon.hide();
//  playPauseIcon.position(280, 410);
  
}

function draw() {
  //Setting things up =====================
  translate(640, 0);
  scale(-1, 1);
  image(capture, 0, 0, 640, 480);
  translate(640, 0);
  scale(-1, 1);
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont('Ariel');
  //=======================================

  if (showCanvas) {
    //Create & Handle Buttons ===============
    //personal button
    if (personalButton) {
      image(calendarButtonIcon, 120, 25, 50, 50);
      image(healthButtonIcon, 220, 25, 50, 50);
      if (calendarStatus) image(calendarinfo, 100, 100);
      if(healthStatus) image(healthInfo, 100, 100);
    } 
    strokeWeight(2.5);
    stroke(0);
    fill(255);
    text("Personal", 60, 100);

    //media button
    if (mediaButton) {
      image(screenshotButtonIcon, 120, 150, 50, 50);
      image(youtubeButtonIcon, 200, 150, 50, 50);
      image(musicIcon, 280, 150, 50, 50);
      
    }
    text("Media", 60, 225);

    //house button
    if (houseButton) {
      //tempSlider
      tempSlider.show();
      //doorLock
      if (lockStatus) {
        image(doorLockButtonIcon, 360, 285, 50, 50);
        text('Front Door:\nLocked', 385, 260);
      } else {
        image(doorUnlockButtonIcon, 360, 285, 50, 50);
        text('Front Door:\nUnlocked', 385, 260);
      }
    } else {
      tempSlider.hide();
    }
    text("House", 60, 350);

    //weather button
    if (showWeather && weather) {
      text(txtTemp, 560, 100).textSize(25);
    } else {
      txtTemp = "..."
    }

    //lightingButton
    if (lightStatus) {
      image(lightOnIcon, 560, 420, 50, 50);
    } else {
      image(lightOffIcon, 560, 420, 50, 50);
    }
    //=======================================

    //Lighting Control ======================
    if (lightStatus) {
      stroke(0);
      fill(color(255, 204, 0));
    } else {
      noStroke();
      fill(color(255, 255, 255, 0));
    }
    rect(10, 10, 10, 460);
    rect(620, 10, 10, 460);
    //=======================================

    //Clock & Date Display ==================
    //clock
    textSize(15);
    sec = second();
    minu = minute();
    hou = hour();
    partOfDay = "AM";
    if (hou >= 12) partOfDay = "PM";
    if (sec < 10) sec = "0" + sec;
    if (minu < 10) minu = "0" + minu;
    stroke(0);
    fill(255);
    if (hou == 12) {
      text(hou + ':' + minu + ':' + sec + " " + partOfDay, 70, 10);
    } else {
      text(hou % 12 + ':' + minu + ':' + sec + " " + partOfDay, 70, 10);
    }

    textSize(15);

    //date
    m = month();
    d = day();
    y = year();
    text(m + '/' + d + '/' + y, 580, 10);
    //=======================================

    //Smarthouse section ====================
    if (houseButton) {
      //temp slider
      value = tempSlider.value();
      text('Set House Temperature:\n' + value + "°F", 190, 280);
      //============
    }
    //=======================================
  }else{
    ShowAllIcons(false);
    if(!skipMsg){
      stroke(0);
      strokeWeight(2.5);
      fill(255);
      textSize(24);
      message = "Good Morning!";
      if(hour() >= 18){
        message = "Good Evening!";
      }else if(hour() >= 12){
        message = "Good Afternoon!";    
      }
      text(message, 320, 25);
      textSize(16);
      text("Tap the screen to use features.", 320, 50);
    }
    if(needPasscode && getPasscode){
      fill(255);
      text("Enter Passcode:", 320, 100);
      if(passcodeCount > 3) fill(120);
      circle(350, 140, 10, 10);
      if(passcodeCount > 2) fill(120);
      circle(330, 140, 10, 10);
      if(passcodeCount > 1) fill(120);
      circle(310, 140, 10, 10);
      if(passcodeCount > 0) fill(120);
      circle(290, 140, 10, 10);    
      fill(255);
      
      circle(260, 200, 50, 50);
      circle(320, 200, 50, 50);
      circle(380, 200, 50, 50);
      circle(260, 260, 50, 50);
      circle(320, 260, 50, 50);
      circle(380, 260, 50, 50);
      circle(260, 320, 50, 50);
      circle(320, 320, 50, 50);
      circle(380, 320, 50, 50);
      circle(260, 380, 50, 50);
      circle(320, 380, 50, 50);
      circle(380, 380, 50, 50);
      textSize(26);
      stroke(4);
      fill(0);
      text("1", 260, 201);
      text("2", 320, 201);
      text("3", 380, 201);
      text("4", 260, 261);
      text("5", 320, 261);
      text("6", 380, 261);
      text("7", 260, 321);
      text("8", 320, 321);
      text("9", 380, 321);
      text("X", 260, 381);
      text("0", 320, 381);
      text("<", 379, 381);
    }
  }
  
  //spotify==========
  if(songStatus){
  this.embedded.html('<iframe  src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="80"' + 'frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>').position(180,400);
  }

}

function mousePressed() {
  if(!showCanvas){
    if(needPasscode){
      skipMsg = true;
      if(!getPasscode){
        getPasscode = true;
        return;
      }
    }else{
      skipMsg = false;
      ShowAllIcons(true); 
    }
  }
  
  //personal button=============================
  if (abs(mouseX - (30 + 25)) <= 25 && abs(mouseY - (25 + 25)) <= 25) {
      personalButton = !personalButton;
      if(personalButton){
        calendaricon = false;
        mediaButton = false;
        houseButton = false;
      }else{
        calendarStatus = false;
        healthStatus = false;
      }
  }
  //==============================================
  
  //calendar button=====================
  
  if (personalButton && abs(mouseX - (120 + 25)) <= 25 && abs(mouseY - (25 + 25)) <= 25) {
    calendarStatus = !calendarStatus;
    healthStatus = false;
  }
  
  //==================================
  
  //health button
  if (personalButton && abs(mouseX - (220 + 25)) <= 25 && abs(mouseY - (25 + 25)) <= 25) {
    healthStatus = !healthStatus;
    calendarStatus = false;
  }
  
  //light button=====================================
  if (abs(mouseX - (560 + 25)) <= 25 && abs(mouseY - (420 + 25)) <= 25) {
    lightStatus = !lightStatus;
  }
  //=========================================
  //media button=====================================
  if (abs(mouseX - (30 + 30)) <= 30 && abs(mouseY - (150 + 30)) <= 30) {
    mediaButton = !mediaButton;
    if(mediaButton){
      personalButton = false;
      houseButton = false;
      calendarStatus = false;
      healthStatus = false;
    }
  }
  //screenshot button 
  if (mediaButton && abs(mouseX - (120 + 25)) <= 25 && abs(mouseY - (150 + 25)) <= 25) {
    Screenshot();
  }
  
  //youtube button
  if (mediaButton && abs(mouseX - (200 + 25)) <= 25 && abs(mouseY - (150 + 25)) <= 25) {
    window.open("https://youtube.com");
  }
  //song button
  if (mediaButton && abs(mouseX - (280 + 25)) <= 25 && abs(mouseY - (150 + 25)) <= 25) {
   songStatus = !(songStatus);
    
  
    //musicVolumeSlider.show();
   // hideMusicIcon.show();
   // playPauseIcon.show();
  //  songStatus = true;
  }
  //====
  //==============================================
  //house button=====================================
  if (abs(mouseX - (30 + 30)) <= 30 && abs(mouseY - (275 + 30)) <= 30) {
    houseButton = !houseButton;
    if(houseButton){
      personalButton = false;
      mediaButton = false; 
      calendarStatus = false;
      healthStatus = false;
    }
  }
  
  //weather button
  if (abs(mouseX - (560 + 30)) <= 30 && abs(mouseY - (20 + 30)) <= 30){
    showWeather = !showWeather;
    if(showWeather) getLocation();
  }
  
  //hide screen button
  if (abs(mouseX - (30 + 30)) <= 30 && abs(mouseY - (400 + 30)) <= 30) {
    ShowAllIcons(false);
    personalButton = false;
    mediaButton = false;
    houseButton = false;
    needPasscode = true;
  }
  //================================================================
  if (houseButton && abs(mouseX - (360 + 25)) <= 25 && abs(mouseY - (285 + 25)) <= 25) {
    lockStatus = !lockStatus;
  }
  //hide the song stuff
  if (songStatus && abs(mouseX - (320 + 25)) <= 25 && abs(mouseY - (440 + 25)) <= 25) {
 //   songStatus = false;
//    musicVolumeSlider.hide();
//    hideMusicIcon.hide();
//    playPauseIcon.hide();
    
  }
  
  //passcode
  if(getPasscode && (dist(mouseX, mouseY, 260, 200) <= 25 || dist(mouseX, mouseY, 320, 200) <= 25 || dist(mouseX, mouseY, 380, 200) <= 25 || dist(mouseX, mouseY, 260, 260) <= 25 || dist(mouseX, mouseY, 320, 260) <= 25 || dist(mouseX, mouseY, 380, 260) <= 25 || dist(mouseX, mouseY, 260, 320) <= 25 || dist(mouseX, mouseY, 320, 320) <= 25 || dist(mouseX, mouseY, 380, 320) <= 25|| dist(mouseX, mouseY, 320, 380) <= 25)){
    passcodeCount++;
    if(passcodeCount == 4){
      passcodeCount = 0;
      needPasscode = false;
      getPasscode = false;
      skipMsg = false;
      ShowAllIcons(true);
    }
  }
  
  //passcode back
  if (getPasscode && dist(mouseX, mouseY, 380, 380) <= 25) {
    passcodeCount--;
    if(passcodeCount < 0) passcodeCount = 0;
  }
  
  //passcode cancel
  if (getPasscode && dist(mouseX, mouseY, 260, 380) <= 25) {
    getPasscode = false;
    skipMsg = false;
    passcodeCount = 0;
  }
}

function ShowAllIcons(show) {
  showCanvas = show;
  if (show) {
    personalButtonIcon.show();
    mediaButtonIcon.show();
    houseButtonIcon.show();
    cancelButtonIcon.show();
    weatherButtonIcon.show();
  } else {
    personalButtonIcon.hide();
    mediaButtonIcon.hide();
    houseButtonIcon.hide();
    cancelButtonIcon.hide();
    weatherButtonIcon.hide();
    tempSlider.hide();
  }
}

function Screenshot() {
  ShowAllIcons(false);
  skipMsg = true;
  draw();
  var randy = int(random(0, 1000));
  saveCanvas(mycanvas, "screenshot" + randy, "png");
  ShowAllIcons(true);
  skipMsg = false;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {}
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  loadJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&&units=imperial&APPID=e9e8e0267b4de493ad17f3febeacc389', gotData)
}

function gotData(data) {
  weather = data;
  txtTemp = "Forcast: " + data.weather[0].description + "\nTemp: " + weather.main.temp + "°F";
}