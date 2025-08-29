'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useMainStore } from '@/store/mainStore';

export default function LoginPage() {
	const { error, login, password, save, setLogin, setPassword, setSave } =
		useAuthStore.getState();
	const { authorize, authToken } = useMainStore.getState();

	const handleAuthorize = async (e: React.FormEvent) => {
		e.preventDefault();
		await authorize(login, password);
	};

	useEffect(() => {
		console.log('run on authToken update', authToken);
		if (authToken) {
			window.location.href = '/';
		}
	}, [authToken]);

	return (
		<div className="wrapper" style={styles.wrapper}>
			<div>authToken: {authToken}</div>
			{/* Error Message */}
			{error && (
				<span className="error" style={styles.error}>
					{error}
				</span>
			)}

			{/* Form */}
			<div className="form" style={styles.form}>
				<div style={styles.header}>Login screen</div>

				<form onSubmit={handleAuthorize}>
					<label htmlFor="u-login">Login:</label>
					<input
						id="u-login"
						type="text"
						name="username"
						autoComplete="off"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						style={styles.input}
					/>

					<label htmlFor="u-pass">Password:</label>
					<input
						id="u-pass"
						type="password"
						name="password"
						autoComplete="off"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={styles.input}
					/>

					<label style={styles.checkboxLabel}>
						<input
							type="checkbox"
							checked={save}
							onChange={(e) => setSave(e.target.checked)}
						/>
						Save
					</label>
					<br />

					<button type="submit" style={styles.button}>
						Go!
					</button>
				</form>
			</div>
		</div>
	);
}

// Basic inline styles (replace with CSS modules, Tailwind, etc. in production)
const styles = {
	wrapper: {
		padding: '20px',
		maxWidth: '400px',
		margin: '0 auto',
	},
	error: {
		color: 'red',
		fontSize: '0.9rem',
		marginBottom: '10px',
		display: 'block',
	},
	form: {
		border: '1px solid #ddd',
		borderRadius: '8px',
		padding: '20px',
		backgroundColor: '#f9f9f9',
	},
	header: {
		width: '100%',
		textAlign: 'center' as const,
		fontWeight: 'bolder',
		marginBottom: '20px',
		fontSize: '1.2rem',
	},
	input: {
		display: 'block',
		width: '100%',
		padding: '8px',
		margin: '5px 0 15px',
		borderRadius: '4px',
		border: '1px solid #ccc',
		boxSizing: 'border-box' as const,
	},
	checkboxLabel: {
		fontSize: '0.95rem',
		marginRight: '8px',
	},
	button: {
		marginTop: '10px',
		padding: '10px 15px',
		backgroundColor: '#007bff',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		fontWeight: 'bold',
	},
};
