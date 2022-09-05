import React from 'react'
import Link from 'next/link'

import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'

type Props = {
    previousPage: string,
    isInTitle: boolean,
    showBackButton: boolean
}

function HomeIcon() {
    return (
        <Icon size={30} icon={home} />
    )
};

export default function BackButton(props: Props) {

    // Doesn't show the back button
    if(!props.showBackButton) {
        return(<div></div>)
    }

    if(props.isInTitle) {
        return (
            <Link href={{
                pathname: props.previousPage,
            }}>
                <button className="flex justify-center items-center bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md mr-2"><HomeIcon /></button>
            </Link>
        )
    } else {
        return (
            <Link href={{
                pathname: props.previousPage,
            }}>
                <button className="bg-darkblue text-xl mb-1 w-fit p-1 px-3 font-bold text-white rounded-md mr-2"><HomeIcon /></button>
            </Link>
        )
    }
}


