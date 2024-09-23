import React, { useState } from "react";
import "./LoginPage.scss";
import { LOGIN_REQUIRED_INPUTS } from "../../core";
import axios from "axios";
import { PulseForm } from "@Qinastha/pulse_library";
import { useAuth } from "../../core/utilities/AuthContext";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
	const { setAuthenticated } = useAuth();
	const { t } = useTranslation();

	interface LoginFormData {
		email: string;
		password: string;
	}

	const [loginForm, setLoginForm] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	const requiredInputs = LOGIN_REQUIRED_INPUTS;
	const inputValues = [loginForm.email, loginForm.password];

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setLoginForm(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/login",
				loginForm,
			);
			if (response?.data?.value) {
				setAuthenticated(true, response.data.value);
				setLoginForm({ email: "", password: "" });
			}
		} catch (err) {
			console.error(err);
			setLoginForm({ email: "", password: "" });
		}
	};

	return (
		<div className="loginForm-container">
			<PulseForm
				requiredInputs={requiredInputs}
				inputValues={inputValues}
				formTitle={"Login to your account"}
				onChange={handleInputChange}
			/>
			<button type="button" onClick={handleSubmit}>
				{t("login.buttonText")}
			</button>
		</div>
	);
};
