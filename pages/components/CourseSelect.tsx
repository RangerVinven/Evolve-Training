import React from 'react'

import Course from './Course'
import Search from './Search'

export default function CourseSelect() {  
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="lg:flex">
                    <Search />
                    <button className="bg-darkblue px-1 rounded-md text-white font-bold mb-2">All Trainees</button>
                </div>
                <div className="flex flex-wrap justify-center items-center w-9/12">
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                </div>
            </div>       
        </div>
    )
}
