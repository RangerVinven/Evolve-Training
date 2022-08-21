import React from 'react'
import ReactLoading from 'react-loading';

type Props = {
    clients: {}[]
}

export default function SignOutForm(props: Props) {

    if(props.clients[0].hasOwnProperty("Clients Not Loaded")) {
        return (
            <div className="h-450 flex justify-center items-center">
                <ReactLoading type="spinningBubbles" color="#1F5C78" height={100} width={100} />
            </div>
        );
    } else {
        return (
            <select defaultValue="Your Name" className="w-96 h-12 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
                <option disabled>Your Name</option>
                {
                    props.clients.map((client: any) => {
                        return (
                            <option key={client.id} value={client.name}>{client.name} - {client.company}</option>
                        )
                    })
                }
            </select>
        )
    }
}
