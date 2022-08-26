import React from 'react'

type Props = {
    name: string,
    company: string,
}

export default function Client(props: Props) {
  return (
    <div className="bg-green rounded-md flex flex-col p-2 mr-4 mb-4 font-bold text-white">
        <h1>Name: {props.name}</h1>
        <h1>Company: {props.company}</h1>
    </div>
  )
}
