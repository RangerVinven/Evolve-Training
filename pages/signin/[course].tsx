import React from 'react'
import { useRouter } from 'next/router'

import Logo from '../components/Logo';
import Form from '../components/Form';

export default function signIn() {

    const router = useRouter();
    const course = router.query.course;

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
}
