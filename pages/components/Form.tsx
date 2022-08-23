import React from 'react'

import Title from './Title'

type Props = {
    course: any,
    toast: any,
}

type Response = {
    error?: string,
    message?: string
}

export default function Form(props: Props) {

    let [name, setName] = React.useState("")
    let [company, setCompany] = React.useState("")
    const inputStyle = "rounded-md bg-green font-bold placeholder-neutral-200 text-white text-2xl w-full p-2 pl-2";

    return (
        <div className="flex flex-col justify-between items-center h-80 mt-4">
            <Title title={props.course} showDate={true} showBackButton={true} previousPage="/" />
            
            <input type="text" placeholder="Your Name" className={inputStyle} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Your Company" className={inputStyle} onChange={(e) => setCompany(e.target.value)} />
            <button onClick={() => { 
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
                });
            }} className="bg-darkblue text-3xl w-fit p-1 px-3 font-bold text-white rounded-md">Sign In</button>
        </div>
    )
}
