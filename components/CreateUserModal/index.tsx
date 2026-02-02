import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type CreateUserModalProps = {
	open: boolean;
	onOpenChange: (state: boolean) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	types: string[];
	statuses: string[];
};

export const CreateUserModal = ({ open, onOpenChange, onSubmit, types, statuses }: CreateUserModalProps) => {
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
								Create user
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
						<form onSubmit={onSubmit} className="mt-8 space-y-4">
							<div className="flex justify-center w-full bg-neutral-800 text-white">
								<div className="flex flex-col flex-1 items-center justify-start px-4 py-3 rounded-md">
									<label className="text-neutral-400 text-sm shrink-0 mb-4" htmlFor="createType">
										Type <span className="text-red-400">*</span>
									</label>
									<div className="grid grid-cols-1 bg-neutral-700 ms-4 p-3 w-full rounded-md">
										<select
											id="createType"
											name="type"
											className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
										>
											{types.map(type => (
												<option key={type} value={type} className="capitalize">
													{type.charAt(0).toUpperCase() + type.slice(1)}
												</option>
											))}
										</select>
										<ChevronDownIcon
											aria-hidden="true"
											className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-white sm:size-4"
										/>
									</div>
								</div>
								<div className="flex flex-col flex-1 items-center justify-start px-4 py-3 rounded-md">
									<label className="text-neutral-400 text-sm shrink-0 mb-4" htmlFor="createStatus">
										Status<span className="text-red-400">*</span>
									</label>
									<div className="grid grid-cols-1 bg-neutral-700 ms-4 p-3 w-full rounded-md">
										<select
											id="createStatus"
											name="status"
											defaultValue="active"
											className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
										>
											{statuses.map(status => (
												<option key={status} value={status} className="capitalize">
													{status.charAt(0).toUpperCase() + status.slice(1)}
												</option>
											))}
										</select>
										<ChevronDownIcon
											aria-hidden="true"
											className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-white sm:size-4"
										/>
									</div>
								</div>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="firstName">
									First name <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="lastName">
									Last name <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="email">
									Email <span className="text-red-400">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="phone">
									Phone <span className="text-red-400">*</span>
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-start px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0 pt-3" htmlFor="bio">
									Bio <span className="text-red-400">*</span>
								</label>
								<textarea
									id="bio"
									name="bio"
									required
									rows={4}
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm resize-none"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="companyName">
									Name <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="companyName"
									name="companyName"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="country">
									Country <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="country"
									name="country"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="city">
									City <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="city"
									name="city"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="postalCode">
									Postal code <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="postalCode"
									name="postalCode"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="address">
									Street <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="address"
									name="address"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="vatNumber">
									VAT <span className="text-red-400">*</span>
								</label>
								<input
									type="text"
									id="vatNumber"
									name="vatNumber"
									required
									className="ms-4 p-3 w-full appearance-none bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
								/>
							</div>
							<div className="mt-5 sm:mt-6">
								<button
									type="submit"
									className="cursor-pointer inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-90"
								>
									Create user
								</button>
							</div>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};
