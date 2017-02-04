'use strict';
let pupilRecords;
const database = firebase.database();
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
function fetchData() {
	return new Promise(function(resolve, reject) {
		database.ref('/pupils/').once('value')
		.then(function(snapshot) {
			pupilRecords = snapshot.val();
			pupilRecordsToArray(pupilRecords);
			resolve(pupilRecords);
		});
	});
}
fetchData().then(function(pupils) {
	let dailyReg = dailyRegister();
	days.forEach(function(day) {
		dailyRegister(day);
	});
});

function pupilRecordsToArray(pupilRecord) {
	pupilRecordsArray = Object.keys(pupilRecord).map(function(key) {
		pupilRecord[key].key = key;
		return pupilRecord[key];
	});
	return pupilRecordsArray;
}
function dailyRegister(day) {
let dayReg = pupilRecords.filter(function(pup) {
	return pup.days.indexOf(day) > -1;
	});
	return dayReg;
}
function getFNames(dayReg) {
	let names = [];
	dayReg.forEach(function(pup) {
		names.push(pup.firstName);
	});
	return names;
}


function makeDay(todayReg, day) {
	let todayNames = getFNames(todayReg);
	let t = document.querySelector('#dayColumn');
	let temp = t.content.querySelector('#dayBox');
	let header = temp.querySelector('#dayHeading');
	header.textContent = day;
	let row = temp.querySelectorAll('.dayRow');
	for(let i = 0; i < 8; i++) {
	row[i].textContent = todayNames[i];
};

	let tab = document.importNode(t.content, true);
	document.getElementsByClassName('ttcontent')[0].appendChild(tab);
}
days.forEach(function(day) {
	let todayReg = dailyRegister(day);
	makeDay(todayReg, day);
});
