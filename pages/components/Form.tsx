import React from 'react'

import Title from './Title'

export default function Form() {

    const inputStyle = "rounded-md bg-green font-bold placeholder-neutral-200 text-white text-2xl w-full p-2 pl-2";

    return (
        <div className="flex flex-col justify-between items-center h-80">
            <Title />
            {/* <input type="text" placeholder="Name" className="border border-gray-400 p-2 w-full" /> */}
            <input type="text" placeholder="Your Name" className={inputStyle} />
            <input type="text" placeholder="Your Company" className={inputStyle} />
            <button className="bg-darkblue text-2xl w-fit p-1 px-2 font-bold text-white rounded-md">Submit</button>
        </div>
    )
}
