import React, { useEffect, useState } from 'react'

import Logo from '../components/Logo'
import Title from '../components/Title'

interface Staff {
    id: number
    Name: string
    SignedIn: Boolean
}

export default function signedin() {

    let [signedInStaffState, setSignedInStaffState] = useState<Array<{}>>([]);

    useEffect(() => {
        // Gets all the staff
        fetch("/api/staff/SeeStaff").then(res => res.json()).then(res => {
            // Loops and adds the signed in ones to the signedInStaff state
            let signedInStaff: Array<{}> = [];
            for(let staff of res.staff) {
                if(staff.SignedIn) signedInStaff.push(staff);
            }

            setSignedInStaffState(signedInStaff);
        });
    }, []);

    return (
        <div>
            <div className="absolute">
                <Logo />
            </div>
            <Title title="Signed In Staff" showDate={true} showBackButton={true} previousPage="/staff" />

            <div className="absolute left-1/2 -translate-x-1/2 mt-32">
                {
                    signedInStaffState.map((staff: any) => <p className="bg-green text-center rounded-md flex flex-col p-2 mr-4 mb-4 font-bold text-white" 
                    key={staff.Name}>
                        {staff.Name}
                    </p>)
                }
            </div>
        </div>
    )
}
