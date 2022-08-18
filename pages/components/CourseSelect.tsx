import React from 'react'

import Course from './Course'
import Search from './Search'

export default function CourseSelect() {  
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="flex flex-col items-center">
                <div className="lg:flex justify-between w-6.9/10">
                    <Search />
                    <button className="bg-darkblue px-1 rounded-md text-white font-bold mb-2 mr-6">All Trainees</button>
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
