import { useNavigate } from "react-router-dom";
import useAuthContext from "../../../../../lib/hooks/context-hooks/useAuthContext";
import ProfileButton from "../../profile/profile-actions/ProfileButton";
import ProfileRouterLink from "../../profile/profile-actions/ProfileRouterLink";
import AdminRouterLink from "./AdminRouterLink";

const AdminActions = () => {
	const navigate = useNavigate();
	const { logout } = useAuthContext();

	const logoutHandler = () => {
		logout();
		navigate("/", { replace: true });
	};

	return (
		<div className="hidden md:flex flex-col justify-between rounded-md tracking-normal h-full max-h-fit">
			<div>
				<AdminRouterLink
					to="/admin/analytics"
					twClasses="text-secondary dark:text-primary"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						version="1.1"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
						className="mr-3"
						height="2.4em"
						width="2.4em"
					>
						<path d="M27.028 25.367c0 1.071-0.876 1.947-1.947 1.947h-18.163c-1.071 0-1.947-0.876-1.947-1.947v-18.163c0-1.071 0.876-1.947 1.947-1.947h18.163c1.071 0 1.947 0.876 1.947 1.947v18.163zM27.028 12.187l-1.992-1.342c0.040-0.172 0.064-0.351 0.064-0.536 0-1.294-1.049-2.344-2.344-2.344s-2.344 1.049-2.344 2.344c0 0.509 0.164 0.979 0.44 1.364l-4.307 6.586c-0.175-0.042-0.358-0.067-0.546-0.067-0.577 0-1.104 0.209-1.513 0.555l-2.883-1.659c0.015-0.106 0.025-0.213 0.025-0.323 0-1.294-1.049-2.344-2.344-2.344s-2.344 1.049-2.344 2.344c0 0.321 0.065 0.627 0.182 0.906l-2.153 1.997v2.125l3.198-2.967c0.332 0.18 0.712 0.282 1.116 0.282 0.62 0 1.182-0.242 1.601-0.636l2.813 1.619c-0.028 0.144-0.043 0.292-0.043 0.444 0 1.294 1.049 2.343 2.344 2.343s2.344-1.049 2.344-2.343c0-0.539-0.184-1.034-0.49-1.43l4.277-6.54c0.2 0.055 0.409 0.087 0.626 0.087 0.543 0 1.041-0.186 1.439-0.496l2.833 1.909v-1.878z"></path>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Analytics</h1>
						<p>Track Marketing Results </p>
					</div>
				</AdminRouterLink>
				<AdminRouterLink
					to="/admin/transactions"
					twClasses="text-secondary dark:text-primary"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="mr-4"
						height="2.2em"
						width="2.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="none"
							strokeWidth="2"
							d="M2,7 L20,7 M16,2 L21,7 L16,12 M22,17 L4,17 M8,12 L3,17 L8,22"
						></path>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Transactions</h1>
						<p>See Successfully Sold Listings</p>
					</div>
				</AdminRouterLink>
				<AdminRouterLink
					to="/admin/disputes"
					twClasses="text-secondary  dark:text-primary"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="mr-4"
						height="2.2em"
						width="2.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="none"
							strokeWidth="2"
							d="M16,12 C18.3736719,13.1826446 20,15.6506255 20,19 L20,23 L4,23 L4,19 C4,15.6457258 5.6310898,13.1754259 8,12 M12,13 C15.3137085,13 18,10.3137085 18,7 C18,3.6862915 15.3137085,1 12,1 C8.6862915,1 6,3.6862915 6,7 C6,10.3137085 8.6862915,13 12,13 Z M18,7 C16.5,7 15,7.3599999 13,5 C11,7.3599999 8.5,8 6,7 M7,13 L12.0249378,18.2571942 L17,13 M12,18 L12,23"
						></path>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Disputes</h1>
						<p>Oversee Lister and Bidder Dispute</p>
					</div>
				</AdminRouterLink>
				<AdminRouterLink
					to="/admin/reported"
					twClasses="text-secondary  dark:text-primary"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="mr-4"
						height="2.2em"
						width="2.2em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Reported Listings</h1>
						<p>Manage Reported Listings</p>
					</div>
				</AdminRouterLink>
				<ProfileRouterLink to="/profile">
					<svg
						className="mr-4"
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						height="2.4em"
						width="2.4em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z"></path>
						</g>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Profile</h1>
						<p className="text-gray-500 dark:text-white">See your details</p>
					</div>
				</ProfileRouterLink>
			</div>
			<div>
				<ProfileRouterLink to="/profile/settings">
					<svg
						className="mr-4"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
						viewBox="0 0 24 24"
						strokeLinecap="round"
						strokeLinejoin="round"
						height="2.4em"
						width="2.4em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12" r="3"></circle>
						<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
					</svg>
					<div className="text-xs">
						<h1 className="text-lg font-semibold">Settings</h1>
						<p className="text-gray-500 dark:text-white">Manage user details</p>
					</div>
				</ProfileRouterLink>
				<ProfileButton onClick={logoutHandler}>
					<svg
						className="mr-4"
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
						viewBox="0 0 24 24"
						strokeLinecap="round"
						strokeLinejoin="round"
						height="2.4em"
						width="2.4em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
						<polyline points="16 17 21 12 16 7"></polyline>
						<line x1="21" y1="12" x2="9" y2="12"></line>
					</svg>
					<h1 className="text-lg font-semibold">Logout</h1>
				</ProfileButton>
			</div>
		</div>
	);
};

export default AdminActions;
