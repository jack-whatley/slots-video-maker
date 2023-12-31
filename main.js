let contents = ["cherry", "diamond", "bell", "clover", "dollar"];
let reelContainers = document.querySelectorAll(".slot-row");

let stopMoving = false;
let numberOfWrong = [0, 0, 0];
const params = new URLSearchParams(window.location.search);
let target = ["cherry", "cherry", "cherry"];

target = params.get("target").split(",");
console.log(target);

document.getElementById("out-one").innerHTML = target[0];
document.getElementById("out-two").innerHTML = target[1];
document.getElementById("out-three").innerHTML = target[2];

let moveReel = reelIndex => {
	let selected = reelContainers[reelIndex];
	let item = getReelItem(reelIndex);
	if (stopMoving && selected.firstChild.id === target[reelIndex]) numberOfWrong[reelIndex] = 0;
	if (stopMoving && selected.children[1].id === target[reelIndex]) { return; }
	else if (stopMoving && item.id !== target[reelIndex]) numberOfWrong[reelIndex]++;
	selected.prepend(item);
	if (selected.children.length > 3) {
		selected.lastElementChild.lastElementChild.classList.add("fade-out");
		setTimeout(() => { selected.removeChild(selected.lastElementChild); }, 250);
	}
}

let getReelItem = reelIndex => {
	let newReel = document.createElement("div");
	let reelImage = document.createElement("img");
	let name = contents[Math.floor(Math.random() * contents.length)];
	if (stopMoving && numberOfWrong[reelIndex] > 2) name = target[reelIndex];
	reelImage.src = `/slot-icons/${name}.svg`;
	newReel.appendChild(reelImage);
	newReel.classList.add("slot-item");
	newReel.id = `${name}`;
	return newReel;
}

let animationActive = true;
let index = 0;
let total = 0;
let counter = 0;

let spinReels = (delta) => {
	if (animationActive === false) { requestAnimationFrame(spinReels); return; }

	total += delta / 1000;

	if (total > 1250) {
		if (counter >= 7) {
			moveReel(index);
			index++;
			if (index === reelContainers.length) index = 0;
			counter = 0;
			stopMoving = true;
		}
	}
	else if (total > 1000) {
		if (counter >= 5) {
			moveReel(index);
			index++;
			if (index === reelContainers.length) index = 0;
			counter = 0;
		}
	}
	else if (total > 750) {
		if (counter >= 4) {
			moveReel(index);
			index++;
			if (index === reelContainers.length) index = 0;
			counter = 0;
		}
	}
	else if (total > 500) {
		if (counter >= 3) {
			moveReel(index);
			index++;
			if (index === reelContainers.length) index = 0;
			counter = 0;
		}
	}
	else if (total > 250) {
		if (counter >= 2) {
			moveReel(index);
			index++;
			if (index === reelContainers.length) index = 0;
			counter = 0;
		}
	}
	else {
		moveReel(index);
		index++;
		if (index === reelContainers.length) index = 0;
	}

	counter++;

	if (stopMoving && reelContainers[0].children[1].id === target[0] && reelContainers[1].children[1].id === target[1] && reelContainers[2].children[1].id === target[2]) {
		animationActive = false;
		total = 0;
	}

	requestAnimationFrame(spinReels);
}

document.getElementById("start-roll").onclick = () => {
	// resetting everything
	animationActive = true;
	stopMoving = false;
	index = 0;
	total = 0;
	counter = 0;
	numberOfWrong = [0, 0, 0];
	for (let i = 0; i < reelContainers.length; i++) {
		reelContainers[i].innerHTML = "";
	}
};

requestAnimationFrame(spinReels);
