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

	// Generate Hero - Converts image to canvas; returns new canvas element
	let generateHero = function generateHero(image, heroImage, heroData) {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.id = "hero";
		let nameX = canvas.width / 2;
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
		// name
		context.font = 'bolder 56pt "kingthings_petrockregular"';
		context.textAlign = 'center';
		context.fillStyle = '#a72a0c';
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeText(heroData.name, nameX, 88);
		context.fillText(heroData.name, nameX, 88);
		// defense
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		context.lineWidth = 6;
		//context.font = '60pt "itchighlander_lt_bookbold"'
		context.font = '60pt "Arial Black"';
		context.fillStyle = '#d75e00';
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(heroData.defense, 180, 254);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(heroData.defense, 180, 254);
		// health
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		//context.font = '60pt "itchighlander_lt_bookbold"'
		context.font = '60pt "Arial Black"';
		context.fillStyle = '#3c315f';
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(heroData.health, 370, 254);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(heroData.health, 370, 254);
		// ability
		//context.font = '20pt "itchighlander_lt_bookbold"'
		context.font = 'bold 20pt "Trebuchet MS"';
		context.textAlign = 'center';
		context.fillStyle = 'black';
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		//context.strokeText(heroData.ability, 290, 322)
		context.fillText(heroData.ability.toUpperCase(), 290, 322);
		// description
		context.fillStyle = 'white';
		//context.font = '24pt "itchighlander_lt_bookregular"'
		context.font = '22pt "Trebuchet MS"';
		//context.font = '24pt "merienda_oneregular"'
		let maxWidth = 300;
		let lineHeight = 36;
		let x = 298;
		let y = 386;
		let text = heroData.description;
		wrapText(context, text, x, y, maxWidth, lineHeight);

		return convertCanvasToImage(canvas);
	};


	// Generate Monster - Converts image to canvas; returns new canvas element
	let generateMonster = function generateHero(image, heroImage, heroData) {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.id = "hero";
		let nameX = canvas.width / 2;
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
		// name
		context.font = 'bolder 56pt "kingthings_petrockregular"';
		context.textAlign = 'center';
		context.fillStyle = '#a72a0c';
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeText(heroData.name, nameX, 88);
		context.fillText(heroData.name, nameX, 88);
		// defense
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		context.lineWidth = 6;
		//context.font = '60pt "itchighlander_lt_bookbold"'
		context.font = '60pt "Arial Black"';
		context.fillStyle = '#d75e00';
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(heroData.defense, 180, 254);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(heroData.defense, 180, 254);
		// health
		context.shadowColor = "black";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 7;
		//context.font = '60pt "itchighlander_lt_bookbold"'
		context.font = '60pt "Arial Black"';
		context.fillStyle = '#3c315f';
		context.strokeStyle = 'white';
		context.shadowColor = "rgba( 0, 0, 0, 1 )";
		context.strokeText(heroData.health, 370, 254);
		context.shadowColor = "rgba( 0, 0, 0, 0 )";
		context.fillText(heroData.health, 370, 254);
		// ability
		//context.font = '20pt "itchighlander_lt_bookbold"'
		context.font = 'bold 20pt "Trebuchet MS"';
		context.textAlign = 'center';
		context.fillStyle = 'black';
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		//context.strokeText(heroData.ability, 290, 322)
		context.fillText(heroData.ability.toUpperCase(), 290, 322);
		// description
		context.fillStyle = 'white';
		//context.font = '24pt "itchighlander_lt_bookregular"'
		context.font = '22pt "Trebuchet MS"';
		//context.font = '24pt "merienda_oneregular"'
		let maxWidth = 300;
		let lineHeight = 36;
		let x = 298;
		let y = 386;
		let text = heroData.description;
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
			//remoteImg.setAttribute("id", "hero-src");
			//remoteImg.setAttribute("class","offscreen");
			remoteImg.src = (heroData.character === '' ? 'blank-image.png' : heroData.character);
			remoteImg.onload(function(){
				let newImage = generateHero(document.getElementById("placeholder-hero"), remoteImg, heroData);
				$('#hero-cards').append(newImage);
			});
			/*
			$("#hero-src").replaceWith(remoteImg);
			$("#hero-src").load(function(){
				let newImage = generateHero(document.getElementById("placeholder-hero"), document.getElementById("hero-src"), heroData);
				$('#hero-cards').append(newImage);
			});
			*/
			
		} else if (formId === 'monster-form') {
			
			let monsterData = getMonsterData();
			console.log(monsterData);

			let remoteImg = new Image();
			remoteImg.setAttribute('crossOrigin', 'anonymous');
			remoteImg.setAttribute("id", "monster-src");
			remoteImg.setAttribute("class","offscreen");
			remoteImg.src = (monsterData.picture === '' ? 'blank-image.png' : monsterData.picture);
			$("#monster-src").replaceWith(remoteImg);
			$("#monster-src").load(function(){
				let newImage = generateMonster(document.getElementById("placeholder-monster"), document.getElementById("monster-src"), monsterData);
				$('#hero-generator').append(newImage);
			});
		}

	});


	// monster model
	let getMonsterData = function getMonsterData() {
		return {
			name: $("#monster-name").val(),
			tier: $("#monster-tier").val(),
			picture: $("#monster-image").val(),
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
			character: $("#hero-image").val(),
			defense: $("#defense").val(),
			health: $("#health").val(),
			ability: $("#skill-name").val(),
			description: $("#skill-description").val()
		}
	};
		

	//"../images/AQ-Blank-Cards/Blank Card - Monster Melee Level 1.jpg"
	let pickPlaceholder = function pickPlaceholder(kind){
		let imageSrc = "../images/AQ-Blank-Cards/Blank Card - ";
		if (kind === 'monster') {
			imageSrc += "Monster " + $('#monster-attack-type').val() + ' Level ' +  $('#monster-level').val() + '.jpg';
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