import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import toast from 'react-simple-toasts';

import Logo from './components/Logo';
import Form from './components/Form';
import Title from './components/Title';
import SignOutForm from './components/SignOutForm';

import { prisma } from "../lib/prisma";
import Client from './components/Client';

export async function getServerSideProps(context: any) {

    const course = context.query.course;
    const option = context.query.option;

    if(!course || !option) return { props: {redirect: true, clients: []}};

    let courseID = 0;
    let clientsOfCourse: {}[] = [];

    // Gets the course ID, then uses it in the clients search
    await prisma.courses.findMany({
        where: {
            name: course!.toString()
        }
    }).then(result => {
        if(result.length !== 1) {
            return { props: {redirect: true, clients: [], course: course, option: option}};
        } else {
            courseID = result[0].id;
        }
    }).then(async () => {
        await prisma.clients.findMany({
            where: {
                course: courseID
            }
        }).then(clients => {
            clientsOfCourse = clients;
            return {
                props: {
                    clients: clientsOfCourse,
                    option: option,
                    course: course,
                    error: false
                }
            };
        });
    });

    return {
        props: {
            clients: clientsOfCourse,
            option: option,
            course: course,
            error: false
        }
    };
}

type Props = {
    clients: {}[],
    option?: string,
    course?: string
    error?: boolean
}

export default function Course(props: Props) {
    if(props.error) {
        useRouter().push("/");
    }

    if(props.option === "signin") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center">
                    <div className="6/12">
                        <Form course={props.course} toast={toast} />
                    </div>
                </div>
            </div>
        );
    } else if(props.option === "signout") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center h-96">
                    <div className="flex flex-col items-center justify-center 6/12">
                        <div className="mb-12">
                            <Title title={props.course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                        </div>
                        <SignOutForm clients={props.clients} course={props.course!.toString()} toast={toast} />
                    </div>
                </div>
            </div>
        );
        
    } else if(props.option === "registered") {
        return (
            <div>
                <Logo />
                <div className="flex justify-center items-center h-96">
                    <div className="flex flex-col items-center justify-center 6/12">
                        <div className="mb-12">
                            <Title title={props.course!.toString()} showDate={true} showBackButton={true} previousPage="/" />
                        </div>
                        <Client />
                    </div>
                </div>
            </div>
        );
    } else {
        useRouter().push("/");
    }
}
