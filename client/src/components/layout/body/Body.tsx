import React from "react";

type Props = {
	children: React.ReactNode;
};

const Body = ({ children }: Props) => {
	return (
		<main className="min-h-screen flex flex-col space-y-4 h-full dark:bg-secondary mt-20 relative">
			<div className="z-3 bg-tertiary bottom-5 right-5 fixed p-4 rounded-full cursor-pointer border-2 border-secondary hover:scale-125 duration-200 ease-in-out">
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 1024 1024"
					height="1.5em"
					width="1.5em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path>
				</svg>
			</div>
			{children}
		</main>
	);
};

export default Body;
