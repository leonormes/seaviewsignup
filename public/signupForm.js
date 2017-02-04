let frm = document.forms[0];
frm.addEventListener('submit', function(e) {
	e.preventDefault();
	let formData = document.signup.elements;
	formValues = getFormInfo(formData);
	let submitted = writePupilRecord(formValues);
	console.log(submitted);
	removeForm();
	formResponse();
});
let getFormInfo = function(formData) {
	let formInfo = {};
	formInfo.adultfname = formData['adultfname'].value;
	formInfo.adultsurname = formData['adultsurname'].value;
	formInfo.email = formData['email'].value;
	formInfo.phone = formData['phone'].value;
	formInfo.childfname = formData['childfname'].value;
	formInfo.childsurname = formData['childsurname'].value;
	formInfo.dob = formData['dob'].value;
	formInfo.days = dayChoices();
	formInfo.startDate = formData['startdate'].value;
	formInfo.hasStarted = false;
	formInfo.status = 'Waiting';
	formInfo.timeStamp = firebase.database.ServerValue.TIMESTAMP;
	let allergies = document.signup.elements['allergies'];
	formInfo.allergies = allergies.value === 'true';
	return formInfo;
};

let dayChoices = function() {
	let dayChoices = document.getElementsByName('days');
		let days = [];
	for(let input of dayChoices) {
		if(input.checked) {
			days.push(input.value);
		}
	};
	return days;
};
const database = firebase.database();
function writePupilRecord(pupil) {
	let submitted = database.ref('pupils/').push(pupil);
	return submitted;
};

function removeForm() {
	let childrenElements = document.getElementsByClassName('content_form');
	if(childrenElements.length > 0) {
		while (childrenElements[0].firstChild) {
			childrenElements[0].removeChild(childrenElements[0].firstChild);
		}
	}
};
function formResponse() {
	let messageBox = document.createElement('div');
	let messageText = document.createTextNode('Form Sent. Thank you');
	messageBox.appendChild(messageText);
	let page = document.getElementsByClassName('content_form')[0];
	page.appendChild(messageBox);
}
