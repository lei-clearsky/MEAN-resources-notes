function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board
  
  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};
    
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };
  
  //var cell00 = document.getElementById('0-0');
  //cell00.onclick = onCellClick;
  for (var y = 0; y < this.height; y ++) {
  	for (var x = 0; x < this.width; x ++) {
			var cellXY = document.getElementById(x + '-' + y);
			cellXY.onclick = onCellClick;
		}
  }
};

GameOfLife.prototype.forEach = function(func){
	for (var y = 0; y < this.height; y ++){
		for (var x = 0; x < this.width; x ++){
			var cellXY = document.getElementById(x + '-' + y);
			func(cellXY, x, y);
		}
	}
}

GameOfLife.prototype.countLives = function(x, y){
	//if (cellXY.getAttribute('data-status') == 'alive'){
		var liveCount = 0;
		for (var i = x - 1; i <= x + 1; i ++){
			for (var j = y - 1; j <= y +1; j ++){
				var cellNeighbor = document.getElementById(i + '-' + j);
				if (cellNeighbor && cellNeighbor.getAttribute('data-status') == 'alive')
						liveCount ++;
			}
		}
	//}
	return liveCount;
}

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
	
	var self = this;
	this.forEach(function(cellXY, x, y){
		if (cellXY.getAttribute('data-status') == 'alive'){
			var aliveCountNeighbor = self.countLives(x, y);
			if (aliveCountNeighbor < 3 || aliveCountNeighbor > 4){
				cellXY.setAttribute('data-status', 'dead');
				cellXY.className = 'dead';
			}
		};
		if (cellXY.getAttribute('data-status') == 'dead'){
			var aliveCountNeighbor = self.countLives(x, y);
			if (aliveCountNeighbor == 3){
				cellXY.setAttribute('data-status', 'alive');
				cellXY.className = 'alive';
			}
		};
	});
};
/*
GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
	for (var y = 0; y < this.height; y ++){
		for (var x = 0; x < this.width; x ++){
			var cellXY = document.getElementById(x + '-' + y);
			if (cellXY.getAttribute('data-status') == 'alive'){
				var liveCount = 0;
				for (var i = x - 1; i <= x + 1; i ++){
						for (var j = y - 1; j <= y +1; j ++){
							var cellNeighbor = document.getElementById(i + '-' + j);
							if (cellNeighbor){	
								if (cellNeighbor.getAttribute('data-status') == 'alive')
									liveCount ++;
							}
						}
				}
				if (liveCount < 3 || liveCount > 4){
					cellXY.setAttribute('data-status', 'dead');
					cellXY.className = 'dead';
				}
			}
			if (cellXY.getAttribute('data-status') == 'dead'){
				var liveCount = 0;
				for (var i = x - 1; i <= x + 1; i ++){
						for (var j = y - 1; j <= y +1; j ++){
							var cellNeighbor = document.getElementById(i + '-' + j);
							if(cellNeighbor){
								if (cellNeighbor.getAttribute('data-status') == 'alive')
									liveCount ++;
							}
						}
				}
				if (liveCount == 3){
					cellXY.setAttribute('data-status', 'alive');
					cellXY.className = 'alive';
				}
			}
		}
	}  
};
*/
GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
	var self = this;
	setInterval(function(){
		self.step();
	}, 5000);
};

var gol = new GameOfLife(20,20);
gol.createAndShowBoard();
gol.enableAutoPlay();
