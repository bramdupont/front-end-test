import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {User, CreateUserAction} from "@/types";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ToastProvider";
import { CreateUserModal } from "@/components/CreateUserModal";

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
	createAction: CreateUserAction;
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

	return (
		<div className="flex justify-between items-center">
			<CreateUserModal open={open} onOpenChange={onOpenChange} onSubmit={handleSubmit} types={types} statuses={states} />
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
						aria-label="Search users"
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
