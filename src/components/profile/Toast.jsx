import clsx from 'clsx';
import { CheckCircle } from 'phosphor-react';

const Toast = ({ notification }) => {
    if (!notification) return null;
    return (
        <div className={clsx(
            "fixed top-24 right-4 z-[9999] px-6 py-4 rounded-2xl shadow-2xl text-white animate-fade-in-right flex items-center gap-3",
            notification.type === 'success' ? "bg-green-600" : "bg-primary"
        )}>
            <CheckCircle size={24} weight="fill" />
            <span className="font-bold">{notification.message}</span>
        </div>
    );
};

export default Toast;
