const reg =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email) => {
	return reg.test(String(email).toLowerCase());
};

export const validateSignIn = (email, password, errorCallback) => {
	let result = true;
	if (!validateEmail(email)) {
		errorCallback({
			title: "Invalid Email!",
			message: "Please enter a valid email.",
		});
		result = false;
	}
	if (password.length < 6) {
		errorCallback({
			title: "Invalid input!",
			message: "Please enter longer password.",
		});
		result = false;
	}
	return result;
};
