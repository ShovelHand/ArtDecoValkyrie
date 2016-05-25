var SnailBait = function () {
   this.canvas = document.getElementById('game-canvas'),
   this.context = this.canvas.getContext('2d'),
   this.fpsElement = document.getElementById('fps'),

   // Constants.........................................................

   this.LEFT = 1,
   this.RIGHT = 2,

   this.SHORT_DELAY = 5; // milliseconds

   this.TRANSPARENT = 0,
   this.OPAQUE = 1.0,

   this.BACKGROUND_VELOCITY = 100,
	
   this.RUN_ANIMATION_RATE = 15,
   this.IDLE_ANIMATION_RATE = 3,
   this.HAMMER_ANIMATION_RATE = 5,

   this.PLATFORM_HEIGHT = 8,  
   this.PLATFORM_STROKE_WIDTH = 2,
   this.PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

   // Background width and height.........................................

   this.BACKGROUND_WIDTH = 1602;
   this.BACKGROUND_HEIGHT = 800;

   // Velocities........................................................

   // Loading screen....................................................

   this.loadingElement = document.getElementById('loading');
   this.loadingTitleElement = document.getElementById('loading-title');
   this.runnerAnimatedGIFElement = 
      document.getElementById('loading-animated-gif');

   // Track baselines...................................................

   this.TRACK_1_BASELINE = 600,
   this.TRACK_2_BASELINE = 400,
   this.TRACK_3_BASELINE = 200,
   
   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.

   this.PLATFORM_VELOCITY_MULTIPLIER = 10.35,

   this.STARTING_BACKGROUND_VELOCITY = 0,

   this.STARTING_BACKGROUND_OFFSET = 0,
   this.STARTING_SPRITE_OFFSET = 0,

   // States............................................................

   this.paused = false;
   this.faceLeft = true;
   this.PAUSED_CHECK_INTERVAL = 200;
   this.windowHasFocus = true;
   this.countdownInProgress = false;
   this.gameStarted = false;

   // Images............................................................
   
   this.spritesheet = new Image(),
   this.background = new Image(),

   // Time..............................................................
   
   this.lastAnimationFrameTime = 0,
   this.lastFpsUpdateTime = 0,
   this.fps = 60,

   // Fps...............................................................

   this.fpsElement = document.getElementById('fps'),

   // Toast.............................................................

   this.toastElement = document.getElementById('toast'),

   // Instructions......................................................

   this.instructionsElement = document.getElementById('instructions');

   // Copyright.........................................................

   this.copyrightElement = document.getElementById('copyright');

   // Score.............................................................

   this.scoreElement = document.getElementById('score'),

   // Sound and music...................................................

   this.soundAndMusicElement = document.getElementById('sound-and-music');

   // Runner track......................................................

   this.runnerTrack = this.STARTING_RUNNER_TRACK,
   
   // Translation offsets...............................................
   
   this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
   this.spriteOffset = this.STARTING_SPRITE_OFFSET;
   
   //this.platformOffset = this.STARTING_PLATFORM_OFFSET,

   // Velocities........................................................

   this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
   this.platformVelocity,

     // Sprite sheet cells................................................

 //  this.RUNNER_CELLS_WIDTH = 50; // pixels
 //  this.RUNNER_CELLS_HEIGHT = 54;

   this.explosionCells = [
      { left: 3,   top: 48, 
        width: 52, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 63,  top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 146, top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 233, top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 308, top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 392, top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT },
      { left: 473, top: 48, 
        width: 70, height: this.EXPLOSION_CELLS_HEIGHT }
   ];

   // Sprite sheet cells................................................
this.valkRunRightCells = [
      { left: 5, top: 20, 
        width: 160, height: 185 },

      { left: 190, top: 18, 
         width: 126, height: 187 },

      { left: 345, top: 22, 
         width: 163, height: 183 },

      { left: 508, top: 22, 
         width: 174, height: 185 },

      { left: 690, top: 22, 
         width: 184, height: 170 },

      { left: 898, top: 16, 
         width: 160, height: 189 },

      { left: 1079,  top: 16, 
         width: 111, height: 196 },

      { left: 1202,  top: 17, 
         width: 142, height: 193 },

      { left: 1364,   top: 21, 
         width: 158, height: 191 },
		 
	  { left: 1542,   top: 24, 
         width: 172, height: 188 },
   ],
   
   this.valkRunLeftCells = [
     
	 
	  { left: 1562, top: 241, 
         width: 159, height: 185 },
       { left: 1410, top: 236, 
         width: 127, height: 191 },
{ left: 1237, top: 245, 
         width: 144, height: 185 },
       { left: 1054, top: 241, 
         width: 164, height: 184 },
		 
      { left: 852, top: 242, 
         width: 184, height: 172 },

      { left: 670, top: 237, 
         width: 152, height: 195 },

	  { left: 536, top: 234, 
         width: 111, height: 201 },

	 
	  
	  { left: 382, top: 243, 
         width: 142, height: 196 },
	
	  { left: 203,  top: 245, 
      width: 161, height: 191 },
		 
   ],

	this.valkIdleRightCells = [
      {left: 45, top: 482,
	  width: 97, height: 241},
	  
	  {left: 180, top: 484,
	  width: 95, height: 239},
	  
	 ],
	 
	 this.valkIdleLeftCells = [
      {left: 369 , top: 484,
	  width: 95, height: 239},
	  
	  {left: 500 , top: 482,
	  width: 97, height: 241},
	 ],
	 
	  this.valkJumpLeftCells = [
      {left: 651 , top: 473,
	  width: 120, height: 247},
	  
	  {left: 817, top: 473,
	  width: 125, height: 246},
	  
	  {left: 970, top: 474,
	  width: 137, height: 241},
	  
	 ],
	 
	 this.valkJumpRightCells = [
     {left: 1469, top: 473,
	  width: 120, height: 247},
	  
	  {left: 1300, top: 473,
	  width: 125, height: 246},
	  
	   {left: 1143, top: 474,
	  width: 137, height: 241},
	  
	 ],
	  this.valkSwingLeftCells = [
     {left: 24, top: 740,
	  width: 174, height: 248},
	  
	  {left: 224, top: 740,
	  width: 138, height: 248},
	  
	  {left: 408, top: 740,
	  width: 240, height: 248},
	  
	 ],
	  this.valkSwingRightCells = [
     {left: 1193, top: 740,
	  width: 174, height: 248},
	  
	  {left: 1030, top: 740,
	  width: 135, height: 248},
	  
	  {left: 740, top: 740,
	  width: 224, height: 248},
	  
	 ],

   // Sprite data.......................................................

   // Platforms.........................................................

   this.platformData = [
      // Screen 1.......................................................
      {
         left:      10,
         width:     230,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(150,190,255)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      {  left:      250,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(150,190,255)',
         opacity:   1.0,
         track:     2,
         pulsate:   false,
      },

      {  left:      400,
         width:     125,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,0,0)',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      633,
         width:     300,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 2.......................................................
               
      {  left:      810,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1025,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1200,
         width:     125,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      1400,
         width:     180,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },

      // Screen 3.......................................................
               
      {  left:      1625,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1800,
         width:     250,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false
      },

      {  left:      2000,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,80)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      2100,
         width:     100,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
      },


      // Screen 4.......................................................

      {  left:      2269,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: 'gold',
         opacity:   1.0,
         track:     1,
      },

      {  left:      2500,
         width:     200,
         height:    this.PLATFORM_HEIGHT,
         fillStyle: '#2b950a',
         opacity:   1.0,
         track:     2,
         snail:     true
      },
   ];


   this.smokingHoleData = [
      { left: 248,  top: this.TRACK_2_BASELINE - 22 },
      { left: 688,  top: this.TRACK_3_BASELINE + 5 },
      { left: 1352,  top: this.TRACK_2_BASELINE - 18 },
   ];
   
   // Sprites...........................................................
  
 //  this.bats         = []; , etc.
  
   this.sprites = []; // For convenience, contains all of the sprites  
                      // from the preceding arrays

   // Sprite artists....................................................

   this.platformArtist = {
      draw: function (sprite, context) {
         var PLATFORM_STROKE_WIDTH = 1.0,
             PLATFORM_STROKE_STYLE = 'black',
             top;
         
         top = snailBait.calculatePlatformTop(sprite.track);

         context.lineWidth = PLATFORM_STROKE_WIDTH;
         context.strokeStyle = PLATFORM_STROKE_STYLE;
         context.fillStyle = sprite.fillStyle;

         context.strokeRect(sprite.left, top, 
                            sprite.width, sprite.height);

         context.fillRect  (sprite.left, top, 
                            sprite.width, sprite.height);
      }
   };

   // ------------------------Sprite behaviors-------------------------
	
	this.strikeBehavior = {
		
	}
   // Pacing on platforms...............................................
   this.runBehavior = {
      lastAdvanceTime: 0,
      b_midJump: false,
      execute: function (sprite, 
                         now, 
                         fps, 
                         context, 
                         lastAnimationFrameTime) {
         if (sprite.runAnimationRate === 0) {
            return;
         }
         
         if (this.lastAdvanceTime === 0) {  // skip first time
            this.lastAdvanceTime = now;
         }
         else if (now - this.lastAdvanceTime > 
                  1000 / sprite.runAnimationRate) {
            sprite.artist.advance();
            this.lastAdvanceTime = now;
         }
      }      
   };
	
   this.jumpBehavior = {
      pause: function (sprite) {
         if (sprite.ascendTimer.isRunning()) {
            sprite.ascendTimer.pause();
         }
         else if (sprite.descendTimer.isRunning()) {
            sprite.descendTimer.pause();
         }
      },
		
      unpause: function (sprite) {
         if (sprite.ascendTimer.isRunning()) {
            sprite.ascendTimer.unpause();
         }         
         else if (sprite.descendTimer.isRunning()) {
            sprite.descendTimer.unpause();
         }
      },

      isAscending: function (sprite) {
         return sprite.ascendTimer.isRunning();
      },

      ascend: function (sprite) {
         var elapsed = sprite.ascendTimer.getElapsedTime(),
             deltaY  = elapsed / (sprite.JUMP_DURATION/2) * sprite.JUMP_HEIGHT;
			 
		 if(sprite.type === 'runner' && elapsed > sprite.JUMP_DURATION/4 && !this.b_midJump)
		 {
			 sprite.artist.advance();
			 this.b_midJump = true;
		 }
         sprite.top = sprite.verticalLaunchPosition - deltaY; // Moving up
      },

      isDoneAscending: function (sprite) {
         return sprite.ascendTimer.getElapsedTime() > sprite.JUMP_DURATION/2;
      },

      finishAscent: function (sprite) {
         sprite.jumpApex = sprite.top;
         sprite.ascendTimer.stop();
         sprite.descendTimer.start();
		 this.b_midJump = false;
		 if(sprite.type === 'runner')//advance to next jump frame
			sprite.artist.advance();
      },

      isDescending: function (sprite) {
         return sprite.descendTimer.isRunning();
      },

      descend: function (sprite, verticalVelocity, fps) {
         var elapsed = sprite.descendTimer.getElapsedTime(),
             deltaY  = elapsed / (sprite.JUMP_DURATION/2) * sprite.JUMP_HEIGHT;

         sprite.top = sprite.jumpApex + deltaY; // Moving down
      },

      isDoneDescending: function (sprite) {
         return sprite.descendTimer.getElapsedTime() > sprite.JUMP_DURATION/2;
      },

      finishDescent: function (sprite) {
         sprite.top = sprite.verticalLaunchPosition;
         sprite.stopJumping();
		 if(sprite.type === 'runner')
		 {
			 if(snailBait.faceLeft)
				 snailBait.stopRight();
			 else
				 snailBait.stopLeft();
		 }
		 else
			sprite.runAnimationRate = snailBait.RUN_ANIMATION_RATE;
      },

      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         if ( ! sprite.jumping || sprite.track === 3) {
            return;
         }

         if (this.isAscending(sprite)) {
            if ( ! this.isDoneAscending(sprite)) this.ascend(sprite);
            else                               this.finishAscent(sprite);
         }
         else if (this.isDescending(sprite)) {
            if ( ! this.isDoneDescending(sprite)) this.descend(sprite);
            else                                  this.finishDescent(sprite);
         }
      }
   };
};

