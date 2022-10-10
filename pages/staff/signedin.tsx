import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import Logo from '../components/Logo'
import Title from '../components/Title'

interface Staff {
    id: number
    Name: string
    SignedIn: Boolean
}

export default function SignedIn() {

    let [signedInStaffState, setSignedInStaffState] = useState<Array<{}>>([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gets all the staff
        fetch("/api/staff/SeeStaff").then(res => res.json()).then(res => {
            // Loops and adds the signed in ones to the signedInStaff state
            let signedInStaff: Array<{}> = [];
            for(let staff of res.staff) {
                if(staff.SignedIn) signedInStaff.push(staff);
            }

            setSignedInStaffState(signedInStaff);
            setLoading(false);
        });
    }, []);

    const isLoading = () => {
        if(loading) {
            return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><ReactLoading type="spinningBubbles" color="#1F5C78" height={150} width={150} /></div>
        } else {
            return (
                <div className="absolute left-1/2 -translate-x-1/2 mt-48">
                    {
                        signedInStaffState.map((staff: any) => <p className="bg-green text-center rounded-md flex flex-col p-2 mr-4 mb-4 font-bold text-white" 
                        key={staff.Name}>
                            {staff.Name}
                        </p>)
                    }
                </div>
            )
        }
    }

    return (
        <div>
            <div className="absolute">
                <Logo />
            </div>
            <Title title="Signed In Staff" showDate={false} showBackButton={true} previousPage="/staff" />

            {
                isLoading()
            }
        </div>
    )
}
