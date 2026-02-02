const DEFAULT_MAX_LENGTH = 20;

export const truncateText = (text: string, maxLength: number = DEFAULT_MAX_LENGTH): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
};