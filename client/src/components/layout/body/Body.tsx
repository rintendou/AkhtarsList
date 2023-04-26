import React from "react";
import FixedScrollToTop from "../../ui/FixedScrollToTop";

type Props = {
	children: React.ReactNode;
};

const Body = ({ children }: Props) => {
	return (
		<main className="min-h-screen flex flex-col space-y-4 h-full dark:bg-secondary relative">
			<div className="h-20 bg-secondary"></div>
			<FixedScrollToTop />
			{children}
		</main>
	);
};

export default Body;
