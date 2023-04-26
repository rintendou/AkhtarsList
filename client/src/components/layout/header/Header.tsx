import RouterLink from "../../ui/RouterLink";
import useAuth from "../../../lib/hooks/context-hooks/useAuthContext";
import SearchBar from "./SearchBar";
import Logo from "../../ui/Logo";

const Header = () => {
	const { isLoggedIn } = useAuth();

	return (
		<header className="p-8 flex flex-row justify-between items-center bg-secondary text-primary top-0 gap-8 z-50 dark:bg-black fixed w-full">
			<Logo />
			<SearchBar />
			<nav className="hidden md:flex flex-row gap-4">
				{isLoggedIn ? (
					<LoggedInNavbar />
				) : (
					<>
						<RouterLink
							to="/login"
							routerLinkText="Login"
							twClasses="p-2 w-24 text-center text-lg"
						/>
						<RouterLink
							to="/register"
							routerLinkText="Register"
							twClasses="p-2 w-24 text-center text-lg"
						/>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;

const LoggedInNavbar = () => {
	return (
		<>
			<RouterLink to="/" routerLinkText="Browse" twClasses="p-2 text-lg" />

			<RouterLink to="/sell" routerLinkText="Sell" twClasses="p-2 text-lg" />
			<RouterLink
				to="/profile"
				routerLinkText="Profile"
				twClasses="p-2 text-lg"
			/>
		</>
	);
};
