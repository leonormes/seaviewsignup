'use strict';
var frm = document.forms[0];
frm.addEventListener('submit', function(e) {
	e.preventDefault();
	var formData = document.signup.elements;
	var	formValues = getFormInfo(formData);
	var submitted = writePupilRecord(formValues);
	removeForm();
	formResponse();
	return false
});
var getFormInfo = function(formData) {
	var formInfo = {};
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
	var allergies = document.signup.elements['allergies'];
	formInfo.allergies = allergies.value === 'true';
	var photos = document.signup.elements['photos'];
	formInfo.photos = photos.value === 'true';
	return formInfo;
};

var dayChoices = function dayChoices() {
	var nodeList = document.getElementsByName('days');
	var dayChoices = Array.prototype.slice.call(nodeList);
	var days = [];
	var _iteratorNormalCompvarion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = dayChoices[Symbol.iterator](), _step; !(_iteratorNormalCompvarion = (_step = _iterator.next()).done); _iteratorNormalCompvarion = true) {
			var input = _step.value;

			if (input.checked) {
				days.push(input.value);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompvarion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	;
	return days;
};
const database = firebase.database();
function writePupilRecord(pupil) {
	var submitted = database.ref('pupils/').push(pupil);
	return submitted;
};

function removeForm() {
	var childrenElements = document.getElementsByClassName('content_form');
	if(childrenElements.length > 0) {
		while (childrenElements[0].firstChild) {
			childrenElements[0].removeChild(childrenElements[0].firstChild);
		}
	}
};
function formResponse() {
	var messageBox = document.createElement('div');
	var messageText = document.createTextNode('Form Sent. Thank you');
	messageBox.appendChild(messageText);
	var page = document.getElementsByClassName('content_form')[0];
	page.appendChild(messageBox);
}
