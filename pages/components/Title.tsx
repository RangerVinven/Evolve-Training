import React from 'react'
import { useRouter } from 'next/router'

type Props = {
    title: string,
    showDate: boolean,

    // For the back button
    showBackButton?: boolean,
    previousPage?: string
}

export default function Title(props: Props) {

    const date = new Date();
    const router = useRouter();

    // Returns the month number with "0" in front if it is less than 10
    const getMonth = (month: number) => {
        if(month < 10) {
            return "0" + month.toString();
        } else {
            return month.toString();
        }
    }

    if(props.showBackButton) {
        return (
            <div className="flex justify-center items-center">
                <button className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md mr-2" onClick={() => {
                    if(props.previousPage !== undefined) {
                        router.push(props.previousPage);
                    }
                }}>Back</button>
                <h1 className="text-4xl text-darkblue font-bold">{props.title + (props.showDate ? " - " + date.getDate() + "/" + (getMonth(date.getMonth() + 1)) + "/" + date.getFullYear() : "")}</h1>
            </div>
        )
    } else {
        return <h1 className="text-4xl text-darkblue font-bold">{props.title + (props.showDate ? " - " + date.getDate() + "/" + (getMonth(date.getMonth() + 1)) + "/" + date.getFullYear() : "")}</h1>
    }
}
