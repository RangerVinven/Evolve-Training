import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

type Props = {
    course: string,
    option: string
}

export default function Course(props: Props) {
    return (
        <Link href={{
            pathname: "/course",
            query: {
                option: props.option,
                course: props.course
            }
        }} >
            <div className="flex justify-center hover:cursor-pointer items-center bg-green w-60 h-60 rounded-lg mr-6 mb-6">
                <h1 className="font-bold select-none text-center text-3xl w-full text-white">{props.course}</h1>
            </div>
        </Link>
    )
}
