import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Logo from './components/Logo';
import CourseSelect from './components/CourseSelect';

export default function Courses() {

	const router = useRouter();
    const option = router.query.option;

	let [showCourses, setShowCourses] = React.useState(false); 

	useEffect(() => {
		if(option !== "signin" && option !== "signout" && option !== "registered") {
			router.push("/");
		} else {
			setShowCourses(true);
		}
	}, []);

	if(showCourses) {
		return (
			<div>
				<Logo />
				<div className="flex justify-center items-center">
					<CourseSelect option={option} />
				</div>
			</div>
		);
	}
}
