import { PageClient } from "@/app/(dashboard)/archive/page.client";
import { revalidatePath } from "next/cache";

function getBackendUrl() {
	const url = process.env.BACKEND_URL;
	if (!url) {
		throw new Error("BACKEND_URL environment variable is not defined");
	}
	return url;
}

export default async function Archive() {

	const addUser = async (document: FormData) => {
		"use server";
		try {
			const userData = Object.fromEntries(document.entries());

			const data = await fetch(`${getBackendUrl()}/users`, {
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
			return { success: false, error: String(error) };
		}
	}

	try {
		const data = await fetch(`${getBackendUrl()}/users`);
		if (!data.ok) {
			throw new Error(`Failed to fetch users: ${data.status}`);
		}

		const users = await data.json();

		return <PageClient users={users} createAction={addUser}/>;
	} catch {
		return (
			<div className="container mx-auto">
				<p className="text-white">Failed to load users.</p>
			</div>
		);
	}
}
