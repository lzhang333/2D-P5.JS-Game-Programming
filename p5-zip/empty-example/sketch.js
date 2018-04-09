var santa;
var kid;
var speed = 3

//testing allows the animation to continous walking
var testing = false;
//facing allows the animation to continous stand 
var facing = false;

var testingtwo= false;

var facingtwo = false;
//jumping force of santa
var gravity = 4;
var jump = 20;
var canjump = false;

//Defining Santa Shooting Presents
var presents;
var presentImage;

//Defining Kid Shooting Coals
var coals;
var coalImage;

//Defining my health pooints
var lifeSanta;
var points = 300;

var lifeKid;
var health = -300;

//keep player from double jumping
var canjump = false;
var fallingone = true;
var fallingkid= true;

//var platform
var platformOne;
var platformTwo;
var platformThree;
var platformFour;
var platformFive;
var platformSix;
var platformSeven;
var lastPlatform;
//GAME OVER
var gameOver = false; 

//START GAME
var start  = false;


function preload() {
	//make Platforms
	platformOneImg = loadImage("images/platformone.png")
	platformOne = createSprite()//(width - 1300, height - 180, 700);
	platformOne.addImage(platformOneImg);

	platformTwoImg = loadImage("images/platformtwo.png")
	platformTwo = createSprite()
	platformTwo.addImage(platformTwoImg);	

	platformThreeImg = loadImage("images/platformthree.png")
	platformThree = createSprite()
	platformThree.addImage(platformThreeImg);

	platformFourImg = loadImage("images/platformfour.png")
	platformFour = createSprite()
	platformFour.addImage(platformFourImg);

	platformFiveImg = loadImage("images/platformfive.png")
	platformFive = createSprite()
	platformFive.addImage(platformFiveImg);

	platformSixImg = loadImage("images/platformsix.png")
	platformSix = createSprite()
	platformSix.addImage(platformSixImg);

	platformSevenImg = loadImage("images/platformseven.png")
	platformSeven = createSprite()
	platformSeven.addImage(platformSevenImg);

	lastPlatformImg = loadImage("images/lastPlatform.png")
	lastPlatform = createSprite();
	lastPlatform.addImage(lastPlatformImg);




	//make SANTA
	santa = createSprite();
	santa.addAnimation("standing","images/santa01.png")

	//Santa Walking Right
	santa.addAnimation("walking", "images/santa02.png", "images/santa03.png", "images/santa04.png","images/santa05.png","images/santa06.png","images/santa07.png","images/santa08.png")
	santa.animation.frameDelay = 6;

	//sums up the testing variable if true	//Santa Walking Left
	if (testing = true){
		santa.addAnimation("wleft", "images/santar02.png", "images/santar03.png", "images/santar04.png","images/santar05.png","images/santar06.png","images/santar07.png","images/santar08.png")
		santa.addAnimation("sleft", "images/santar01.png")
	}
	//MAKE KID
	kid = createSprite();
	kid.addAnimation("standing","images/kid01.png")

	//kid walking Right
	kid.addAnimation("walking","images/kid02.png", "images/kid03.png","images/kid04.png");
	kid.animation.frameDelay = 10;

	//kid walking Left
	if (testingtwo = true){
		kid.addAnimation("wleft","images/kid02r.png","images/kid03r.png","images/kid04r.png");
		kid.addAnimation("sleft","images/kid01r.png");
	}

	theme = loadSound("sounds/theme.mp3")

}

function setup() {
	createCanvas(windowWidth,windowHeight);
	platformOne.position.x = width - 1300
	platformOne.position.y = height - 130

	platformTwo.position.x = width - 270;
	platformTwo.position.y = height - 90

	platformThree.position.x = width - 950;
	platformThree.position.y = height - 75;

	platformFour.position.x = width/2;
	platformFour.position.y = height/2;
	
	platformFive.position.x = width - 1460;
	platformFive.position.y = height - 500;

	platformSix.position.x = ((width/2) + 200);
	platformSix.position.y = ((height/2) - 250);

	platformSeven.position.x = width - 1100;
	platformSeven.position.y = height - 470;

	lastPlatform.position.x = width - 150;
	lastPlatform.position.y = height - 240;

	//define backgroundv
	bgImg = loadImage("images/darknight.jpg");
	startImg = loadImage("images/startpage.png");
	
	//define Santa's position
	santa.position.x = width/10;
	santa.position.y = height - 300;

	//define Kid's
	kid.position.x = width - 200;
	kid.position.y = height - 190;
	
	//defining presents as an array
	presents = new Group();
	presentImage = loadImage("images/minipresent.png");

	//defining coals as an array
	coals = new Group();
	coalImage = loadImage("images/coal.png")

	//health points
	lifeSanta = new lifeSanta;
	lifeKid = new lifeKid;

	theme.loop();

}

