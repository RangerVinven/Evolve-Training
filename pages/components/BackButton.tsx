import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    previousPage: string,
    isInTitle: boolean
}

export default function BackButton(props: Props) {
    if(props.isInTitle) {
        return (
            <Link href={{
                pathname: props.previousPage,
            }}>
                <button className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md mr-2">Home</button>
            </Link>
        )
    } else {
        return (
            <Link href={{
                pathname: props.previousPage,
            }}>
                <button className="bg-darkblue text-xl mb-1 w-fit p-1 px-3 font-bold text-white rounded-md mr-2">Home</button>
            </Link>
        )
    }
}
