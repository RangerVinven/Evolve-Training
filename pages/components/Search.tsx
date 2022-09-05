import React from 'react'

type Props = {
    setCourses: Function
}

export default function Search(props: Props) {

    const searchCourses = (search: string) => {
        fetch("/api/SearchCourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                course: search
            })
        }).then(res => res.json()).then(data => {
            props.setCourses(data.courses);            
        })
    }

    return (
        <div>
            <input onChange={(e) => {
                searchCourses(e.target.value);                
            }} type="text" className="bg-darkblue pl-1 rounded-md text-xl font-bold text-white place-grey-100 mb-2" placeholder="Search..." />
        </div>
    )
}
