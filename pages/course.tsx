import React, { useEffect } from 'react'
import{ useRouter } from 'next/router'

import toast from 'react-simple-toasts';

import Logo from './components/Logo';
import Form from './components/Form';
import Title from './components/Title';
import SignOutForm from './components/SignOutForm';
import Client from './components/Client';

import ReactLoading from 'react-loading';

type Props = {
    clients: {}[],
    option?: string,
    course?: string
    error?: boolean
}

export default function Course(props: Props) {
    
    let [loading, setLoading] = React.useState(true);
    let [clients, setClients] = React.useState<any>([]);    

    const router = useRouter();
    const course = router.query.course?.toString();
    const option = router.query.option?.toString();

    useEffect(() => {
        if(!course || !option) {
            router.push("/")
        };
        if(option !== "signin" && option !== "signout" && option !== "registered") router.push("/");

        fetch("/api/GetClientsOfACourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                course: course
            })
        }).then(res => res.json()).then(res => {
            setClients(res);
            setLoading(false);            
        }).catch(err => {
            toast("👎 Something Went Wrong", {
                clickClosable: true,
                render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
            });
        });
    }, [])

    if(loading) {
        return (
            <div>
                <Logo />
                <div className="absolute left-2/4 top-2/4 transform -translate-x-1/2 -translate-y-1/2">
                    <ReactLoading type="spinningBubbles" color="#1F5C78" height={125} width={125} />
                </div>
            </div>
        );
    } else if(option === "signin") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center">
                    <div className="w-6/12">
                        <Form course={course} toast={toast} />
                    </div>
                </div>
            </div>
        );
    } else if(option === "signout") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center h-96">
                    <div className="flex flex-col items-center justify-center w-6/12">
                        <div className="mb-12">
                            <Title title={course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                        </div>
                        <SignOutForm clients={clients} course={course!.toString()} toast={toast} />
                    </div>
                </div>
            </div>
        );
        
    } else {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center w-9/12">
                        <div className="mb-12 mt-12">
                            <Title title={course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {   
                                clients.clients!.length !== 0 ? clients.clients!.map((client: any) => <Client key={client.name+"-"+client.company} name={client.name} company={client.company} />) : <h1 className="text-4xl text-green font-bold absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">No Trainees Are Signed In For This Course</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
