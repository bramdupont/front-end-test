import { PageClient } from "@/app/(dashboard)/archive/page.client";

export default async function Archive() {
	const data = await fetch(`${process.env.BACKEND_URL}/users`);
	const users = await data.json();

	return <PageClient users={users} />;
}
