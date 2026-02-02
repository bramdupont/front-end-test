import { PageClient } from "@/app/(dashboard)/archive/page.client";
import { revalidatePath } from "next/cache";

export default async function Archive() {

	const addUser = async (document: FormData) => {
		"use server";
		try {
			const userData = Object.fromEntries(document.entries());

			const data = await fetch(`${process.env.BACKEND_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!data.ok) {
				throw new Error(`Failed to create user: ${data.status}`);
			}

			const newUser = await data.json();

			revalidatePath('/archive');

			return { success: true, user: newUser };
		} catch (error) {
			console.error('Error creating user:', error);
			return { success: false, error: String(error) };
		}
	}

	try {
		const data = await fetch(`${process.env.BACKEND_URL}/users`);
		const users = await data.json();

		if (!data.ok) {
			throw new Error(`Failed to fetch users: ${data.status}`);
		}

		return <PageClient users={users} createAction={addUser}/>;
	} catch (error) {
		console.error(error);
		return (
			<div className="container mx-auto">
				<p className="text-white">Failed to load users.</p>
			</div>
		);
	}
}
