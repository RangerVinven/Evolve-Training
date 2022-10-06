import React, { useEffect, useState } from 'react'

import Logo from '../components/Logo'
import Title from '../components/Title'

export default function signedin() {

    let [signedInStaffState, setSignedInStaffState] = useState<{}>([]);

    useEffect(() => {
        // Gets all the staff
        fetch("/api/staff/SeeStaff").then(res => res.json()).then(res => {
            // Loops and adds the signed in ones to the signedInStaff state
            let signedInStaff = []
            for(let staff of res.staff) {
                if(staff.SignedIn) signedInStaff.push(staff);
            }

            setSignedInStaffState(signedInStaff);
        });
    });

    return (
        <div>
            <div className="absolute">
                <Logo />
            </div>
            <Title title="Signed In Staff" showDate={true} showBackButton={true} previousPage="/staff" />
        </div>
    )
}
