var oldOnLoad = window.onload;
window.onload = function() {
	oldOnLoad();
	console.log('hai');
	var gui = new dat.GUI();
	var jump = gui.addFolder('Jump');
	jump.add(g, 'jumpHeight');
	jump.add(g, 'jumpSpace');
	jump.add(g, 'jumpIntervalTime');

	var move = gui.addFolder('Move');
	move.add(g, 'moveSpace');
	move.add(g, 'moveTime');

	jump.open();
};