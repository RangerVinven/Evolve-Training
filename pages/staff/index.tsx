import React from 'react'
import Logo from '../components/Logo'

export default function index() {

	const buttonStyling = "bg-green text-white font-bold text-4xl px-7 py-3 mr-7 mb-7 rounded-md";

	return (
		<div>
			<div className="absolute">
				<Logo />
			</div>

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col">
				<div className="flex">
					<button className={buttonStyling}>
						Sign In
					</button>

					<button className={buttonStyling}>
						Sign Out
					</button>
				</div>

				<button className={buttonStyling}>
					Signed In
				</button>
			</div>
		</div>
	)
}