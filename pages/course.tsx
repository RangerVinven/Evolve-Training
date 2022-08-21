import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import ReactLoading from 'react-loading';

import Logo from './components/Logo';
import Form from './components/Form';
import Title from './components/Title';

export default function Course(props: any) {
	const router = useRouter();
    const course = router.query.course;
    const option = router.query.option;

    let [clients, setClients] = React.useState([
        {
            "Clients Not Loaded": "Clients Not Loaded",
        }
    ]);
    let hasCalledGetClients = false;  

    useEffect(() => {
        if(course === null || course === undefined || option === null || option === undefined) {
            if(option !== "signin" && option !== "signout" && option !== "registered") {
                router.push("/");
            }
        } else if(option !== "signin" && option !== "signout" && option !== "registered") {
            router.push("/");
        }
    }, []);

    if(option === "signin") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center">
                    <div className="6/12">
                        <Form course={course} />
                    </div>
                </div>
            </div>
        );
    } else if(option === "signout") {

        if(!hasCalledGetClients) {
            hasCalledGetClients = true;

            fetch("/api/GetClientsOfACourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "course": course
                })
            }).then(res => res.json()).then(data => {
                setClients(data.clients);                                        
            });            
        }         

        if(!hasCalledGetClients) {
            return (
                <div>
                    <Logo />
                    <div className="h-450 flex justify-center items-center">
                        <ReactLoading type="spinningBubbles" color="#1F5C78" height={100} width={100} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Logo />
                    <div className="flex justify-center items-center h-96">
                        <div className="flex flex-col items-center justify-center 6/12">
                            <div className="mb-12">
                                <Title title={course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                            </div>
                            <select defaultValue="Your Name" className="w-96 h-12 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
                                <option disabled>Your Name</option>
                                {
                                    clients.map((client: any) => {
                                        return (
                                            <option key={client.id} value={client.name}>{client.name} - {client.company}</option>
                                        )
                                    })
                                }
                            </select>
                            <button className="bg-darkblue text-2xl w-fit p-1 px-2 mt-8 font-bold text-white rounded-md">Sign Out</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
