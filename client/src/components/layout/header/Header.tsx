import RouterLink from "../../ui/RouterLink";
import useAuth from "../../../lib/hooks/context-hooks/useAuthContext";
import SearchBar from "./SearchBar";
import Logo from "../../ui/Logo";
import { useEffect, useState } from "react";

const Header = () => {
	const { isLoggedIn } = useAuth();
	const [isTop, setIsTop] = useState(true); // State to keep track of scroll position

	useEffect(() => {
		// Function to handle scroll event
		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop; // Get scroll position
			setIsTop(scrollTop === 0); // Set isTop state based on scroll position
		};

		window.addEventListener("scroll", handleScroll); // Add scroll event listener

		return () => {
			window.removeEventListener("scroll", handleScroll); // Clean up scroll event listener on unmount
		};
	}, []);

	return (
		<header
			className={`flex flex-row justify-between items-center bg-secondary text-primary top-0 gap-8 z-50 dark:bg-black fixed w-full duration-500 ${
				isTop ? "p-6" : "py-2" // Apply padding only when scroll is at the top
			}`}
		>
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
