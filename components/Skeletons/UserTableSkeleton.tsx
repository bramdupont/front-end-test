export function UserTableSkeleton() {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			{/* Filters skeleton */}
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center justify-start gap-4">
					{/* Search input skeleton */}
					<div className="h-12 w-64 bg-neutral-800 rounded animate-pulse" />
					{/* Filter dropdowns skeleton */}
					<div className="h-12 w-32 bg-neutral-800 rounded animate-pulse" />
					<div className="h-12 w-32 bg-neutral-800 rounded animate-pulse" />
					<div className="h-12 w-40 bg-neutral-800 rounded animate-pulse" />
				</div>
				{/* Create button skeleton */}
				<div className="h-12 w-32 bg-neutral-700 rounded animate-pulse" />
			</div>

			{/* Table skeleton */}
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
											<span className="sr-only">Actions</span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/10">
									{/* Skeleton rows */}
									{[...Array(8)].map((_, i) => (
										<tr key={i} className="animate-pulse">
											{/* Name and email column */}
											<td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-2">
												<div className="h-4 bg-neutral-700 rounded w-32 mb-2" />
												<div className="h-3 bg-neutral-800 rounded w-40" />
											</td>
											{/* Phone column */}
											<td className="px-3 py-4 text-sm whitespace-nowrap">
												<div className="h-4 bg-neutral-700 rounded w-28" />
											</td>
											{/* Type badge column */}
											<td className="px-3 py-4 text-sm whitespace-nowrap">
												<div className="h-7 bg-neutral-700 rounded-full w-20" />
											</td>
											{/* Status column */}
											<td className="px-3 py-4 text-sm whitespace-nowrap">
												<div className="h-4 bg-neutral-700 rounded w-16" />
											</td>
											{/* Company column */}
											<td className="px-3 py-4 text-sm whitespace-nowrap">
												<div className="h-4 bg-neutral-700 rounded w-36 mb-2" />
												<div className="h-3 bg-neutral-800 rounded w-48" />
											</td>
											{/* Actions column */}
											<td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
												<div className="h-3 w-3 bg-neutral-700 rounded ml-auto" />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/* Pagination skeleton */}
			<div className="flex items-center justify-between mt-8">
				<div className="h-10 w-32 bg-neutral-800 rounded animate-pulse" />
				<div className="flex gap-2">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="h-10 w-10 bg-neutral-800 rounded animate-pulse" />
					))}
				</div>
				<div className="h-10 w-32 bg-neutral-800 rounded animate-pulse" />
			</div>
		</div>
	);
}
