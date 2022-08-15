import React from 'react';
import Title from './Title';

export default function CourseNotFound() {

	const paragraphStyling = "text-green text-lg font-bold mt-1";

	return (
		<div className="flex flex-col justify-center items-center">
			<Title title="Course Not Found" showDate={false} />
			<p className={paragraphStyling}>
				Please make sure you entered the URL exactly as shown below the QR code.
			</p>
		</div>
	)
}
