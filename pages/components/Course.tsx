import React from 'react'

type Props = {
    course: string
}

export default function Course(props: Props) {
    return (
        <div className="flex justify-center hover:cursor-pointer items-center bg-green w-56 h-56 rounded-lg mr-6 mb-6">
            <h1 className="font-bold select-none text-center text-3xl w-full text-white">{props.course}</h1>
        </div>
    )
}
