import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {User} from "@/types";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ToastProvider";

type FiltersProps = {
	data: User[];
	open: boolean;
	onOpenChange: (state: boolean) => void;
	searchQuery: string;
	onSearchChange: (value: string) => void;
	selectedType: string;
	onTypeChange: (value: string) => void;
	selectedState: string;
	onStateChange: (value: string) => void;
	selectedCompany: string;
	onCompanyChange: (value: string) => void;
	createAction: any;
};

export const Filters = ({
	data,
	open,
	onOpenChange,
	searchQuery,
	onSearchChange,
	selectedType,
	onTypeChange,
	selectedState,
	onStateChange,
	selectedCompany,
	onCompanyChange,
	createAction,
}: FiltersProps) => {
	const types = Array.from(new Set(data?.map(user => user.type).filter(Boolean))) as string[];
	const states = Array.from(new Set(data?.map(user => user.status).filter(Boolean))) as string[];
	const companies = Array.from(new Set(data?.map(user => user.companyName).filter(Boolean))) as string[];
	const [isCreatingDocument, startCreatingDocument] = useTransition();
	const { showToast } = useToast();
	const router = useRouter();

	function createDocument(document: FormData) {
		startCreatingDocument(async () => {
			try {
				const result = await createAction(document) as { success: boolean };
				const firstName = document.get('firstName') as string;
				const lastName = document.get('lastName') as string;
				const name = firstName + ' ' + lastName;

				if (result.success) {
					showToast({
						title: 'User created',
						message: `${name} has been successfully created.`,
						type: 'success'
					});

					router.push('/archive');
				} else {
					showToast({
						title: 'Creation failed',
						message: 'Failed to create a user. Please try again.',
						type: 'error'
					});
				}
			} catch (error) {
				console.error('Creating error:', error);
				showToast({
					title: 'Error',
					message: 'An error occurred while creating a user.',
					type: 'error'
				});
			}
		});
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		createDocument(formData);
		onOpenChange(false);
		e.currentTarget.reset();
	};

	const CreateUserModal = ({open, onOpenChange}: {open: boolean; onOpenChange: (state: boolean) => void}) => {
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
								<form onSubmit={handleSubmit} className="mt-8 space-y-4">
									<div className="flex justify-center w-full bg-neutral-800 text-white">
										<div className="flex flex-col flex-1 items-center justify-start px-4 py-3 rounded-md">
											<label className="text-neutral-400 text-sm flex-shrink-0 mb-4" htmlFor="firstName">
												Type <span className="text-red-400">*</span>
											</label>
											<div className="grid grid-cols-1 bg-neutral-700 ms-4 p-3 w-full rounded-md">
												<select
													id="type"
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
											<label className="text-neutral-400 text-sm flex-shrink-0 mb-4" htmlFor="firstName">
												Status<span className="text-red-400">*</span>
											</label>
											<div className="grid grid-cols-1 bg-neutral-700 ms-4 p-3 w-full rounded-md">
												<select
													id="state"
													name="state"
													defaultValue="active"
													className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
												>
													{states.map(state => (
														<option key={state} value={state} className="capitalize">
															{state.charAt(0).toUpperCase() + state.slice(1)}
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="firstName">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="lastName">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="email">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="phone">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0 pt-3" htmlFor="bio">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="companyName">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="country">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="city">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="postalCode">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="address">
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
										<label className="text-neutral-400 text-sm w-24 flex-shrink-0" htmlFor="vatNumber">
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
		)
	}

	return (
		<div className="flex justify-between items-center">
			<CreateUserModal open={open} onOpenChange={onOpenChange} />
			<div className="flex items-center justify-start gap-4">
				<div className="relative">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-4 absolute top-1/2 start-3 -translate-y-1/2">
						<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
					</svg>
					<input
						type="search"
						id="search"
						name="search"
						placeholder="Search..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="bg-neutral-800 p-3 pl-9 text-white placeholder:neutral-500"
					/>
				</div>
				<div className="bg-neutral-800 text-white flex items-center gap-4 p-3">
					<label className="text-neutral-500" htmlFor="type">
						Type
					</label>
					<div className="grid grid-cols-1">
						<select
							id="type"
							name="type"
							value={selectedType}
							onChange={(e) => onTypeChange(e.target.value)}
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
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
				<div className="bg-neutral-800 text-white flex items-center gap-4 p-3">
					<label className="text-neutral-500" htmlFor="state">
						State
					</label>
					<div className="grid grid-cols-1">
						<select
							id="state"
							name="state"
							value={selectedState}
							onChange={(e) => onStateChange(e.target.value)}
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
							{states.map(state => (
								<option key={state} value={state} className="capitalize">
									{state.charAt(0).toUpperCase() + state.slice(1)}
								</option>
							))}
						</select>
						<ChevronDownIcon
							aria-hidden="true"
							className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-white sm:size-4"
						/>
					</div>
				</div>
				<div className="bg-neutral-800 text-white flex items-center gap-4 p-3">
					<label className="text-neutral-500" htmlFor="Company">
						Company
					</label>
					<div className="grid grid-cols-1">
						<select
							id="Company"
							name="Company"
							value={selectedCompany}
							onChange={(e) => onCompanyChange(e.target.value)}
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
							{companies.map(company => (
								<option key={company} value={company}>
									{company}
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
			<div>
				<button
					type="button"
					onClick={() => onOpenChange(true)}
					className="text-sm flex items-center rounded-sm bg-primary hover:opacity-90 p-3 cursor-pointer text-white shadow-xs"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					Create new
				</button>
			</div>
		</div>
	);
};
