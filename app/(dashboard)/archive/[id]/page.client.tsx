"use client";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { getTypeStyles } from "@/utilities/getTypeStyles";
import { getStatusStyles } from "@/utilities/getStatusStyles";
import { useToast } from "@/components/ToastProvider";
import {useState, useTransition} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'

export const PageClient = ({ user, deleteUserAction, updateUserAction }: { user: User; deleteUserAction: () => Promise<unknown>; updateUserAction: (document: FormData) => Promise<{
		success: boolean;
		user: any;
		error?: undefined;
	} | {
		success: boolean;
		error: string;
		user?: undefined;
	}>}) => {
	const router = useRouter();
	const { showToast } = useToast();
	const [openPersonal, setOpenPersonal] = useState(false)
	const [openCompany, setOpenCompany] = useState(false)
	const [isUpdatingDocument, startUpdatingDocument] = useTransition();

	const handleDeleteClick = async (e: React.MouseEvent) => {
		e.preventDefault();

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

	const handleUpdateUser = (document: FormData) => {
		startUpdatingDocument(async () => {
			try {
				const result = await updateUserAction(document) as { success: boolean };

				if (result.success) {
					showToast({
						title: 'User updated',
						message: `${user.firstName} ${user.lastName} has been successfully updated.`,
						type: 'success'
					});

				} else {
					showToast({
						title: 'Update failed',
						message: 'Failed to update user. Please try again.',
						type: 'error'
					});
				}
			} catch (error) {
				console.error('Update error:', error);
				showToast({
					title: 'Error',
					message: 'An error occurred while updating the user.',
					type: 'error'
				});
			}
		});
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const id = e.currentTarget.getAttribute('id');
		const formData = new FormData(e.currentTarget);
		handleUpdateUser(formData);
		if(id === 'personal') setOpenPersonal(false)
		else setOpenCompany(false);
		e.currentTarget.reset();
	};

	const EditPersonalInformation = ({open, onOpenChange}: {open: boolean; onOpenChange: (state: boolean) => void}) => {
			return (
					<Dialog open={open} onClose={onOpenChange} className="relative z-10">
						<DialogBackdrop
							transition
							className="fixed inset-0 bg-black/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
						/>

						<div className="fixed inset-0 z-10 overflow-y-auto">
							<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
								<DialogPanel
									transition
									className="relative container mx-auto transform overflow-hidden rounded-lg bg-neutral-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 max-w-2xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
								>
									<div className="flex items-center justify-between">
										<DialogTitle as="h3" className="text-base font-semibold text-white">
											Edit Personal Information
										</DialogTitle>
										<button
											type="button"
											onClick={() => onOpenChange(false)}
											className="text-white border p-3 border-neutral-400 rounded-md"
										>
											<XMarkIcon
												aria-hidden="true"
												className="size-3"
											/>
										</button>
									</div>
									<form onSubmit={handleSubmit} id="personal" className="mt-8 space-y-4">
										<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="firstName">
												First name
											</label>
											<input
												type="text"
												id="firstName"
												name="firstName"
												defaultValue={user.firstName}
												className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
											/>
										</div>
										<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="lastName">
												Last name
											</label>
											<input
												type="text"
												id="lastName"
												name="lastName"
												defaultValue={user.lastName}
												className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
											/>
										</div>
										<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="email">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												defaultValue={user.email}
												className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
											/>
										</div>
										<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="phone">
												Phone
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												defaultValue={user.phone}
												className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
											/>
										</div>
										<div className="bg-neutral-800 text-white flex items-start px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm w-24 flex-shrink-0 pt-3" htmlFor="bio">
												Bio
											</label>
											<textarea
												id="bio"
												name="bio"
												rows={4}
												defaultValue={user.bio}
												className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm resize-none"
											/>
										</div>
										<div className="mt-5 sm:mt-6">
											<button
												type="submit"
												className="inline-flex w-full justify-center rounded-md cursor-pointer bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-90"
											>
												Update information
											</button>
										</div>
									</form>
								</DialogPanel>
							</div>
						</div>
					</Dialog>
			)
	}
	const EditCompanyInformation = ({open, onOpenChange}: {open: boolean; onOpenChange: (state: boolean) => void}) => {
		return (
				<Dialog open={open} onClose={onOpenChange} className="relative z-10">
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
					/>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<DialogPanel
								transition
								className="relative container mx-auto transform overflow-hidden rounded-lg bg-neutral-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 max-w-2xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
							>
								<div className="flex items-center justify-between">
									<DialogTitle as="h3" className="text-base font-semibold text-white">
										Edit Company Information
									</DialogTitle>
									<button
										type="button"
										onClick={() => onOpenChange(false)}
										className="text-white border p-3 border-neutral-400 rounded-md"
									>
										<XMarkIcon
											aria-hidden="true"
											className="size-3"
										/>
									</button>
								</div>
								<form onSubmit={handleSubmit} id="company" className="mt-8 space-y-4">
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="companyName">
											Name
										</label>
										<input
											type="text"
											id="companyName"
											name="companyName"
											defaultValue={user.companyName}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="country">
											Country
										</label>
										<input
											type="text"
											id="country"
											name="country"
											defaultValue={user.country}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="city">
											City
										</label>
										<input
											type="text"
											id="city"
											name="city"
											defaultValue={user.city}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="postalCode">
											Postal code
										</label>
										<input
											type="text"
											id="postalCode"
											name="postalCode"
											defaultValue={user.postalCode}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="address">
											Street
										</label>
										<input
											type="text"
											id="address"
											name="address"
											defaultValue={user.address}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="vatNumber">
											VAT
										</label>
										<input
											type="text"
											id="vatNumber"
											name="vatNumber"
											defaultValue={user.vatNumber}
											className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
										/>
									</div>
									<div className="mt-5 sm:mt-6">
										<button
											type="submit"
											className="inline-flex w-full justify-center rounded-md cursor-pointer bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-90"
										>
											Update information
										</button>
									</div>
								</form>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
		)
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
						onClick={() => setOpenPersonal(true)}
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
						onClick={() => setOpenCompany(true)}
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
			<EditPersonalInformation open={openPersonal} onOpenChange={setOpenPersonal}/>
			<EditCompanyInformation open={openCompany} onOpenChange={setOpenCompany}/>
		</div>
	);
};
