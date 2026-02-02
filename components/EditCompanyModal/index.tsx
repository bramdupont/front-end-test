import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { User } from "@/types";

type EditCompanyModalProps = {
	open: boolean;
	onOpenChange: (state: boolean) => void;
	user: User;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const EditCompanyModal = ({ open, onOpenChange, user, onSubmit }: EditCompanyModalProps) => {
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
						<form onSubmit={onSubmit} id="company" className="mt-8 space-y-4">
							<div className="bg-neutral-800 text-white flex items-center px-4 py-3 rounded-md">
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="companyName">
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
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="country">
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
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="city">
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
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="postalCode">
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
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="address">
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
								<label className="text-neutral-400 text-sm w-24 shrink-0" htmlFor="vatNumber">
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
	);
};