SnailBait.prototype = {
   createSprites: function () {
	  this.createRunnerSprite();
      this.initializeSprites();
	  this.createPlatformSprites(); 

      // All sprites are also stored in a single array

      this.addSpritesToSpriteArray();
   },

   addSpritesToSpriteArray: function () {
      for (var i=0; i < this.platforms.length; ++i) {
         this.sprites.push(this.platforms[i]);
      }


      this.sprites.push(this.runner);
   },

   positionSprites: function (sprites, spriteData) {
      var sprite;

      for (var i = 0; i < sprites.length; ++i) {
         sprite = sprites[i];

         if (spriteData[i].platformIndex) { 
            this.putSpriteOnPlatform(sprite,
               this.platforms[spriteData[i].platformIndex]);
         }
         else {
            sprite.top  = spriteData[i].top;
            sprite.left = spriteData[i].left;
         }
      }
   },
  
   equipRunnerForJumping: function () {
      var INITIAL_TRACK = 1,
          RUNNER_JUMP_HEIGHT = 300,
          RUNNER_JUMP_DURATION = 1300;

      this.runner.JUMP_HEIGHT   = RUNNER_JUMP_HEIGHT;
      this.runner.JUMP_DURATION = RUNNER_JUMP_DURATION;

      this.runner.jumping = false;
		this.runner.striking = false;
		this.runner.running = false;
		
      this.runner.track   = INITIAL_TRACK;

       this.runner.ascendTimer =
         new AnimationTimer(this.runner.JUMP_DURATION/2,
                            AnimationTimer.makeEaseOutEasingFunction(1.1));
         
      this.runner.descendTimer =
         new AnimationTimer(this.runner.JUMP_DURATION/2,
                            AnimationTimer.makeEaseInEasingFunction(1.1));

      this.runner.jump = function () {
         if (this.jumping) // 'this' is the runner
            return;

         this.jumping = true;
         this.runAnimationRate = 0; // Freeze the runner while jumping
         this.verticalLaunchPosition = this.top;
         this.ascendTimer.start();
      };
		
		this.runner.strike = function () {
			if (this.striking) 
            return;
			
			this.striking = true;
		};

      this.runner.stopJumping = function () {
         this.descendTimer.stop();
         this.jumping = false;
      };
   },

   equipRunner: function () {
      this.equipRunnerForJumping();
   },

   initializeSprites: function() {  

      this.equipRunner();
   },

   createPlatformSprites: function () {
      var sprite, pd;  // Sprite, Platform data

      for (var i=0; i < this.platformData.length; ++i) {
         pd = this.platformData[i];

         sprite = new Sprite('platform', this.platformArtist);

         sprite.left = pd.left;
         sprite.width = pd.width;
         sprite.height = pd.height;
         sprite.fillStyle = pd.fillStyle;
         sprite.opacity = pd.opacity;
         sprite.track = pd.track;
         sprite.button = pd.button;
         sprite.pulsate = pd.pulsate;

         sprite.top = this.calculatePlatformTop(pd.track);

         this.platforms.push(sprite);
      }
   },
   

   createRunnerSprite: function () {
      var RUNNER_LEFT = 200,
          RUNNER_HEIGHT = 50,
          STARTING_RUNNER_TRACK = 1,
          STARTING_RUN_ANIMATION_RATE = 0;

       this.runner = new Sprite('runner',
                        new SpriteSheetArtist(this.spritesheet,
                                              this.valkIdleRightCells),
                        [ this.runBehavior,
                          this.jumpBehavior
								  ]); 

       this.runner.runAnimationRate = STARTING_RUN_ANIMATION_RATE;

       this.runner.track = STARTING_RUNNER_TRACK;
       this.runner.left = RUNNER_LEFT;
       this.runner.top = this.calculatePlatformTop(this.runner.track) -
                            RUNNER_HEIGHT;

       this.sprites.push(this.runner);
   },

   isSpriteInView: function(sprite) {
      return sprite.left + sprite.width > sprite.hOffset &&
             sprite.left < sprite.hOffset + this.canvas.width;
   },

   updateSprites: function (now) {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];
			
         if (sprite.visible && this.isSpriteInView(sprite)) {
            sprite.update(now, 
             this.fps, 
             this.context,
             this.lastAnimationFrameTime);
         }
      }
   },

   drawSprites: function() {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if (sprite.visible && this.isSpriteInView(sprite)) {
            this.context.translate(-sprite.hOffset, 0);
            sprite.draw(this.context);
            this.context.translate(sprite.hOffset, 0);
         }
		 if(sprite === this.runner)//define if jumping stuff here.
		 {
			  if(this.runner.ascendTimer.isRunning())
			  {
				    this.runner.runAnimationRate = 0;
					if(this.faceLeft)
						this.runner.artist.cells = this.valkJumpLeftCells;
					else
						this.runner.artist.cells = this.valkJumpRightCells;
			  }
		 }
      }
   },

   draw: function (now) {
      this.setPlatformVelocity();
      this.setOffsets(now);

      this.drawBackground();
      this.updateSprites(now);
      this.drawSprites();
      
     // this.drawRunner();
    //  this.drawPlatforms();
      
   },

   setPlatformVelocity: function () {
      this.platformVelocity = this.bgVelocity * 
      this.PLATFORM_VELOCITY_MULTIPLIER; 
   },

   setOffsets: function (now) {
      this.setBackgroundOffset(now);
      this.setSpriteOffsets(now);
      //this.setPlatformOffset(now);
   },

   setBackgroundOffset: function (now) {
      this.backgroundOffset +=
      this.bgVelocity * (now - this.lastAnimationFrameTime) / 1000;

      if (this.backgroundOffset < 0 || 
        this.backgroundOffset > this.BACKGROUND_WIDTH) {
         this.backgroundOffset = 0;
      }
   },

   setSpriteOffsets: function (now) {
      var sprite;
   
      // In step with platforms
      this.spriteOffset +=
         this.platformVelocity * (now - this.lastAnimationFrameTime) / 1000;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if ('runner' !== sprite.type) {
            sprite.hOffset = this.spriteOffset; 
         }
      }
   },

   setPlatformOffset: function (now) {
      this.platformOffset += 
      this.platformVelocity * (now - this.lastAnimationFrameTime) / 1000;

      if (this.platformOffset > 2*this.BACKGROUND_WIDTH) {
         this.turnLeft();
      }
      else if (this.platformOffset < 0) {
         this.turnRight();
      }
   },

   drawBackground: function () {
      var BACKGROUND_TOP_IN_SPRITESHEET = 0;

      // Translate everything by the background offset
      this.context.translate(-this.backgroundOffset, 0);

      // 2/3 onscreen initially:
      this.context.drawImage(
         this.background, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT,
         0, 0,
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT);

      // Initially offscreen:
      this.context.drawImage(
         this.background, 0, BACKGROUND_TOP_IN_SPRITESHEET, 
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT,
         this.BACKGROUND_WIDTH, 0,
         this.BACKGROUND_WIDTH, this.BACKGROUND_HEIGHT);

      // Translate back to the original location
      this.context.translate(this.backgroundOffset, 0);
   },

   drawPlatform: function (data) {
      var platformTop = this.calculatePlatformTop(data.track);

      this.context.lineWidth = this.PLATFORM_STROKE_WIDTH;
      this.context.strokeStyle = this.PLATFORM_STROKE_STYLE;
      this.context.fillStyle = data.fillStyle;
      this.context.globalAlpha = data.opacity;

      this.context.strokeRect(data.left, platformTop, data.width, data.height);
      this.context.fillRect  (data.left, platformTop, data.width, data.height);
   },

   drawPlatforms: function () {
      var index;

      this.context.translate(-this.platformOffset, 0);

      for (index = 0; index < this.platformData.length; ++index) {
         this.drawPlatform(this.platformData[index]);
      }

      this.context.translate(this.platformOffset, 0);
   },

   calculateFps: function (now) {
      var fps = 1 / (now - this.lastAnimationFrameTime) * 1000;

      if (now - this.lastFpsUpdateTime > 1000) {
         this.lastFpsUpdateTime = now;
         this.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
      }
      return fps; 
   },

   putSpriteOnPlatform: function(sprite, platformSprite) {
      sprite.top  = platformSprite.top - sprite.height;
      sprite.left = platformSprite.left;
      sprite.platform = platformSprite;
   },

   calculatePlatformTop: function (track) {
      if      (track === 1) { return this.TRACK_1_BASELINE; } // 323 pixels
      else if (track === 2) { return this.TRACK_2_BASELINE; } // 223 pixels
      else if (track === 3) { return this.TRACK_3_BASELINE; } // 123 pixels
   },

   turnLeft: function () {
     // this.bgVelocity = -this.BACKGROUND_VELOCITY;
		if(this.runner.left > 100)
			this.runner.left -= 10;
		else
			this.bgVelocity = -this.BACKGROUND_VELOCITY;
      this.runner.runAnimationRate = this.RUN_ANIMATION_RATE;
      this.runner.artist.cells = this.valkRunLeftCells;
   },

   turnRight: function () {
		if(this.runner.left < 1000 && ! this.runner.jumping)
			this.runner.left += 10;
		else
			this.bgVelocity = this.BACKGROUND_VELOCITY;
      this.runner.runAnimationRate = this.RUN_ANIMATION_RATE;
      this.runner.artist.cells = this.valkRunRightCells;
   },
   
   stopLeft: function () {
      this.bgVelocity = 0;
      this.runner.runAnimationRate = this.IDLE_ANIMATION_RATE;
      this.runner.artist.cells = this.valkIdleLeftCells;
   },

   stopRight: function () {
      this.bgVelocity = 0;
      this.runner.runAnimationRate = this.IDLE_ANIMATION_RATE;
      this.runner.artist.cells = this.valkIdleRightCells;
   },
   
   hammerSwing: function () {
	   this.runner.runAnimationRate = this.HAMMER_ANIMATION_RATE;
	   if(snailBait.faceLeft)
		   this.runner.artist.cells = this.valkSwingLeftCells;
	   else
		   this.runner.artist.cells = this.valkSwingRightCells;
		   
   },

   fadeInElements: function () {
      var args = arguments;

      for (var i=0; i < args.length; ++i) {
         args[i].style.display = 'block';
      }

      setTimeout( function () {
         for (var i=0; i < args.length; ++i) {
            args[i].style.opacity = snailBait.OPAQUE;
         }
      }, this.SHORT_DELAY);
   },

   fadeOutElements: function () {
      var args = arguments,
          fadeDuration = args[args.length-1]; // Last argument

          for (var i=0; i < args.length-1; ++i) {
            args[i].style.opacity = this.TRANSPARENT;
         }

         setTimeout(function() {
            for (var i=0; i < args.length-1; ++i) {
               args[i].style.display = 'none';
            }
         }, fadeDuration);
      },

   hideToast: function () {
      var TOAST_TRANSITION_DURATION = 450;

      this.fadeOutElements(this.toastElement, 
         TOAST_TRANSITION_DURATION); 
   },

   startToastTransition: function (text, duration) {
      this.toastElement.innerHTML = text;
      this.fadeInElements(this.toastElement);
   },

   revealToast: function (text, duration) {
      var DEFAULT_TOAST_DURATION = 1000;

      duration = duration || DEFAULT_TOAST_DURATION;

      this.startToastTransition(text, duration);

      setTimeout( function (e) {
         snailBait.hideToast();
      }, duration);
   },

   // Animation.........................................................

   animate: function (now) { 
      if (snailBait.paused) {
         setTimeout( function () {
            requestNextAnimationFrame(snailBait.animate);
         }, snailBait.PAUSED_CHECK_INTERVAL);
      }
      else {
         snailBait.fps = snailBait.calculateFps(now); 
         snailBait.draw(now);
         snailBait.lastAnimationFrameTime = now;
         requestNextAnimationFrame(snailBait.animate);
      }
   },

   togglePausedStateOfAllBehaviors: function () {
      var behavior;
   
      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         for (var j=0; j < sprite.behaviors.length; ++j) {
            behavior = sprite.behaviors[j];

            if (this.paused) {
               if (behavior.pause) {
                  behavior.pause(sprite);
               }
            }
            else {
               if (behavior.unpause) {
                  behavior.unpause(sprite);
               }
            }
         }
      }
   },

   togglePaused: function () {
      var now = +new Date();

      this.paused = !this.paused;

      this.togglePausedStateOfAllBehaviors();

      if (this.paused) {
         this.pauseStartTime = now;
      }
      else {
         this.lastAnimationFrameTime += (now - this.pauseStartTime);
      }
   },

   // ------------------------- INITIALIZATION ----------------------------

   backgroundLoaded: function () {
      var LOADING_SCREEN_TRANSITION_DURATION = 2000;

      this.fadeOutElements(this.loadingElement, 
         LOADING_SCREEN_TRANSITION_DURATION);

      setTimeout ( function () {
         snailBait.startGame();
         snailBait.gameStarted = true;
      }, LOADING_SCREEN_TRANSITION_DURATION);
   },

   loadingAnimationLoaded: function () {
      if (!this.gameStarted) {
         this.fadeInElements(this.runnerAnimatedGIFElement,
          this.loadingTitleElement);
      }
   },

   initializeImages: function () {
      this.spritesheet.src = 'images/roughSpriteSheet.png';
	  this.background.src = 'images/background.png';
      this.runnerAnimatedGIFElement.src = 'images/splashScreenSketch.png';

      this.spritesheet.onload = function (e) {
         snailBait.backgroundLoaded();
      };

      this.runnerAnimatedGIFElement.onload = function () {
         snailBait.loadingAnimationLoaded();
      };
   },

   dimControls: function () {
      FINAL_OPACITY = 0.5;

      snailBait.instructionsElement.style.opacity = FINAL_OPACITY;
      snailBait.soundAndMusicElement.style.opacity = FINAL_OPACITY;
   },

   revealCanvas: function () {
      this.fadeInElements(this.canvas);
   },

   revealTopChrome: function () {
      this.fadeInElements(this.fpsElement,
       this.scoreElement);
   },

   revealTopChromeDimmed: function () {
      var DIM = 0.25;

      this.scoreElement.style.display = 'block';
      this.fpsElement.style.display = 'block';

      setTimeout( function () {
         snailBait.scoreElement.style.opacity = DIM;
         snailBait.fpsElement.style.opacity = DIM;
      }, this.SHORT_DELAY);
   },

   revealBottomChrome: function () {
      this.fadeInElements(this.soundAndMusicElement,
       this.instructionsElement,
       this.copyrightElement);
   },

   revealGame: function () {
      var DIM_CONTROLS_DELAY = 5000;

      this.revealTopChromeDimmed();
      this.revealCanvas();
      this.revealBottomChrome();

      setTimeout( function () {
         snailBait.dimControls();
         snailBait.revealTopChrome();
      }, DIM_CONTROLS_DELAY);
   },   

   revealInitialToast: function () {
      var INITIAL_TOAST_DELAY = 1500,
      INITIAL_TOAST_DURATION = 3000;

      setTimeout( function () {
         snailBait.revealToast('Collide with coins and jewels. ' +
           'Avoid bats and bees.', 
           INITIAL_TOAST_DURATION);
      }, INITIAL_TOAST_DELAY);
   },

   startGame: function () {
      this.revealGame();
   //   this.revealInitialToast();
      requestNextAnimationFrame(this.animate);
   },

};

