import React from 'react'
import BackButton from './BackButton'

import Course from './Course'
import Search from './Search'

import ReactLoading from 'react-loading';
import Link from 'next/link';

type Course ={
    id: number
    name: string
}

export default function CourseSelect(props: any) {    

    let [courses, setCourses] = React.useState<Course[]>([]);
    let [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        fetch("/api/GetCourses").then(res => res.json()).then(data => {
            setCourses(data.courses);
            setLoading(false);
        });
    }, []);
    
    if(loading) {
        return (
            <div className="absolute left-2/4 top-2/4 transform -translate-x-1/2 -translate-y-1/2">
                <ReactLoading type="spinningBubbles" color="#1F5C78" height={100} width={100} />
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center mt-10">    
                <div className="flex flex-col items-center">
                    <div className="lg:flex md:flex justify-between items-end w-6.9/10">
                        <div className="flex flex-col items-start">
                            <BackButton showBackButton={true} previousPage="/" isInTitle={false} />
                            <Search setCourses={setCourses} />
                        </div>
                        <Link href={{
                            pathname: "/allTrainees"
                        }}>
                            <button className="h-10 bg-darkblue px-1 rounded-md text-white font-bold mb-2 mr-6">All Trainees</button>
                        </Link>
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
