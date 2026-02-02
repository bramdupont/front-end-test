import { PageClient } from "@/app/(dashboard)/archive/page.client";

export default async function Archive() {

	try {
		const data = await fetch(`${process.env.BACKEND_URL}/users`);
		const users = await data.json();

		if (!data.ok) {
			throw new Error(`Failed to fetch users: ${data.status}`);
		}

		return <PageClient users={users}/>;
	} catch (error) {
		console.error(error);
		return (
			<div className="container mx-auto">
				<p className="text-white">Failed to load users.</p>
			</div>
		);
	}
}
