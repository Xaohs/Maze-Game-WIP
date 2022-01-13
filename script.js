color_MovedCell = "#32a86f";
color_CurrentCell = "#0a3bff";
color_EmptyCells = "#171717";

mazeWidth = 7;
mazeHeight = 7;
noWallArray = [];
paint();
document.onkeydown = checkKey;
noWall = document.querySelectorAll('[occupied]');
noWall.forEach(element => {
    noWallArray.push(element.id);
});
function checkKey(e) {
    e = e || window.event;
    currentCell = document.querySelector('[where="here"]');
    currentCellId = currentCell.id;
    if (e.keyCode == '38') {
        moveUp(currentCellId, currentCell);
    }
    else if (e.keyCode == '40') {
        moveDown(currentCellId, currentCell);
    }
    else if (e.keyCode == '37') {
        moveLeft(currentCellId, currentCell);
    }
    else if (e.keyCode == '39') {
        moveRight(currentCellId, currentCell);
    }
}
function paint() {
    createBlankMaze();
    createExit();
    function createBlankMaze() {
        var rowIndex, colIndex;
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        for (rowIndex = 1; rowIndex <= mazeHeight; rowIndex++) {
            var row = document.createElement("tr");
            for (colIndex = 1; colIndex <= mazeWidth; colIndex++) {
                var col = document.createElement("td");
                if (rowIndex == 1 && colIndex == 1) {
                    col.style.backgroundColor = color_CurrentCell;
                    col.setAttribute("type", "start");
                    col.setAttribute("where", "here");
                } else if (rowIndex == mazeHeight && colIndex == mazeWidth) {
                    col.style.backgroundColor = "rgb(0,244,0, 0.5)"
                    col.setAttribute("type", "finish");
                } else {
                    col.style.backgroundColor = color_EmptyCells;
                }
                col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);
                row.appendChild(col);
            }
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        document.getElementById("maze_container").appendChild(table);
    }
    function createExit() {
        var startAtRow = 1;
        var startAtCol = 1;
        var currentCell;
        addRoute(startAtRow, startAtCol, false);
        for (n = 1; n < (mazeWidth * mazeHeight) - 1; n++) {
            var currentCell = document.getElementById("cell_" + startAtRow + "_" + startAtCol);   
            if (currentCell.getAttribute("occupied") == "true") {
                addRoute(startAtRow, startAtCol, true);
            }
            if (startAtCol == mazeWidth) {      
                startAtRow++;
                startAtCol = 1;
            } else {
                startAtCol++;
            }
        }
    }
    function addRoute(startAtRow, startAtCol, createDetour) {
        var validExits = ["right", "bottom", "left", "top"];
        var remainingExits = {"right": mazeWidth, "bottom": mazeHeight, "left": 0, "top": 0};
        var nextExits = [];
        var lastCells= [];
        var rowIndex = startAtRow;
        var colIndex = startAtCol;
        var currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
        var exit;
        var lastExit;
        var exitIndex;
        var loop = 0;
        var loopFuse = 0;
        var maxLoops = 3 * mazeWidth * mazeHeight;
        var nextPossibleCell;
        while (loop < ((mazeWidth * mazeHeight) - 1)) {
            loopFuse++;
            if (loopFuse >= maxLoops) {break;}
            nextExits = [];
            for (i = 0; i < validExits.length; i++) {
                switch(validExits[i]) {
                    case "right":
                        nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex + 1));
                        break;
                    case "left":
                        nextPossibleCell = document.getElementById("cell_" + rowIndex + "_" + (colIndex - 1));
                        break;
                    case "bottom":
                        nextPossibleCell = document.getElementById("cell_" + (rowIndex + 1) + "_" + colIndex);
                        break;
                    case "top":
                        nextPossibleCell = document.getElementById("cell_" + (rowIndex - 1) + "_" + colIndex);
                        break;
                }
                if (nextPossibleCell != null) {
                    if (nextPossibleCell.getAttribute("occupied") != "true") {   
                        for (t = 0; t < remainingExits[validExits[i]]; t++) {
                            nextExits.push(validExits[i]);
                        }
                    }
                } 
            }
            if (nextExits.length == 0) {
                if (createDetour == true) {
                    return false;
                } else {    
                    lastCells.splice(lastCells.length - 1, 1);
                    rowIndex = lastCells[lastCells.length - 1][0];
                    colIndex = lastCells[lastCells.length - 1][1];
                    currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
                    continue;
                }
            } 
            exitIndex = Math.floor(Math.random() * Math.floor(nextExits.length));
            exit = nextExits[exitIndex];
            if (createDetour == false) {
                currentCell.style["border-"+exit] = "none";
            } else {
                if (!(exit == "right" && colIndex == mazeWidth - 1 && rowIndex == mazeHeight) &&
                    !(exit == "bottom" && colIndex == mazeWidth && rowIndex == mazeHeight - 1) ) {
                    currentCell.style["border-"+exit] = "none";
                }
            }
            switch(exit) {
                case "right":
                    colIndex = colIndex + 1;
                    remainingExits.left++;
                    remainingExits.right--;
                    break;
                case "bottom":

                    rowIndex = rowIndex + 1;
                    remainingExits.top++;
                    remainingExits.bottom--;
                    break;
                case "left":
                    colIndex = colIndex - 1;
                    remainingExits.left--;
                    remainingExits.right++;
                    break;
                case "top":
                    rowIndex = rowIndex - 1;
                    remainingExits.top--;
                    remainingExits.bottom++;
                    break;     
            }
            lastCells.push([rowIndex, colIndex]);
            currentCell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
            switch(exit) {
                case "right":
                    currentCell.style["border-left"] = "none";
                    break;
                case "bottom":
                    currentCell.style["border-top"] = "none";
                    break;
                case "left":
                    currentCell.style["border-right"] = "none";
                    break;
                case "top":
                    currentCell.style["border-bottom"] = "none";
                    break;
            }
            if (rowIndex == mazeHeight && colIndex == mazeWidth) {
                break;
            }
            currentCell.setAttribute("occupied", "true");
            lastExit = exit;
            loop++;

        }

    }  
}
function moveUp(currentCellId, currentCell) {
    split = currentCellId.split('_');
    split[1]--;
    let nextCell = document.getElementById("cell" + "_" + split[1] + "_" + split[2]);
    if (noWallArray.includes("cell" + "_" + split[1] + "_" + split[2]) && nextCell.style.borderBottom == "none") {
        currentCell.removeAttribute("where", "here");
        currentCell.style.backgroundColor = color_MovedCell;
        currentCellId = "cell" + "_" + split[1] + "_" + split[2];
        currentCell = document.getElementById(currentCellId);
        currentCell.setAttribute("where", "here");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
    } else if (nextCell.style.borderTop == "none" && nextCell.hasAttribute("type")) {
        console.log("lol");
    } else {
        console.log("U NO MOVE");
    }
}
function moveRight(currentCellId, currentCell) {
    split = currentCellId.split('_');
    split[2]++;
    let nextCell = document.getElementById("cell" + "_" + split[1] + "_" + split[2]);
    if (noWallArray.includes("cell" + "_" + split[1] + "_" + split[2]) && nextCell.style.borderLeft == "none") {
        currentCell.removeAttribute("where", "here");
        currentCell.style.backgroundColor = color_MovedCell;
        currentCellId = "cell" + "_" + split[1] + "_" + split[2];
        currentCell = document.getElementById(currentCellId);
        currentCell.setAttribute("where", "here");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
    } else if (nextCell.style.borderLeft == "none" && nextCell.hasAttribute("type")) {
        console.log("lol");
    } else {
        console.log("U NO MOVE");
    }
}
function moveDown(currentCellId, currentCell) {
    split = currentCellId.split('_');
    split[1]++
    let nextCell = document.getElementById("cell" + "_" + split[1] + "_" + split[2]);
    if (noWallArray.includes("cell" + "_" + split[1] + "_" + split[2]) && nextCell.style.borderTop == "none") {
        currentCell.removeAttribute("where", "here");
        currentCell.style.backgroundColor = color_MovedCell;
        currentCellId = "cell" + "_" + split[1] + "_" + split[2];
        currentCell = document.getElementById(currentCellId);
        currentCell.setAttribute("where", "here");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
    } else if (nextCell.style.borderTop == "none" && nextCell.hasAttribute("type")) {
        console.log("lol");
    } else {
        console.log(nextCell.style.borderTop == "none");
        console.log("U NO MOVE");
    }
}
function moveLeft(currentCellId, currentCell) {
    split = currentCellId.split('_');
    split[2]--
    let nextCell = document.getElementById("cell" + "_" + split[1] + "_" + split[2]);
    if (noWallArray.includes("cell" + "_" + split[1] + "_" + split[2]) && nextCell.style.borderRight == "none") {
        currentCell.removeAttribute("where", "here");
        currentCell.style.backgroundColor = color_MovedCell;
        currentCellId = "cell" + "_" + split[1] + "_" + split[2];
        currentCell = document.getElementById(currentCellId);
        currentCell.setAttribute("where", "here");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
    } else if (nextCell.style.borderRight == "none" && nextCell.hasAttribute("type")) {
        console.log("lol");
    } else {
        console.log("U NO MOVE");
    }
}

