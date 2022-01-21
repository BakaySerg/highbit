if(window.matchMedia('(min-width: 1200px)').matches){
	let canvas    = document.getElementById('canvas'),
			ctx       = canvas.getContext('2d'),
			perlin    = new ClassicalNoise(),
			variation = .00136,
			amp       = 1029,
			variators = [],
			max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
			canvasWidth,
			canvasHeight,
			start_y;

	for (let i = 0, u = 0; i < max_lines; i++, u+=.04) {
		variators[i] = u;
	}

	function draw(){
		ctx.shadowColor = "rgba(43, 205, 255, 1)";
		ctx.shadowBlur = 0;

		for (let i = 0; i <= max_lines; i++){
			ctx.beginPath();
			ctx.moveTo(0, start_y);
			for (let x = 0; x <= canvasWidth; x++) {
				var y = perlin.noise(x*variation+variators[i], x*variation, 0);
				ctx.lineTo(x, start_y + amp*y);
			}
			let color = Math.floor(162*Math.abs(y));
			let alpha = Math.min(Math.abs(y)+0.07, .0564);
			ctx.strokeStyle = "rgba(255,255,255,"+alpha*2+")";
			ctx.stroke();
			ctx.closePath();

			variators[i] += .0029;
		}
	}

	(function init() {
		resizeCanvas();
		animate();
		window.addEventListener('resize', resizeCanvas);
	})();

	function animate() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		draw();
		requestAnimationFrame(animate);
	}

	function resizeCanvas(){
		canvasWidth = document.documentElement.clientWidth,
		canvasHeight = document.documentElement.clientHeight;

		canvas.setAttribute("width", canvasWidth);
		canvas.setAttribute("height", canvasHeight);

		start_y = canvasHeight/2;
	}
}