import React from 'react'
import { useRouter } from 'next/router'

type Props = {
    course: string,
    option: string
}

export default function Course(props: Props) {

    const router = useRouter();

    const redirectUser = (router: any, option: string) => {
        router.push(`/${option}/${encodeURIComponent(props.course)}`);
    }

    return (
        <div onClick={() => redirectUser(router, props.option)} className="flex justify-center hover:cursor-pointer items-center bg-green w-56 h-56 rounded-lg mr-6 mb-6">
            <h1 className="font-bold select-none text-center text-3xl w-full text-white">{props.course}</h1>
        </div>
    )
}
