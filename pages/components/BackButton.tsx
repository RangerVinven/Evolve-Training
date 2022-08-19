import React from 'react'
import { useRouter } from 'next/router'

type Props = {
    previousPage: string,
    isInTitle: boolean
}

export default function BackButton(props: Props) {

    const router = useRouter();

    if(props.isInTitle) {
        return (
            <button className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md mr-2" onClick={() => {
                if(props.previousPage !== undefined) {
                    router.push(props.previousPage);
                }
            }}>Back</button>
        )
    } else {
        return (
            <button className="bg-darkblue text-xl mb-1 w-fit p-1 px-3 font-bold text-white rounded-md mr-2" onClick={() => {
                if(props.previousPage !== undefined) {
                    router.push(props.previousPage);
                }
            }}>Back</button>
        )
    }
}
