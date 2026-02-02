"use client";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const user = {
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
	{ name: "Home", href: "/", icon: "home" },
	{ name: "Archive", href: "/archive", icon: "archive" },
	{ name: "Messages", href: "/messages", icon: "messages" },
];

export const Header = () => {
	const pathname = usePathname();
	const isActive = (href: string) =>
		pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");

	return (
		<>
			<div className="min-h-full mb-12">
				<Disclosure as="nav" className="border-b border-neutral-700">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex items-center">
								<div className="flex shrink-0 items-center">
									<Image
										height="24"
										width="24"
										alt="Climatest Logo"
										src="/assets/logo.svg"
										className="h-8 w-auto dark:hidden relative"
									/>
								</div>
								<p className="ms-4 my-0 font-bold text-xl text-white">
									Climatest
								</p>
							</div>
							<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										aria-current={isActive(item.href) ? "page" : undefined}
										className={clsx(
											isActive(item.href)
												? "border-primary text-white"
												: "border-transparent text-gray-400",
											"inline-flex items-center border-b px-1 pt-1 text-sm font-medium",
										)}
									>
										<Image
											height={18}
											width={18}
											alt={`${item.name} Icon`}
											src={`/assets/icons/${item.icon}.svg`}
											className="me-2"
										/>
										{item.name}
									</Link>
								))}
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<div className="flex flex-col items-end me-6">
									<p className="m-0 text-white text-sm">Paul Pols</p>
									<p className="m-0 text-gray-400 text-sm">Online</p>
								</div>
								<Image
									width="24"
									height="24"
									alt=""
									src="/assets/user_photo.png"
									className="size-8 rounded-full outline relative -outline-offset-1 outline-black/5 dark:outline-white/10"
								/>
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-indigo-500">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									<Bars3Icon
										aria-hidden="true"
										className="block size-6 group-data-open:hidden"
									/>
									<XMarkIcon
										aria-hidden="true"
										className="hidden size-6 group-data-open:block"
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 pt-2 pb-3">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									aria-current={isActive(item.href) ? "page" : undefined}
									className={clsx(
										isActive(item.href)
											? "border-primary text-white"
											: "border-transparent text-gray-400",
										"inline-flex items-center border-b px-1 pt-1 text-sm font-medium",
									)}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
						<div className="border-t border-gray-200 pt-4 pb-3 dark:border-gray-700">
							<div className="flex items-center px-4">
								<div className="shrink-0">
									<Image
										width="24"
										height="24"
										alt=""
										src={user.imageUrl}
										className="relative size-10 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10"
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800 dark:text-white">
										{user.name}
									</div>
									<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
										{user.email}
									</div>
								</div>
							</div>
						</div>
					</DisclosurePanel>
				</Disclosure>
			</div>
		</>
	);
};