// Event handlers.......................................................
window.checkKeyPress = function(e){
	var key = e.keyCode;

   if (key === 68 || key === 37) { // 'd' or left arrow
     snailBait.turnLeft();
	  snailBait.faceLeft = false;
   }
   else if (key === 75 || key === 39) { // 'k' or right arrow
     snailBait.turnRight();
	  snailBait.faceLeft = true;
   }
};

window.onkeydown = function (e) {
   var key = e.keyCode;

   if (key === 68 || key === 37) { // 'd' or left arrow
     snailBait.turnLeft();
	  snailBait.faceLeft = false;
   }
   else if (key === 75 || key === 39) { // 'k' or right arrow
     snailBait.turnRight();
	  snailBait.faceLeft = true;
   }
   else if (key === 80) { // 'p'
      snailBait.togglePaused();
   }
   else if (key === 74) { // 'j'
      snailBait.runner.jump();
   }
   else if (key === 83) { // 's'
      snailBait.hammerSwing();
   }
};
window.onkeyup = function (e) {
   var key = e.keyCode;

   if (key === 68 || key === 37) { // 'd' or left arrow
		snailBait.stopLeft();
   }
   else if (key === 75 || key === 39) { // 'k' or right arrow
      snailBait.stopRight();
   }
  
  // else if (key === 74) { // 'j'  //might have code to control jump height one day.
  //    snailBait.runner.jump();
  // }
};

