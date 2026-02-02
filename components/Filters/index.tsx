import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
export const Filters = () => {
	return (
		<div className="flex justify-between items-center">
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
							defaultValue="all"
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
							<option value="connect">Connect</option>
							<option value="service">Service</option>
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
							defaultValue="all"
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
							<option value="deactivated">Deactivated</option>
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
							defaultValue="all"
							className="col-start-1 row-start-1 w-full appearance-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1473CC] sm:text-sm/6"
						>
							<option value="all">All</option>
							<option value="climapulse">Climapulse</option>
							<option value="climapulse">Climapulse</option>
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
