import React from 'react'
import BackButton from './BackButton'

import Course from './Course'
import Search from './Search'

type Course ={
    id: number
    name: string
}

export default function CourseSelect(props: any) {
    
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="flex flex-col items-center">
                <div className="lg:flex md:flex justify-between items-end w-6.9/10 ">
                    <div className="flex flex-col items-start">
                        <BackButton previousPage="/" isInTitle={false} />
                        <Search />
                    </div>
                    <button className="h-10 bg-darkblue px-1 rounded-md text-white font-bold mb-2 mr-6">All Trainees</button>
                </div>
                <div className="flex flex-wrap justify-center items-center w-9/12">
                    {
                        props.courses.map((course: Course) => {
                            return <Course key={course.id} course={course.name} option={props.option} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
