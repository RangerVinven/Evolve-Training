import React from 'react'
import BackButton from './BackButton'

import Course from './Course'
import Search from './Search'

import { prisma } from "../../lib/prisma";
import ReactLoading from 'react-loading';

type Course ={
    id: number
    name: string
}

// export async function getServerSideProps() {
// 	const courses = await prisma.courses.findMany({orderBy: [{ name: "asc" }]});
    
// 	return {
// 		props: {
// 			courses
// 		}
// 	}
// }

export default function CourseSelect(props: any) {    

    let [courses, setCourses] = React.useState<Course[]>([]);
    
    React.useEffect(() => {
        fetch("/api/GetCourses").then(res => res.json()).then(data => {
            setCourses(data.courses);
        });
    }, []);
    
    if(courses.length === 0) {
        return (
            <div className="h-450 flex justify-center items-center">
                <ReactLoading type="spin" color="#1F5C78" height={100} width={100} />
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center mt-10">    
                <div className="flex flex-col items-center">
                    <div className="lg:flex md:flex justify-between items-end w-6.9/10">
                        <div className="flex flex-col items-start">
                            <BackButton previousPage="/" isInTitle={false} />
                            <Search />
                        </div>
                        <button className="h-10 bg-darkblue px-1 rounded-md text-white font-bold mb-2 mr-6">All Trainees</button>
                    </div>
                    <div className="flex flex-wrap justify-center items-center w-9/12 ">
                        {
                            courses.map((course: Course) => {
                                return <Course key={course.id} course={course.name} option={props.option} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
