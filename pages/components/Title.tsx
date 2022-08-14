import React from 'react'

export default function Title() {

    const date = new Date();

    // Returns the month number with "0" in front if it is less than 10
    const getMonth = (month: number) => {
        if(month < 10) {
            return "0" + month.toString();
        } else {
            return month.toString();
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-darkblue font-bold">Forklift Handeling - {date.getDate() + "/" + (getMonth(date.getMonth() + 1)) + "/" + date.getFullYear()}</h1>
        </div>
    );
}
