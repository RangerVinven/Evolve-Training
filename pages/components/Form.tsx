import React from 'react'
import ReactLoading from 'react-loading'

import Title from './Title'

type Props = {
    course: any,
    toast: any,
    onMobile: boolean
}

export default function Form(props: Props) {

    let [name, setName] = React.useState("")
    let [company, setCompany] = React.useState("")
    let inputStyle = "rounded-md bg-green font-bold placeholder-neutral-200 text-white text-2xl w-full p-2 pl-2";

    let [submitLoading, setSubmitLoading] = React.useState(false);

    return (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/2">
            <div className="flex flex-col justify-between items-center mt-4 h-full">                
                <input type="text" placeholder="Your Name" className={inputStyle} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Your Company" className={inputStyle} onChange={(e) => setCompany(e.target.value)} />
                <button onClick={() => {
                    setSubmitLoading(true);
                    fetch("/api/AddClient", {
                        method: "POST",
                        body: JSON.stringify({
                            "name": name,
                            "company": company,
                            "course": props.course
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(async response => {
                        if(response.status === 200) {
                            props.toast("👍 You're Signed In", {
                                clickClosable: true,
                                render: (text: string) => <div className="bg-lime-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
                            });
                        } else if (response.status === 400) {
                            const responseJSON = JSON.parse(await response.text());
                            if(responseJSON.error === "Please enter all the fields") {
                                props.toast("👎 Please enter all the fields", {
                                    clickClosable: true,
                                    render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
                                });
                            } else {
                                props.toast("👎 Selected Course Doesn't Exist", {
                                    clickClosable: true,
                                    render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
                                });
                            }
                        } else {
                            props.toast("👎 Something Went Wrong", {
                                clickClosable: true,
                                render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
                            });
                        }
                        setSubmitLoading(false);
                    });
                }} className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md">Sign In</button>
            </div>
            { submitLoading ? <div className="flex justify-center mt-20"><ReactLoading type="spinningBubbles" color="#1F5C78" height={125} width={125} /></div> : <div></div> }
        </div>
    )
}
