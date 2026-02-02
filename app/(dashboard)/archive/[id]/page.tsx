import { PageClient } from "@/app/(dashboard)/archive/[id]/page.client";

export default async function Archive({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;

	const deleteUser = async () => {
		"use server";
		try {
			console.log("delete user");
			const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {method: "DELETE"});
			const user = await data.json();

			console.log(user);

			if (!data.ok) {
				throw new Error(`Failed to delete user: ${data.status}`);
			}
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}

	try {
		const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`);
		const user = await data.json();

		if (!data.ok) {
			throw new Error(`Failed to fetch user: ${data.status}`);
		}

		return <PageClient user={user} deleteUserAction={deleteUser} />;
	} catch (error) {
		console.error(error);
		return (
			<div className="container mx-auto">
				<p className="text-white">Failed to load user.</p>
			</div>
		);
	}
}