window.onblur = function (e) {  // pause if unpaused
   snailBait.windowHasFocus = false;
   
   if ( ! snailBait.paused) {
      snailBait.togglePaused();
   }
};

window.onfocus = function (e) {  // unpause if paused
   var originalFont = snailBait.toastElement.style.fontSize,
       DIGIT_DISPLAY_DURATION = 1000; // milliseconds

       snailBait.windowHasFocus = true;
       snailBait.countdownInProgress = true;

       if (snailBait.paused) {
         snailBait.toastElement.style.font = '128px fantasy'; // Large font

      if (snailBait.windowHasFocus && snailBait.countdownInProgress)
         snailBait.revealToast('3', 500); // Display 3 for 0.5 seconds

      setTimeout(function (e) {
         if (snailBait.windowHasFocus && snailBait.countdownInProgress)
            snailBait.revealToast('2', 500); // Display 2 for 0.5 seconds

         setTimeout(function (e) {
            if (snailBait.windowHasFocus && snailBait.countdownInProgress)
               snailBait.revealToast('1', 500); // Display 1 for 0.5 seconds

            setTimeout(function (e) {
               if ( snailBait.windowHasFocus && snailBait.countdownInProgress)
                  snailBait.togglePaused();

               if ( snailBait.windowHasFocus && snailBait.countdownInProgress)
                  snailBait.toastElement.style.fontSize = originalFont;

               snailBait.countdownInProgress = false;

            }, DIGIT_DISPLAY_DURATION);

         }, DIGIT_DISPLAY_DURATION);

      }, DIGIT_DISPLAY_DURATION);
   }
};

// Launch game.........................................................

var snailBait = new SnailBait();

snailBait.initializeImages();
snailBait.createSprites();
