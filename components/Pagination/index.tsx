"use client";
import clsx from "clsx";
import type React from "react";
import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export const Pagination: React.FC<{
	className?: string;
	page: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}> = ({ className, page, totalItems, itemsPerPage, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const hasNextPage = page < totalPages;
	const hasPrevPage = page > 1;

	const hasExtraPrevPages = page - 1 > 1;
	const hasExtraNextPages = page + 1 < totalPages;

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div
			className={clsx(
				className,
				"flex items-center justify-center gap-2 px-4 sm:px-0 mt-12 mb-8",
			)}
		>
			<PaginationComponent>
				<PaginationContent className="flex gap-2">
					<PaginationItem className="pagination__item previous">
						<PaginationPrevious
							className="arrow cursor-pointer"
							disabled={!hasPrevPage}
							onClick={() => {
								onPageChange(page - 1);
							}}
						/>
					</PaginationItem>

					{hasExtraPrevPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					{hasPrevPage && (
						<PaginationItem className="cursor-pointer inline-flex items-center border-transparent text-sm font-medium text-white rounded-md hover:text-black hover:bg-neutral-200 bg-neutral-700  transition-all duration-150 ease-in-out">
							<PaginationLink
								onClick={() => {
									onPageChange(page - 1);
								}}
								className="cursor-pointer px-2 py-0.5"
							>
								{page - 1}
							</PaginationLink>
						</PaginationItem>
					)}

					<PaginationItem className="cursor-pointer inline-flex items-center border-transparent text-sm font-medium text-black rounded-md hover:bg-neutral-500 bg-white hover:text-white transition-all duration-150 ease-in-out">
						<PaginationLink
							isActive
							onClick={() => {
								onPageChange(page);
							}}
							className="cursor-pointer px-2 py-0.5"
						>
							{page}
						</PaginationLink>
					</PaginationItem>

					{hasNextPage && (
						<PaginationItem className="cursor-pointer inline-flex items-center border-transparent text-sm font-medium text-white rounded-md  hover:text-black hover:bg-neutral-200 bg-neutral-700  transition-all duration-150 ease-in-out">
							<PaginationLink
								onClick={() => {
									onPageChange(page + 1);
								}}
								className="cursor-pointer px-2 py-0.5"
							>
								{page + 1}
							</PaginationLink>
						</PaginationItem>
					)}

					{hasExtraNextPages && (
						<PaginationItem className="pagination__item">
							<PaginationEllipsis />
						</PaginationItem>
					)}

					<PaginationItem className="pagination__item next">
						<PaginationNext
							className="arrow cursor-pointer"
							disabled={!hasNextPage}
							onClick={() => {
								onPageChange(page + 1);
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationComponent>
		</div>
	);
};
