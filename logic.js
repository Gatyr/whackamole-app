$(document).ready(function() {
	let userScore = 0; 
	let prevScore;
	let bestScore;
	let timeLeft = 20;

	let startTimes = [1000, 2000, 2500, 3000, 4000, 4500, 5000, 6000, 6750];
	let interimTimes = [2000, 3000, 3500, 4000, 4500, 5000, 6000]
	let durationTimes = [1000, 1500, 2000, 2500, 3000];

	function getTimes() {
		let total = 0;
		let intervals = [];
		let tempArray = [];
		let x;
		let y; 
		let tempX = 0; 
		let tempY = 0;
		let sum = 16000;
		while (total < sum) {
			if (intervals.length === 0) {
				//if intervals is empty, pull random index from start times for initial time to hide the mole

				//doing this to help with pacing of game so that different tiles don't change at same time during 
				//the start of the game
				
				x = Math.floor(Math.random()*startTimes.length);
				y = Math.floor(Math.random()*5);
				//keep track of total so that time adds up to at least length of game
				total += startTimes[x];
				total += durationTimes[y];
				//keep track of duration up until this point so that changeState is later
				//called at correct times
				tempX = startTimes[x] + tempY;
				tempY = durationTimes[y] + tempX;
				//create array for this iteration of hide/show cycle
				tempArray = [tempX, tempY];
				//push that array to intervals array
				intervals.push(tempArray)
				//pull the index that was used for first hidden duration
				startTimes.splice(x, 1);
			} else {
				//if intervals isn't empty, do all of the same stuff except pull from interim times
				x = Math.floor(Math.random()*7);
				y = Math.floor(Math.random()*5);

				total += interimTimes[x];
				total += durationTimes[y];

				tempX = interimTimes[x] + tempY;
				tempY = durationTimes[y] + tempX;

				tempArray = [tempX, tempY];

				intervals.push(tempArray)
			}
		}
		return intervals;
	}

	function changeToHidden(id) {
		$("#"+id).attr("data-state", "hidden");
		$("#"+id).attr("src", "hidden.jpeg");
	}

	function changeToShowing(id) {
		$("#"+id).attr("data-state", "showing");
		$("#"+id).attr("src", "showing.jpeg");
	}

	function mole(id) {
		this.id = id;
		this.hidden = true;
		this.intervals = getTimes();
	}

	var mole1 = new mole(1);
	var mole2 = new mole(2);
	var mole3 = new mole(3);
	var mole4 = new mole(4);
	var mole5 = new mole(5);
	var mole6 = new mole(6);
	var mole7 = new mole(7);
	var mole8 = new mole(8);
	var mole9 = new mole(9);

	$("img").on("click", function() {
		let id = $(this).attr('id');
		if ($(this).attr("data-state") === "showing") {
			userScore += 1;
			$("#score").empty();
			$("#score").append(userScore);
			changeToHidden(id);
		} 
	});

	function display(mole) {
		console.log(mole);
		let id = mole.id;
		let timePassed;
		length = mole.intervals.length;

		for (i=0; i<length; i++) {
			setTimeout(function() {
				changeToShowing(id)
			}, mole.intervals[i][0]);
			setTimeout(function() {
				changeToHidden(id)
			}, mole.intervals[i][1]);
		} 
		
		
	}
	
	function startGame() {
		display(mole1);
		display(mole2);
		display(mole3);
		display(mole4);
		display(mole5);
		display(mole6);
		display(mole7);
		display(mole8);
		display(mole9);


		let timer = setInterval(function() {
			if (timeLeft > 0) {
				timeLeft -=1;
				$("#time-left").empty();
				$("#time-left").append(timeLeft);
			}
			if (timeLeft === 0) {
				prevScore = userScore;
				$("#previous-score").empty();
				$("#previous-score").append(prevScore);
				stopTimer();
			}
		}, 1000);
		function stopTimer() {
			clearInterval(timer);
			timeLeft = 20; 
			$("#time-left").empty();
			$("#time-left").append(timeLeft);
			userScore = 0;
			$("#score").empty();
			$("#score").append(userScore);
		}
	}

	$("button").on("click", startGame);
});