import React from 'react'
import BackButton from './BackButton';

type Props = {
    title: string,
    showDate: boolean,

    // For the back button
    showBackButton?: boolean,
    previousPage?: string,
}

export default function Title(props: Props) {

    const date = new Date();

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
                <BackButton isInTitle={true} previousPage={props.previousPage === undefined ? "/" : props.previousPage} />
                <h1 className="text-4xl text-darkblue font-bold">{props.title + (props.showDate ? " - " + date.getDate() + "/" + (getMonth(date.getMonth() + 1)) + "/" + date.getFullYear() : "")}</h1>
            </div>
        )
    } else {
        return <h1 className="text-4xl text-darkblue font-bold">{props.title + (props.showDate ? " - " + date.getDate() + "/" + (getMonth(date.getMonth() + 1)) + "/" + date.getFullYear() : "")}</h1>
    }
}