function draw() {
	if(start){
	if(!gameOver){
	background(255);
	image(bgImg,0,0,width,height);
	lifeSanta.display();

	//Teaching Santa how to walk right
	if(keyIsDown(RIGHT_ARROW)){
		testing = false;
		santa.changeAnimation("walking");
		//increases the x position of santa walking
		santa.position.x = santa.position.x += 3;
	}else if(facing == false){
		santa.changeAnimation("standing");
	}

	//Teaching Satna how to walk left
	if(keyIsDown(LEFT_ARROW)){
		testing = true;
		santa.changeAnimation("wleft");
		santa.position.x = santa.position.x -= 3;
	}else if(facing == true){
		santa.changeAnimation("sleft");
	}

	if(keyIsDown(UP_ARROW)){
		canjump = true;
		santa.position.y = santa.position.y -= jump
	}else {
		santa.position.y += gravity;
	}

	//Shooting Presents Out
	if(keyWentDown("p")){
		console.log("SHOT!")

		//shooting right
		if((testing = false) || (facing == false) ){
			var present = createSprite(santa.position.x,santa.position.y);
			present.addImage(presentImage);
			presents.add(present);	
			present.setSpeed(-10, 180);
		//shooting left
		}else if ((testing = true) || (facing == true) ){
			var present = createSprite(santa.position.x,santa.position.y);
			present.addImage(presentImage);
			presents.add(present);	
			present.setSpeed(10, 180);
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////
	//Walk LEFT
	if(keyIsDown(68)){
		testingtwo = false;
		kid.changeAnimation("walking");
		kid.position.x = kid.position.x += 3;
	} else if (facingtwo == false){
		kid.changeAnimation("standing");
	}

	//Walk Righta
	if(keyIsDown(65)){
		testingtwo = true;
		kid.changeAnimation("wleft");
		kid.position.x = kid.position.x -= 3;
	}else if(facingtwo == true) {
		kid.changeAnimation("sleft")
	}

	// kid jump 
	if(keyIsDown(87)){
		canjump = true;
		kid.position.y = kid.position.y -= jump
	}else{
		kid.position.y += gravity;
	}

	//Shooting Coal Out
	if(keyWentDown("t")){
		console.log("SHOTS!")

		//shooting right
		if((testingtwo = false) || (facingtwo == false)){
			var coal = createSprite(kid.position.x,kid.position.y);
			coal.addImage(coalImage);
			coals.add(coal);	
			coal.setSpeed(-10, 180);
		//shooting left
		}else if ((testingtwo = true) || (facingtwo == true) ){
			var coal = createSprite(kid.position.x,kid.position.y);
			coal.addImage(coalImage);
			coals.add(coal);	
			coal.setSpeed(10, 180);
		}
		if((coal).overlap(santa)){
			coal.remove();
		}
	}


	////////////////////////////////////////////////////////////////
	//HEALTH BAR
	lifeSanta.display();
	lifeSanta.update();
	
	lifeKid.display();
	lifeKid.update();


	//PLATFORMS IF SANTA DOESNT COLLIDE THEY DIE THROUGH FALLING

	if(santa.collide(platformOne)){
		falling = false;
		canjump = true;
	}else if(santa.collide(platformThree)){
		falling = false;
		canjump = true;
	}else if(santa.collide(platformTwo)){
		falling = false;
		canjump = true;
	}else if(santa.collide(platformFour)){
		falling = false;
		canjump = true;
	}else if(santa.collide(platformFive)){
		falling = false;
		canjump = true;
	}else if (santa.collide(platformSix)){
		falling = false;
		canjump = true;
	}else if (santa.collide(platformSeven)){
		falling = false;
		canjump = true;
	}else if (santa.collide(lastPlatform)){
		falling = false;
		canjump = true;
	}else if (santa.position.y > height){
		points = 0;
	}
	//else if (kid.overlap(lastPlatform)){
		//falling =false;
		//canjump = true;
	//}

	//KID PLATFORM
	if(kid.collide(platformTwo)){
		fallingkid = false;
		canjump = true;
	}else if(kid.collide(platformOne)){
		fallingkid = false;
		canjump = true;
	}else if (kid.collide(platformThree)){
		fallingkid = false;
		canjump = true;
	}else if (kid.collide(platformFour)){
		fallingkid = false;
		canjump = true;
	}else if (kid.collide(platformFive)){
		fallingkid = false;
		canjump = true;
	}else if (kid.collide(platformSix)){
		fallingkid = false;
		canjump = true;
	}else if (kid.collide(platformSeven)){
		falling = false;
		canjump = true;
	}else if (kid.collide(lastPlatform)){
		falling = false;
		canjump = true;
	}else if (kid.position.y > height){
		health = 0;
	}
	//else{
		//kid.position.y += 50;
	//}
	drawSprites();

}if (points <= 0){
	background(50);
	textAlign(CENTER,CENTER)
	textSize(100);
	fill(0,255,0);
	text("GAME OVER! ELF WINS!",width/2,height/2);	
}if (health >= 0){
	background(50);
	textAlign(CENTER,CENTER)
	textSize(100);
	fill(255,0,0);
	text("GAMEOVER! SANTA WINS!", width/2, height/2);
}
}
else{
	background(255);
	image(startImg,width/7,0,1100,800);
	if(keyIsDown(32)){
		start = true;
	}
}
}


//ALLOWS THE SANTA CLAUSE TO STAND BY VARIABLE WHEN KEY IS RELEASED
function keyPressed(){
	if(keyCode === LEFT_ARROW){
		facing = true;
	} else if(keyCode === RIGHT_ARROW){
		facing = false;
	}
	if(keyCode === 65){
		facingtwo = true;
	} else if(keyCode === 68){
		facingtwo = false;
	}
}

//HEALTH BAR
function lifeSanta(){ 

	this.display= function(){
		fill(255,0,0)
		rect(50,50,points,25);
		textSize(25);
		text("SANTA", 50,40);
	}
	this.update = function(){
		if ((coals).overlap(santa)){
			points -= 3;
		}else if (points <= 0){
			gameOver = true;
		}
	}

}

//HEALTH BAR OF KID
function lifeKid(){
	//displaying of the bar
	this.display = function(){
		fill(255,0,0)
		rect(width-50,50, health, 25);
		fill(0,255,0)
		textSize(25);
		text("ELF", width-100, 40);
	}
	//if hit the bar decreases
	this.update = function(){
		if((presents).overlap(kid)){
			health +=3;
		}else if (health >= 0){
			gameOver = true;
		}
	}
}

