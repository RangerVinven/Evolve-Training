import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import toast from 'react-simple-toasts';

import Logo from './components/Logo';
import Form from './components/Form';
import Title from './components/Title';
import SignOutForm from './components/SignOutForm';

export default function Course(props: any) {
	const router = useRouter();
    const course = router.query.course;
    const option = router.query.option;

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
                <ToastArea />
                <Logo />
                <div className="flex justify-center items-center">
                    <div className="6/12">
                        <Form course={course} toast={toast} />
                    </div>
                </div>
            </div>
        );
    } else if(option === "signout") {
        return (
            <div>
                <ToastArea />
                <Logo />
                <div className="flex justify-center items-center h-96">
                    <div className="flex flex-col items-center justify-center 6/12">
                        <div className="mb-12">
                            <Title title={course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                        </div>
                        <SignOutForm course={course!.toString()} />
                    </div>
                </div>
            </div>
        );
        
    }
}

function ToastArea() {
    return (
        <div className="absolute bottom-5 ml-5">
            
        </div>
    )
}
