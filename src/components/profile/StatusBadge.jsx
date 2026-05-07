import clsx from 'clsx';

const StatusBadge = ({ status, isPayment }) => (
    <span className={clsx(
        "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
        status === 'confirmed' || status === 'paid' ? "bg-green-50 text-green-700 border-green-100" :
        status === 'requested' ? "bg-amber-50 text-amber-600 border-amber-100" :
        status === 'cancelled' || status === 'no-show' ? "bg-red-50 text-red-700 border-red-100" : "bg-gray-100 text-gray-500 border-gray-50"
    )}>
        {status}
    </span>
);

export default StatusBadge;
