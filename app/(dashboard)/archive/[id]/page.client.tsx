"use client";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { getTypeStyles } from "@/utilities/getTypeStyles";
import { getStatusStyles } from "@/utilities/getStatusStyles";
import { useToast } from "@/components/ToastProvider";

export const PageClient = ({ user, deleteUserAction }: { user: User; deleteUserAction: () => Promise<unknown> }) => {
	const router = useRouter();
	const { showToast } = useToast();

	const handleDeleteClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		console.log('delete clicked');

		try {
			const result = await deleteUserAction() as { success: boolean };

			if (result.success) {
				showToast({
					title: 'User deleted',
					message: `${user.firstName} ${user.lastName} has been successfully deleted.`,
					type: 'success'
				});

				router.push('/archive');
			} else {
				showToast({
					title: 'Delete failed',
					message: 'Failed to delete user. Please try again.',
					type: 'error'
				});
			}
		} catch (error) {
			console.error('Delete error:', error);
			showToast({
				title: 'Error',
				message: 'An error occurred while deleting the user.',
				type: 'error'
			});
		}
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between gap-x-2">
				<div className="flex items-center gap-x-2">
					<h1 className="text-3xl font-bold text-white">{user.firstName} {user.lastName}</h1>
					<div className="text-sm px-3 py-4 whitespace-nowrap capitalize">
													<span
														className={`px-3 py-1.5 font-semibold text-black rounded-full ${getTypeStyles(user.type)}`}
													>
														{user.type}
													</span>
					</div>
					<div
						className={`text-sm whitespace-nowrap capitalize ${getStatusStyles(user.status)}`}
					>
						{user.status}
					</div>
				</div>
				<div>
					<button
						type="button"
						onClick={handleDeleteClick}
						className="text-sm flex items-center rounded-sm bg-red-200 text-red-500 hover:opacity-90 p-3 cursor-pointer shadow-xs"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
							<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
						</svg>
						Delete user
					</button>
				</div>
			</div>
			<div className="bg-neutral-800 p-6 rounded-md text-white mt-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold">Personal information</h2>
					<button
						type="button"
						className="text-sm flex items-center rounded-sm border border-neutral-200 hover:bg-neutral-700 p-3 cursor-pointer shadow-xs"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
							<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
						</svg>
						Edit
					</button>
				</div>
				<div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-8 w-8/12">
					<div>
						<p className="text-neutral-400 text-sm mb-2">First name</p>
						<p>{user.firstName}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">Last name</p>
						<p>{user.lastName}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">Email</p>
						<p>{user.email}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">Phone</p>
						<p>{user.phone}</p>
					</div>
					<div className="me-8">
						<p className="text-neutral-400 text-sm mb-2">Bio</p>
						<p>{user.bio}</p>
					</div>
				</div>
			</div>
			<div className="bg-neutral-800 p-6 rounded-md text-white mt-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold">Company information</h2>
					<button
						type="button"
						className="text-sm flex items-center rounded-sm border border-neutral-200 hover:bg-neutral-700 p-3 cursor-pointer shadow-xs"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
							<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
						</svg>
						Edit
					</button>
				</div>
				<div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-8 w-8/12">
					<div className="col-span-2">
						<p className="text-neutral-400 text-sm mb-2">Name</p>
						<p>{user.companyName}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">Country</p>
						<p>{user.country}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">City</p>
						<p>{user.city}</p>
					</div>
					<div>
						<p className="text-neutral-400 text-sm mb-2">Postal code</p>
						<p>{user.postalCode}</p>
					</div>
					<div className="me-8">
						<p className="text-neutral-400 text-sm mb-2">Street</p>
						<p>{user.address}</p>
					</div>
					<div className="me-8">
						<p className="text-neutral-400 text-sm mb-2">VAT</p>
						<p>{user.vatNumber}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
