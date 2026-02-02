import { PageClient } from "@/app/(dashboard)/archive/[id]/page.client";
import {revalidatePath} from "next/cache";

export default async function Archive({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;

	const updateUser = async (document: FormData) => {
		"use server";
		try {
			const userData = Object.fromEntries(document.entries());

			const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!data.ok) {
				throw new Error(`Failed to update user: ${data.status}`);
			}

			const newUser = await data.json();

			revalidatePath('/archive');

			return { success: true, user: newUser };
		} catch (error) {
			console.error('Error updating user:', error);
			return { success: false, error: String(error) };
		}
	}

	const deleteUser = async () => {
		"use server";
		try {
			const data = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {method: "DELETE"});
			const user = await data.json();

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

		return <PageClient user={user} deleteUserAction={deleteUser} updateUserAction={updateUser} />;
	} catch (error) {
		console.error(error);
		return (
			<div className="container mx-auto">
				<p className="text-white">Failed to load user.</p>
			</div>
		);
	}
}
