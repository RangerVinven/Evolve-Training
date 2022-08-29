import React, { useEffect } from 'react'

type Props ={
    course: string,
	toast: any,
	clients: {
		clients: [Client]
	}
}

type Client = {
	id: Number,
	name: string,
	company: string,
}

export default function SignOutForm(props: Props) {

	let [selectedClientID, setSelectedClientID] = React.useState(0);

	console.log(props.clients);
	

	return (
		<div className="flex flex-col justify-center items-center">
			<select onChange={(event) => {
				setSelectedClientID(Number(event.target.value));
			}} defaultValue="Your Name" className="w-96 h-12 mb-5 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
				<option disabled>Your Name</option>
				{
					props.clients.clients!.map((client: any) => {
						return (
							<option key={client.id} value={client.id}>{client.name} - {client.company}</option>
						)
					})
				}
			</select>
			<button onClick={() => {
				fetch("/api/RemoveClient", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"clientID": selectedClientID,
					})
				}).then(res => {
					if(res.status === 200) {
						props.toast("👍 You're Signed Out", {
                            clickClosable: true,
                            render: (text: string) => <div className="bg-lime-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
                        });
					} else if (res.status === 400) {
						props.toast("👎 Client ID Not Found", {
							clickClosable: true,
							render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
						});
					} else {
						props.toast("👎 Something Went Wrong", {
							clickClosable: true,
							render: (text: string) => <div className="bg-red-500 text-2xl text-white font-bold px-10 py-2 rounded-lg">{text}</div>
						});
					}
				});
			}} className="bg-darkblue text-2xl w-fit p-1 px-2 mt-8 font-bold text-white rounded-md">Sign Out</button>
		</div>
	);
};
