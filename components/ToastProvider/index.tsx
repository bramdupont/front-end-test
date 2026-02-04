"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "@/components/ui/toast";

type ToastConfig = {
	title: string;
	message: string;
	type: "success" | "error";
};

type ToastContextType = {
	showToast: (config: ToastConfig) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_DURATION_MS = 5000;

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toast, setToast] = useState<ToastConfig | null>(null);

	const showToast = (config: ToastConfig) => {
		setToast(config);
		setTimeout(() => {
			setToast(null);
		}, TOAST_DURATION_MS);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<Toast
					title={toast.title}
					message={toast.message}
					type={toast.type}
				/>
			)}
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
