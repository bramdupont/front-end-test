export type User = {
	id: number;
	type: string;
	status: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	bio: string;
	companyName: string;
	country: string;
	city: string;
	postalCode: string;
	address: string;
	vatNumber: string;
};

export type ServerActionResult = {
	success: boolean;
	user?: User;
	error?: string;
};

export type CreateUserAction = (formData: FormData) => Promise<ServerActionResult>;
export type UpdateUserAction = (formData: FormData) => Promise<ServerActionResult>;
export type DeleteUserAction = () => Promise<{ success: boolean }>;
