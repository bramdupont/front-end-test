"use client";
import { useState } from "react";
import { Filters } from "@/components/Filters";
import { Pagination } from "@/components/Pagination";
import { User } from "@/types";
import Link from "next/link";
import {getTypeStyles} from "@/utilities/getTypeStyles";
import {getStatusStyles} from "@/utilities/getStatusStyles";
import {truncateText} from "@/utilities/truncateText";
import {Toast} from "@/components/ui/toast";

const MAX_ITEMS_PER_PAGE = 12;

export const PageClient = ({ users }: { users: User[] }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const startIndex = (currentPage - 1) * MAX_ITEMS_PER_PAGE;
	const endIndex = startIndex + MAX_ITEMS_PER_PAGE;
	const paginatedUsers = users?.slice(startIndex, endIndex) || [];
	const [showToast, setShowToast] = useState(false);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);

		// If parent provided onPageChange, use it (for filtered views)
		if (onPageChange) {
			onPageChange(page);
			return;
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<Filters />
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="mt-8 flow-root">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table className="relative min-w-full divide-y divide-white/15">
								<thead>
									<tr>
										<th
											scope="col"
											className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-neutral-400 sm:pl-2"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-400"
										>
											Phone
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-400"
										>
											Type
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-400"
										>
											State
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-400"
										>
											Company
										</th>
										<th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
											<span className="sr-only"></span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/10">
									{paginatedUsers.map((user) => (
										<tr key={user.id} className="hover:bg-neutral-400/10">
											<td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-white sm:pl-2 cursor-pointer">
												<Link href={`/archive/${user.id}/`}>
												<p className="text-md">
													{user.firstName} {user.lastName}
												</p>
												<p className="text-sm text-neutral-400">{user.email}</p>
												</Link>
											</td>
											<td className="px-3 py-4 text-sm whitespace-nowrap text-white">
												{user.phone}
											</td>
											<td className="px-3 py-4 text-sm whitespace-nowrap capitalize">
												<span
													className={`px-3 py-1.5 font-semibold text-black rounded-full ${getTypeStyles(user.type)}`}
												>
													{user.type}
												</span>
											</td>
											<td
												className={`px-3 py-4 text-sm whitespace-nowrap capitalize ${getStatusStyles(user.status)}`}
											>
												{user.status}
											</td>
											<td className="px-3 py-4 text-sm whitespace-nowrap text-white">
												<p>{user.companyName}</p>
												<p>
													{truncateText(
														`${user.address}, ${user.postalCode} ${user.city}, ${user.country}`,
													)}
												</p>
											</td>
											<td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
												<Link
													href={`/archive/${user.id}/`}
													className="text-white hover:text-primary"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={2}
														stroke="currentColor"
														className="size-3"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m8.25 4.5 7.5 7.5-7.5 7.5"
														/>
													</svg>
													<span className="sr-only">, {user.id}</span>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Pagination
				totalItems={users.length}
				itemsPerPage={MAX_ITEMS_PER_PAGE}
				page={currentPage}
				onPageChange={handlePageChange}
				className="pagination__container"
			/>
		</div>
	);
};
