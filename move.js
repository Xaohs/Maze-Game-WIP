function checkKey(e) {
    e = e || window.event;
    currentCell = document.querySelector('[where="here"]');
    currentCellId = currentCell.id;
    switch (e.keyCode) {
        case 38:
            moveUp(currentCellId, currentCell);
            break;
        case 40:
            moveDown(currentCellId, currentCell);
            break;
        case 37:
            moveLeft(currentCellId, currentCell);
            break;
        case 39:
            moveRight(currentCellId, currentCell);
            break;
        case 87:
            moveUp(currentCellId, currentCell);
            break;
        case 83:
            moveDown(currentCellId, currentCell);
            break;
        case 65:
            moveLeft(currentCellId, currentCell);
            break;
        case 68:
            moveRight(currentCellId, currentCell);
            break;

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
        currentCell.setAttribute("walked", "true");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
        correctMove(currentCell);
    } else if (nextCell.style.borderTop == "none" && nextCell.hasAttribute("type")) {
        finished();
    } else {
        console.log("U NO MOVE");
        console.log(currentCellId);
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
        currentCell.setAttribute("walked", "true");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
        correctMove(currentCell);
    } else if (nextCell.style.borderLeft == "none" && currentCell.style.borderRight == "none" && nextCell.hasAttribute("type")) {
        finished();
    } else {
        console.log("U NO MOVE");
        console.log(currentCellId);
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
        currentCell.setAttribute("walked", "true");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
        correctMove(currentCell);
    } else if (nextCell.style.borderTop == "none" && currentCell.style.borderBottom == "none" && nextCell.hasAttribute("type")) {
        finished();
    } else {
        console.log(nextCell.style.borderTop == "none");
        console.log("U NO MOVE");
        console.log(currentCellId);
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
        currentCell.setAttribute("walked", "true");
        currentCell.style.backgroundColor = color_CurrentCell;
        console.log(currentCellId);
        correctMove(currentCell);
    } else if (nextCell.style.borderRight == "none" && nextCell.hasAttribute("type")) {
        finished();
    } else {
        console.log("U NO MOVE");
        console.log(currentCellId);
    }
}

