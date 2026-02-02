export function UserDetailSkeleton() {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
			{/* Header skeleton */}
			<div className="flex items-center justify-between gap-x-2 mb-4">
				<div className="flex items-center gap-x-2">
					{/* Name */}
					<div className="h-9 bg-neutral-700 rounded w-48" />
					{/* Type badge */}
					<div className="h-8 w-20 bg-neutral-700 rounded-full" />
					{/* Status */}
					<div className="h-6 w-16 bg-neutral-700 rounded" />
				</div>
				{/* Delete button */}
				<div className="h-12 w-32 bg-neutral-800 rounded" />
			</div>

			{/* Personal information card */}
			<div className="bg-neutral-800 p-6 rounded-md mt-4">
				<div className="flex items-center justify-between mb-8">
					<div className="h-6 bg-neutral-700 rounded w-40" />
					<div className="h-12 w-20 bg-neutral-700 rounded" />
				</div>
				<div className="grid grid-cols-2 gap-x-12 gap-y-8 w-8/12">
					{/* First name */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-20 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-32" />
					</div>
					{/* Last name */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-20 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-32" />
					</div>
					{/* Email */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-16 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-48" />
					</div>
					{/* Phone */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-16 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-36" />
					</div>
					{/* Bio */}
					<div className="col-span-2">
						<div className="h-4 bg-neutral-700 rounded w-12 mb-2" />
						<div className="space-y-2">
							<div className="h-5 bg-neutral-600 rounded w-full" />
							<div className="h-5 bg-neutral-600 rounded w-5/6" />
							<div className="h-5 bg-neutral-600 rounded w-4/6" />
						</div>
					</div>
				</div>
			</div>

			{/* Company information card */}
			<div className="bg-neutral-800 p-6 rounded-md mt-4">
				<div className="flex items-center justify-between mb-8">
					<div className="h-6 bg-neutral-700 rounded w-44" />
					<div className="h-12 w-20 bg-neutral-700 rounded" />
				</div>
				<div className="grid grid-cols-2 gap-x-12 gap-y-8 w-8/12">
					{/* Company name */}
					<div className="col-span-2">
						<div className="h-4 bg-neutral-700 rounded w-24 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-40" />
					</div>
					{/* Country */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-20 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-28" />
					</div>
					{/* City */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-16 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-32" />
					</div>
					{/* Postal code */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-24 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-20" />
					</div>
					{/* Street */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-16 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-36" />
					</div>
					{/* VAT */}
					<div>
						<div className="h-4 bg-neutral-700 rounded w-16 mb-2" />
						<div className="h-5 bg-neutral-600 rounded w-32" />
					</div>
				</div>
			</div>
		</div>
	);
}
