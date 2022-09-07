import React from 'react'
import Logo from './components/Logo'

import Title from './components/Title'
import Client from './components/Client';

import ReactLoading from 'react-loading';
import toast from 'react-simple-toasts';

type Props = {
    coursesAndClients: Array<{
        course: string,
        client: {}[]
    }>
}

type Course = {
    id: number,
    name: string
}

export default function AllTrainees(props: Props) {

    let [isMobile, setIsMobile] = React.useState(false);
    let [coursesAndClients, setCoursesAndClients] = React.useState([]);
    let [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        setIsMobile(mobile);

        fetch("/api/AllTrainees").then(res => res.json()).then(res => {
            setCoursesAndClients(res.coursesAndClients);
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
    } else {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center mt-10 md:mt-0">
                    <div className="flex flex-col items-center justify-center w-9/12">
                        <div className="mb-12">
                            <Title title="All Trainees" showDate={!isMobile} showBackButton={true} previousPage="/" />
                        </div>
    
                        {
                            coursesAndClients.map((course: any) => {        
                                return <div key={course.name} className="flex flex-col justify-center items-center">
                                    <h3 className="text-darkblue text-center text-3xl font-semibold mb-1">{course.course}</h3>
                                    <div className="flex flex-wrap justify-center mb-5">
                                        {
                                            course.clients.map((client: any)=> {
                                                return <Client key={client.name+"-"+client.company} name={client.name} company={client.company} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};