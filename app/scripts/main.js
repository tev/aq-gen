$(function() {
	// ---- CANVAS UTILS ----

	// Scale image
	let scaleImageToFit = function scaleImageToFit(imgWidth, imgHeight, maxWidth, maxHeight) {
		let ratio = 0;
		if (imgWidth > imgHeight)
			ratio = maxWidth / imgWidth;
		else
			ratio = maxHeight / imgHeight;
		return [imgWidth * ratio, imgHeight * ratio];
	};

	// Wrap canvas text
	let wrapText = function wrapText(context, text, x, y, maxWidth, lineHeight) {
		let words = text.split(' ');
		let line = '';
		for (let n = 0; n < words.length; n++) {
			let testLine = line + words[n] + ' ';
			let metrics = context.measureText(testLine);
			let testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			} else {
				line = testLine;
			}
		}
		context.fillText(line, x, y);
	};

	let darkText = '#222222';
	let numberFont = '56pt "Highlander Std Bold"';
	let titleFont = 'bolder 56pt "kingthings_petrockregular"';

	let numberText = function numberText(context, number, color, x, y) {
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		context.lineWidth = 6;
		context.font = numberFont;
		context.fillStyle = color;
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(number, x, y);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(number, x, y);

		return context;
	};

	let nameText = function nameText(context, name, color, x, y) {
		context.font = titleFont;
		context.textAlign = 'center';
		context.fillStyle = color;
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeText(name, x, y);
		context.fillText(name, x, y);

		return context;
	};

	// Generate Hero - Converts image to canvas; returns new canvas element
	let generateHero = function generateHero(image, heroImage, heroData) {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.id = "hero";
		let centerX = canvas.width / 2;
		let context = canvas.getContext("2d");

		// background
		context.drawImage(image, 0, 0);
		
		// hero
		let heroW = 500;
		let heroH = 500;
		let resizedImage = scaleImageToFit(heroImage.width, heroImage.height, heroW, heroH);
		let heroX = ((heroW - resizedImage[0]) / 2) + 490;
		let heroY = ((heroH - resizedImage[1]) / 2) + 160;
		context.drawImage(heroImage, 0, 0, heroImage.width, heroImage.height, heroX, heroY, resizedImage[0], resizedImage[1]);

		context = nameText(context, heroData.name, '#a72a0c', centerX, 88); // name
		context = numberText(context, heroData.defense, '#d75e00', 173, 250); // defense
		context = numberText(context, heroData.health, '#3c315f', 365, 250); // health

		// ability
		context.font = 'small-caps 24pt "Highlander Std Bold"';
		context.textAlign = 'center';
		context.fillStyle = darkText;
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		context.fillText(heroData.ability, 290, 322);

		// description
		context.fillStyle = 'white';
		context.font = '24pt "Highlander Std Book"';
		let maxWidth = 300;
		let lineHeight = 36;
		let x = 298;
		let y = 386;
		let text = heroData.description;
		wrapText(context, text, x, y, maxWidth, lineHeight);

		return convertCanvasToImage(canvas);
	};


	// Generate Monster
	let generateMonster = function generateMonster(blankCard, monsterImage, monsterData) {
		let canvas = document.createElement("canvas");
		canvas.width = blankCard.width;
		canvas.height = blankCard.height;
		canvas.id = "monster";
		let centerX = canvas.width / 2;
		let context = canvas.getContext("2d");

		// background
		context.drawImage(blankCard, 0, 0);

		// monster
		let monsterW = 500;
		let monsterH = 500;
		let resizedImage = scaleImageToFit(monsterImage.width, monsterImage.height, monsterW, monsterH);
		let monsterX = ((monsterW - resizedImage[0]) / 2) + 190;
		let monsterY = ((monsterH - resizedImage[1]) / 2) + 160;
		context.drawImage(monsterImage, 0, 0, monsterImage.width, monsterImage.height, monsterX, monsterY, resizedImage[0], resizedImage[1]);

		// overlays
		let typeOverlay = document.getElementById("monster-" + monsterData.attackType.toLowerCase() + "-src");
		let defenseOverlay = document.getElementById("monster-defense-src");
		context.drawImage(typeOverlay, 0, 0);
		if (monsterData.defense !== '' && monsterData.defense !== '0' && monsterData.defense !== 0) {
			context.drawImage(defenseOverlay, 0, 0);
		}


		let nameColor = '#BC6A42';
		switch (monsterData.level) {
			case "1":
				nameColor = '#d75e00';
				break;
			case "2-3":
				nameColor = '#7C3A2C';
				break;
			case "4-5":
				nameColor = '#5C3F51';
				break;
			case "6":
				nameColor = '#3C265D';
				break;
		}
		context = nameText(context, monsterData.name, nameColor, centerX, 88); // name
		
		// tier
		context.font = 'bolder 32pt "kingthings_petrockregular"';
		context.textAlign = 'center';
		context.fillStyle = nameColor;
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeText(monsterData.tier, centerX, 140);
		context.fillText(monsterData.tier, centerX, 140);

		context = numberText(context, monsterData.gold, '#346391', 620, 227);  // reward
		context = numberText(context, monsterData.health, '#3c315f', 118, 227);  // health
		context = numberText(context, monsterData.overkill, '#2F281E', 118, 340);  // overkill
		if (monsterData.defense !== '' && monsterData.defense !== '0' && monsterData.defense !== 0) {
			context = numberText(context, monsterData.defense, '#d75e00', 118, 454);  // defense
		}
		context = numberText(context, monsterData.movement, '#c93e65', 118, 740);  // move
		context = numberText(context, monsterData.attack, '#B83D2B', 585, 740);  // attack

		// ability
		context.font = 'small-caps 32pt "Highlander Std Bold"';
		context.textAlign = 'center';
		context.fillStyle = darkText;
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		context.fillText(monsterData.ability, centerX, 773);
		// description
		context.fillStyle = 'white';
		context.font = '24pt "Highlander Std Book"';
		let maxWidth = 500;
		let lineHeight = 36;
		let x = centerX;
		let y = 840;
		let text = monsterData.description;
		wrapText(context, text, x, y, maxWidth, lineHeight);

		return convertCanvasToImage(canvas);
	};


	// Generate Quest
	let generateQuest = function generateQuest(image, questImage, questData) {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.id = "quest";
		let centerX = canvas.width / 2;
		let context = canvas.getContext("2d");
		// background
		context.drawImage(image, 0, 0);
		// quest
		let questW = 500;
		let questH = 500;
		let resizedImage = scaleImageToFit(questImage.width, questImage.height, questW, questH);
		let questX = ((questW - resizedImage[0]) / 2) + 150;
		let questY = ((questH - resizedImage[1]) / 2) + 360;
		context.drawImage(questImage, 0, 0, questImage.width, questImage.height, questX, questY, resizedImage[0], resizedImage[1]);
		// name
		context.font = 'bolder 56pt "kingthings_petrockregular"';
		context.textAlign = 'center';
		context.fillStyle = '#5B4C2D';
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeText(questData.name, centerX, 200);
		context.fillText(questData.name, centerX, 200);
		// description
		context.fillStyle = 'white';
		context.font = '24pt "Highlander Std Book"';
		let maxWidth = 500;
		let lineHeight = 36;
		let x = centerX;
		let y = 1010;
		let text = questData.description;
		wrapText(context, text, x, y, maxWidth, lineHeight);

		return convertCanvasToImage(canvas);
	};


	// Generate upgrade - Converts image to canvas; returns new canvas element
	let generateUpgrade = function generateUpgrade(blankCard, upgradeImage, upgradeData) {
		let canvas = document.createElement("canvas");
		canvas.width = blankCard.width;
		canvas.height = blankCard.height;
		canvas.id = "upgrade";
		let centerX = canvas.width / 2;
		let context = canvas.getContext("2d");
		let yOffset = 0;

		// background
		context.drawImage(blankCard, 0, 0);

		// upgrade
		let upgradeW = 300;
		let upgradeH = 300;
		let resizedImage = scaleImageToFit(upgradeImage.width, upgradeImage.height, upgradeW, upgradeH);
		let upgradeX = ((upgradeW - resizedImage[0]) / 2) + 70;
		let upgradeY = ((upgradeH - resizedImage[1]) / 2) + 130;
		context.drawImage(upgradeImage, 0, 0, upgradeImage.width, upgradeImage.height, upgradeX, upgradeY, resizedImage[0], resizedImage[1]);

		let nameColor = '#a72a0c';
		switch (upgradeData.type) {
			case "Melee":
				nameColor = '#B83D2B';
				break;
			case "Ranged":
				nameColor = '#B83D2B';
				break;
			case "Boost":
				nameColor = '#32531E';
				break;
			case "Permanent":
				nameColor = '#171345';
				break;
		}

		if (upgradeData.subname !== '') {
			yOffset = -10;
		}

		// name
		//context.font = 'bolder 32pt "kingthings_petrockregular"';
		context.font = 'small-caps 32pt "Highlander Std Bold"';
		context.textAlign = 'center';
		context.fillStyle = nameColor;
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		//context.strokeText(upgradeData.name, centerX, 70);
		context.fillText(upgradeData.name, centerX, 70 + yOffset);

		if (upgradeData.subname !== '') {
			context.font = 'italic small-caps 24pt "Highlander Std Book"';
			context.textAlign = 'center';
			context.fillStyle = nameColor;
			context.strokeStyle = 'white';
			context.lineWidth = 3;
			//context.strokeText(upgradeData.name, centerX, 70);
			context.fillText(upgradeData.subname, centerX, 100);
		}
		
		// cost
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		context.lineWidth = 4;
		context.font = '40pt "Highlander Std Bold"';
		context.fillStyle = '#346391';
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(upgradeData.cost, 105, 155);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(upgradeData.cost, 105, 155);

		if (upgradeData.type === 'Melee' || upgradeData.type === 'Ranged') {
			context = numberText(context, upgradeData.attack, '#B83D2B', 335, 470);  // attack
		}
		yOffset = 0;
		if (upgradeData.type === 'Boost') {
			yOffset = 36;
		}

		// ability
		context.font = 'small-caps 24pt "Highlander Std Bold"';
		context.textAlign = 'left';
		context.fillStyle = darkText;
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		context.fillText(upgradeData.category, 75, 478 + yOffset);

		// description
		if (upgradeData.type === 'Boost' || upgradeData.type === 'Permanent') {
			context.fillStyle = 'white';
		} else {
			context.lineWidth = 3;
			context.fillStyle = darkText;
		}
		context.textAlign = 'center';
		context.font = '20pt "Highlander Std Book"';
		let maxWidth = 360;
		let lineHeight = 32;
		let x = centerX;
		let y = 532 + yOffset;
		let text = upgradeData.description;
		wrapText(context, text, x, y, maxWidth, lineHeight);

		return convertCanvasToImage(canvas);
	};

	let convertCanvasToImage = function convertCanvasToImage(canvas) {
		let image = new Image();
		image.src = canvas.toDataURL("image/png");
		return image;
	}
		
	// ----- UI UTILS -----
	let activePanel = function activePanel(panelName) {
		$('#main-selection li').removeClass('active').find("a[data-panel='" + panelName + "']").parent().addClass('active');
		$('.generator-panel').hide();
		$('#' + panelName + '-generator').show();
	};

	$( "#main-selection" ).on( "click", "a", function(e) {
		e.preventDefault();
		activePanel($( this ).data('panel'));
	});

	$("form").on("submit", function(e) {

		e.preventDefault();
		let formId = this.id;
		if (formId === 'hero-form') {
			let heroData = getHeroData();
			let remoteImg = new Image();
			remoteImg.crossOrigin = "anonymous";
			remoteImg.onload = function(){
				let newImage = generateHero(document.getElementById("placeholder-hero"), remoteImg, heroData);
				$('#hero-cards').append(newImage);
			};
			remoteImg.src = (heroData.image === '' ? 'blank-image.png' : heroData.image);
			
		} else if (formId === 'monster-form') {
			
			let monsterData = getMonsterData();
			let remoteImg = new Image();
			remoteImg.crossOrigin = "anonymous";
			remoteImg.onload = function(){
				let newImage = generateMonster(document.getElementById("placeholder-monster"), remoteImg, monsterData);
				$('#monster-cards').append(newImage);
			};
			remoteImg.src = (monsterData.image === '' ? 'blank-image.png' : monsterData.image);

			console.log(monsterData);

		} else if (formId === 'quest-form') {
			
			let questData = getQuestData();
			let remoteImg = new Image();
			remoteImg.crossOrigin = "anonymous";
			remoteImg.onload = function(){
				let newImage = generateQuest(document.getElementById("placeholder-quest"), remoteImg, questData);
				$('#quest-cards').append(newImage);
			};
			remoteImg.src = (questData.image === '' ? 'blank-image.png' : questData.image);

			console.log(questData);

		} else if (formId === 'upgrade-form') {
			
			let upgradeData = getUpgradeData();
			let remoteImg = new Image();
			remoteImg.crossOrigin = "anonymous";
			remoteImg.onload = function(){
				let newImage = generateUpgrade(document.getElementById("placeholder-upgrade"), remoteImg, upgradeData);
				$('#upgrade-cards').append(newImage);
			};
			remoteImg.src = (upgradeData.image === '' ? 'blank-image.png' : upgradeData.image);

			console.log(upgradeData);
		}

	});


	// monster model
	let getMonsterData = function getMonsterData() {
		return {
			name: $("#monster-name").val(),
			tier: $("#monster-tier").val(),
			image: $("#monster-image").val(),
			health: $("#monster-health").val(),
			overkill: $("#monster-overkill").val(),
			defense: $("#monster-defense").val(),
			gold: $("#monster-reward").val(),
			movement: $("#monster-movement").val(),
			level: $("#monster-level").val(),
			attack: $("#monster-attack").val(),
			ability: $("#monster-skill-name").val(),
			description: $("#monster-skill-description").val(),
			attackType: $("#monster-attack-type").val()
		}
	};

	// hero model
	let getHeroData = function getHeroData() {
		return {
			name: $("#hero-name").val(),
			image: $("#hero-image").val(),
			defense: $("#defense").val(),
			health: $("#health").val(),
			ability: $("#skill-name").val(),
			description: $("#skill-description").val()
		}
	};

	// quest model
	let getQuestData = function getQuestData() {
		return {
			name: $("#quest-name").val(),
			image: $("#quest-image").val(),
			description: $("#quest-description").val()
		}
	};

	// upgrade model
	let getUpgradeData = function getUpgradeData() {
		return {
			name: $("#upgrade-name").val(),
			subname: $("#upgrade-subname").val(),
			image: $("#upgrade-image").val(),
			cost: $("#upgrade-cost").val(),
			type: $("#upgrade-type").val(),
			level: $("#upgrade-level").val(),
			category: $("#upgrade-category").val(),
			attack: $("#upgrade-attack").val(),
			description: $("#upgrade-description").val()
		}
	};
		

	//"../images/AQ-Blank-Cards/Blank Card - Monster Melee Level 1.jpg"
	let pickPlaceholder = function pickPlaceholder(kind){
		let imageSrc = "../images/AQ-Blank-Cards/Blank Card - ";
		if (kind === 'monster') {
			imageSrc = "../images/monster-level-" + $('#monster-level').val() + '.jpg';
		}
		if (kind === 'upgrade') {
			imageSrc += "Upgrade ";
			if ($('#upgrade-type').val() === 'Melee' || $('#upgrade-type').val() === 'Ranged') {
				imageSrc += 'Attack ';
			}
			imageSrc += $('#upgrade-type').val() + '.jpg';
		}
		$("#placeholder-" + kind).attr("src",imageSrc);
		console.log(imageSrc);
	};

	$( "#monster-attack-type,#monster-level" ).on( "change", function() {
		pickPlaceholder('monster');
	});

	$( "#upgrade-type" ).on( "change", function() {
		pickPlaceholder('upgrade');
	});

	activePanel('hero');

});