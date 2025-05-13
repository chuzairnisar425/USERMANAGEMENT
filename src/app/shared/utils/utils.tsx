export function bytesToMB(bytes: number) {
    const MB = bytes / (1024 * 1024);
    return MB;
}

export function timeAgo(dateString: string): string {
    const now = new Date();
    const pastDate = new Date(dateString);
    const differenceInMilliseconds = now.getTime() - pastDate.getTime();

    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const differenceInYears = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));

    if (differenceInMinutes < 60) {
        return `${differenceInMinutes} minutes ago`;
    } else if (differenceInHours < 24) {
        return `${differenceInHours} hours ago`;
    } else if (differenceInDays < 365) {
        return `${differenceInDays} days ago`;
    } else {
        return `${differenceInYears} years ago`;
    }
}

export const colors = ['teal', 'cyan', 'indigo', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'lime', 'violet'];

export const formatDate = (dateString: string): string => {
    // Parse the date string, whether it's ISO or simple date format
    const date = new Date(dateString);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Extract day, month, and year parts
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' }); // Short month name like 'Jul'
    const year = date.getFullYear();

    // Return formatted date as "17July, 2023"
    return `${day} ${month}, ${year}`;
};

export const isDateFormat = (dateString: string): boolean => {
    // ISO 8601 date formats with optional milliseconds and Z suffix
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
    const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd

    return isoRegex.test(dateString) || simpleDateRegex.test(dateString);
};

export type Record = {
    [key: string]: any;
};

export const parseFormattedDate = (formattedDate: string): string => {
    const [day, month, year] = formattedDate.split(' ');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth() + 1;
    const paddedMonth = monthIndex.toString().padStart(2, '0');
    const paddedDay = day.replace(/[^0-9]/g, '').padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
};

export const formatCurrency = (val: string) => {
    if (!val) return val;
    // Remove all non-numeric characters except commas and periods
    val = val.replace(/[^0-9.]/g, '');

    // Split the number on the decimal point
    const parts = val.split('.');

    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Join the parts back together
    return parts.join('.');
};

export const removeFormateCurrency = (val: string) => {
    // Remove all non-numeric characters except periods
    val = val.replace(/[^0-9]/g, '');
    return val ? (val.length < 12 ? parseInt(val) : parseInt(val.slice(0, 12))) : '';
};

// { count: 5 }, { refetchOnMountOrArgChange: true }
