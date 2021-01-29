import styles from './App.module.scss';
import { useState } from 'react';

function App() {
	let [firstName, setFirstName] = useState('');
	let [lastName, setLastName] = useState('');
	let [email, setEmail] = useState('');
	let [org, setOrg] = useState('');
	let [euResident, setEuResident] = useState('');
	let [advances, setAdvances] = useState(false);
	let [alerts, setAlerts] = useState(false);
	let [other, setOther] = useState(false);
	let [emailRegistrationFeedback, setEmailRegistrationFeedback] = useState('');

	let formFeedback = e => {
		let feedback = document.getElementById(e.target.id + "Feedback");
		if (feedback) {
			/** if the input is required and empty. notify the user that a value must be entered.*/
			!e.target.value && e.target.required ? feedback.innerHTML = `${e.target.name} is required` : feedback.innerHTML = "";
			//check email format
			if (e.target.id === 'email') {
				!e.target.validity.valid ? feedback.innerHTML = `Email address is not formatted properly.` : feedback.innerHTML = "";
			}
		} else if (e.target.id === 'advances' || e.target.id === 'alert' || e.target.id === 'other') {
			feedback = document.getElementById('checkBoxFeedback');
			let checkBoxFeedback = document.getElementById('checkBoxFeedback');
			if (!advances && !alerts && !other) {
				checkBoxFeedback.innerHTML = 'Select at least one communication method below.';
			} else {
				checkBoxFeedback.innerHTML = '';
			}
		}
	};

	/**
	 * Submits for data to the express api server.
	 * Then notifies the user if the registration was successful or not.
	 */
	let registerForEmailsAndNotify = e => {
		e.preventDefault();
		let formData = {
			firstName,
			lastName,
			email,
			org,
			euResident,
			advances,
			alerts,
			other
		};

		fetch("http://localhost:3001/emailupdates", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		}).then(
			res => res.json()
		).then(
			data => setEmailRegistrationFeedback(data.message)
		).catch(err => console.log(err));
	};
	return (
		<main>
			<h1>Sign up for email updates</h1>
			<span>*indicates Required Field</span>
			<h2>{emailRegistrationFeedback}</h2>
			<form onSubmit={registerForEmailsAndNotify} onChange={formFeedback}>
				<div className={styles.grid}>
					<div className={styles.gridItemOne}>
						<p id="firstNameFeedback" className={styles.feedback}></p>
						<label htmlFor="firstName">First Name *</label>
						<input id="firstName" type="text" name="firstName" required onChange={(input) => { setFirstName(input.target.value) }} />
					</div>
					<div className={styles.gridItemTwo}>
						<p id="lastNameFeedback" className={styles.feedback}></p>
						<label htmlFor="lastName">Last Name *</label>
						<input id="lastName" type="text" name="lastName" required onChange={(input) => { setLastName(input.target.value) }} />
					</div>
					<div className={styles.gridItemOne}>
						<p id="emailFeedback" className={styles.feedback}></p>
						<label htmlFor="email">Email Address *</label>
						<input id="email" type="email" name="email" required onChange={(input) => { setEmail(input.target.value) }} />
					</div>
					<div className={styles.gridItemTwo}>
						<p id="orgFeedback" className={styles.feedback}></p>
						<label htmlFor="org">Organization</label>
						<input id="org" type="text" name="org" onChange={(input) => { setOrg(input.target.value) }} />
					</div>
					<div className={styles.gridItemOne}>
						<p id="euResidentFeedback" className={styles.feedback}></p>
						<label htmlFor="euResident">EU Resident *</label>
						<select name="euResident" id="euResident" required onChange={(input) => { setEuResident(input.target.value) }}>
							<option value=""> - Select One -</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</select>
					</div>
					<div className={styles.gridItemThree}>
						<p id="checkBoxFeedback" className={styles.feedback}></p>
					</div>
					<div className={styles.gridItemOne}>
						<input type="checkbox" id="advances" name="advances" checked={advances} onChange={(input) => { setAdvances(input.target.checked) }} />
						<label htmlFor="advances">Advances</label>
					</div>
					<div className={styles.gridItemTwo}>
						<input type="checkbox" id="alert" name="alert" checked={alerts} onChange={(input) => { setAlerts(input.target.checked) }} />
						<label htmlFor="alert">Alerts</label>
					</div>
					<div className={styles.gridItemOne}>
						<input type="checkbox" id="other" name="other" checked={other} onChange={(input) => { setOther(input.target.checked) }} />
						<label htmlFor="other">Other Communication</label>
					</div>
					<div className={styles.gridItemThree}>
						<input type="submit" value="Submit" />
						<input type="reset" value="Reset" />
					</div>
				</div>
			</form>
		</main>
	);
}

export default App;
