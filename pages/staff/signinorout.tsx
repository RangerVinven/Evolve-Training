import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';

import toast from 'react-simple-toasts';

import Logo from '../components/Logo'
import Title from '../components/Title';

export default function SignInAndOut() {

    let [staff, setStaff] = useState([]);
    let [chosenStaff, setChosenStaff] = useState("");
    
    let [loadingStaff, setLoadingStaff] = useState(true); // For getting a list of staff from the API
    let [processingRequest, setProcessingRequest] = useState(false); // For the loading animation when making the /api/staff/SignInOrOut request


    enum Options {
        SignIn = "SignIn",
        SignOut = "SignOut"
    }

    useEffect(() => {
        // Gets the staff from the SeeStaff endpoint
        fetch("/api/staff/SeeStaff").then(res => res.json()).then(res => {
            setStaff(res.staff);
            setLoadingStaff(false);
        }).catch(err => {
            toast("👎 Something Went Wrong", {
                clickClosable: true,
                render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
            });     
        });  
    }, []);

    const isLoading = () => {
        if(loadingStaff) {
            return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><ReactLoading type="spinningBubbles" color="#1F5C78" height={150} width={150} /></div>
        } else {
            return (
                <div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <select onChange={(event) => {
                            setChosenStaff(event.target.value);         
                        }} defaultValue="Your Name" className="w-96 h-12 mb-5 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
                            <option disabled>Your Name</option>
                            {
                                staff.map((staff: any) => {
                                    return <option key={staff.Name} value={staff.Name}>{staff.Name}</option>
                                })
                            }
                        </select>
                        <div className="flex justify-between w-96">
                            <button className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md" onClick={() => signStaffInOrOut(chosenStaff, Options.SignIn)}>Sign In</button>
                            <button className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md" onClick={() => signStaffInOrOut(chosenStaff, Options.SignOut)}>Sign Out</button>
                        </div>
                    </div>
                    {
                        processingRequest && <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-2/2"><ReactLoading type="spinningBubbles" color="#1F5C78" height={150} width={150} /></div>
                    }
                </div>
            )
        }
    }
    
    // Shows the success/failure alert
    const alertUser = (isSuccess: boolean, option: Options) => {
        if(!isSuccess) {
            toast("👎 Something Went Wrong", {
                clickClosable: true,
                render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
            });
        } else {
            const message = (option === Options.SignIn ? "👍 You're Signed In" : "👍 You're Signed Out");
            toast(message, {
                clickClosable: true,
                render: (text: string) => <div className="bg-lime-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
            });
        }
    }

    // Signs the staff in/out
    const signStaffInOrOut = (name: string, option: Options) => {

        // Starts the loading animation
        setProcessingRequest(true);

        // Tells the user to please select their name
        if(name === "") {
            toast("⚠ Please Select Your Name", {
                clickClosable: true,
                render: (text: string) => <div className="bg-amber-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
            });
            return;
        }

        fetch("/api/staff/SignStaffInOrOut", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                option: option === Options.SignIn ? true : false
            })
        }).then((res) => {
            setProcessingRequest(false);
            if(res.status === 200) alertUser(true, option);
        }).catch((err) => {
            setProcessingRequest(false);
            alertUser(false, option);
        });
    }

    return (
        <div>
            <div className="absolute">
				<Logo />
			</div>

			<Title title="Sign In/Out" showBackButton={true} showDate={false} previousPage="/staff" />

            {
                isLoading()
            }
        </div>
    )
}
