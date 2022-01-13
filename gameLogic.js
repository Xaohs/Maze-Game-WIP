var level = 1;
var size = 4;
var points = 0;
function finished() {
	level++
	points = points + 5;
	size++
	document.getElementById("level").innerHTML = "Level " + level;
	document.getElementById("points").innerHTML = "Points: " + points;
	document.getElementById("maze_container").innerHTML = "";
	paint(size, size);
}
function correctMove(cell) {
	if (cell.hasAttribute("walked")) {
		points++;
		document.getElementById("points").innerHTML = "Points: " + points;
	}

}