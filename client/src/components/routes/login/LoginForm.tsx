import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../lib/hooks/context-hooks/useAuthContext";

// Components
import Card from "../../ui/Card";
import Error from "../../ui/Error";
import StyledInputRef from "../../ui/StyledInputRef";
import Success from "../../ui/Success";
import RouterLink from "../../ui/RouterLink";

// Port number
import PasswordInputRef from "../../ui/PasswordInputRef";

type Props = {
	didRegisterSuccessfully: boolean;
	successMessage: string;
	errorMessageFromOtherRoute: string;
};

const LoginForm = ({
	didRegisterSuccessfully,
	successMessage,
	errorMessageFromOtherRoute,
}: Props) => {
	const { login } = useAuthContext();
	const navigate = useNavigate();

	// I opted to use the useRef hook instead of useState to prevent
	// unnecessary re-renders of this component per each character typed
	const usernameOrEmailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// focus on the first input on component mount
	useEffect(() => {
		usernameOrEmailRef.current!.focus();
	}, []);
	// Keep track of error
	const [errorMessage, setErrorMessage] = useState(errorMessageFromOtherRoute);

	// Keep track of login success
	const [scsMessage, setScsMessage] = useState(successMessage);

	// send post request to api endpoint /api/auth/login by calling the
	// the endpoint and backend_server_port number: 5178. Payload is passed
	// by attaching data to the body object.
	const loginUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
		// Prevent default behavior of reloading page on form submission
		e.preventDefault();
		const usernameOrEmail = usernameOrEmailRef.current!.value;
		const password = passwordRef.current!.value;

		let payload: { email?: string; username?: string; password: string };

		if (usernameOrEmail.includes("@")) {
			payload = { email: usernameOrEmail, password };
		} else {
			payload = { username: usernameOrEmail, password };
		}

		const loginUser = async () => {
			const response = await fetch(
				`http://localhost:${
					import.meta.env.VITE_BACKEND_SERVER_PORT
				}/api/auth/login`,
				{
					method: "POST",
					body: JSON.stringify({ payload }),
					headers: { "Content-Type": "application/json" },
				}
			);

			const data = await response.json();

			if (!data.ok) {
				setErrorMessage(data.message);
				setScsMessage("");
				return;
			}

			const token = response.headers.get("authorization");

			setErrorMessage("");
			setScsMessage(data.data.message);
			login(data.data.user._id, token!, data.data.user.isAdmin);
			navigate("/", { replace: true });
		};
		loginUser();
	};

	return (
		<Card twClasses="w-[30rem] md:w-[45rem] mx-auto p-20 border border-secondary space-y-16 flex flex-col justify-center dark:bg-black dark:border-4 dark:border-tertiary">
			<h1 className="text-4xl font-bold text-center">Log In</h1>
			<form className="flex flex-col gap-5" onSubmit={loginUserHandler}>
				<StyledInputRef
					name="Username or Email"
					type="text"
					placeholder="Username or Email"
					ref={usernameOrEmailRef}
				/>
				<PasswordInputRef name="Password" ref={passwordRef} />
				<RouterLink
					routerLinkText="Forgot Password?"
					twClasses="text-xs ml-auto"
					to="/forgot-password"
				/>
				<LoginButton />
			</form>
			<div className="text-center flex flex-col md:flex-row space-x-0 md:space-x-3 mx-auto">
				<h1>Don't have an account yet?</h1>
				<RouterLink routerLinkText="Register here" to="/register" />
			</div>
			{!errorMessage && didRegisterSuccessfully && (
				<Success successMessage={scsMessage} />
			)}
			{errorMessage && <Error errorMessage={errorMessage} />}
		</Card>
	);
};

export default LoginForm;

const LoginButton = () => {
	return (
		<button
			className={`p-4 rounded-lg duration-200 hover:bg-black ease-in-out bg-secondary text-primary font-bold text-sm dark:bg-tertiary`}
			type="submit"
		>
			Log In
		</button>
	);
};
