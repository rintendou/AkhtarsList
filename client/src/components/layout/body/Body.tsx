import React from "react";

type Props = {
	children: React.ReactNode;
};

const Body = ({ children }: Props) => {
	return (
		<main className="min-h-screen flex flex-col space-y-4 h-full dark:bg-secondary mt-24">
			{children}
		</main>
	);
};

export default Body;
