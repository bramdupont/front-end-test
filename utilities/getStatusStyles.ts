export const getStatusStyles = (status: string): string => {
    if (status === "inactive") return "text-gray-400";
    if (status === "deactivated") return "text-red-300";
    return "text-white";
};