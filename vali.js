(function() {
	// if no validation or classlist feature we don't enhance
	if (!('noValidate' in document.createElement('form')) ||
	!document.createElement('a').classList) {
		return;
	}

	let elemProto = Element.prototype;
	if (!elemProto.matches) {
		elemProto.matches = elemProto.matchesSelector ||
		elemProto.mozMatchesSelector || elemProto.webkitMatchesSelector ||
		elemProto.msMatchesSelector;
	}

	Array.prototype.forEach.call(document.querySelectorAll('form.validate'),
	function(form) {
		form.noValidate = true;

		form.addEventListener('submit', function(e) {
			if (!form.checkValidity()) {
				e.preventDefault();
				form.querySelector('input:invalid, select:invalid, textarea:invalid')
				.focus();
			}
		});

		form.addEventListener('blur', function(e) {
			if (e.target.matches(':invalid')) {
				setInvalid(e.target);
			} else {
				removeInvalid(e.target);
			}
		}, true);

		form.addEventListener('invalid', function(e) {
			setInvalid(e.target);
		}, true);
	});


	function setInvalid(element) {
		let message;
		let parent = element.parentNode;

		if (!parent.classList.contains('has-error')) {
			message = document.createElement('div');
			message.className = 'help-block';
			message.innerHTML = element.validationMessage;
			parent.classList.add('has-error');
			parent.appendChild(message);
		} else {
			parent.querySelector('.help-block').innerHTML = element.validationMessage;
		}
	}

	function removeInvalid(element) {
		let parent = element.parentNode;
		if (parent.classList.contains('has-error')) {
			parent.classList.remove('has-error');
			parent.removeChild(parent.querySelector('.help-block'));
		}
	}
})();
