import React from 'react'

import Title from './Title'

type Props = {
    course: any
}

export default function Form(props: Props) {

    let [name, setName] = React.useState("")
    let [course, setCourse] = React.useState("")
    const inputStyle = "rounded-md bg-green font-bold placeholder-neutral-200 text-white text-2xl w-full p-2 pl-2";

    return (
        <div className="flex flex-col justify-between items-center h-80 mt-4">
            <Title title={props.course} showDate={true} />
            
            <input type="text" placeholder="Your Name" className={inputStyle} onChange={(e) => {
                setName(e.target.value);
            }} />
            <input type="text" placeholder="Your Company" className={inputStyle} onChange={(e) => {
                setCourse(e.target.value);
            }} />
            <button onClick={() => {
                fetch("http://localhost:3000/api/AddClient", {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        course: course
                    })
                });
            }} className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md">Sign In</button>
        </div>
    )
}
