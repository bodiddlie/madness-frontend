import React, { ChangeEvent, SyntheticEvent } from "react";
import { useAuth } from "./auth";

export default function Login() {
	const [email, setEmail] = React.useState('');
	const auth = useAuth();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		auth?.signup(email);
	}

	return (<div>
		<form onSubmit={handleSubmit}>
			<input type="text" className="border border-blue-600" value={email} onChange={handleChange} />
			<button type="submit">Login</button>
		</form>
	</div>);
}