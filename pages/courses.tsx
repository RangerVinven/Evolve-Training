import React from 'react'

import Logo from './components/Logo';
import CourseSelect from './components/CourseSelect';

import { prisma } from "../lib/prisma";

export async function getServerSideProps() {
	const courses = await prisma.courses.findMany({orderBy: [{ name: "asc" }]});

	return {
		props: {
			courses
		}
	}
}

export default function Courses(props: any) {
	return (
		<div>
			<Logo />
			<div className="flex justify-center items-center">
				<CourseSelect courses={props.courses} />
			</div>
		</div>
	);
}
