import { Bell, Info, CheckCircle, XCircle, Trash } from 'phosphor-react';
import clsx from 'clsx';

const NotificationsTab = ({ notifications, unreadCount, onMarkRead, onDelete }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-12 animate-fade-in">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            Notifications {unreadCount > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse tracking-wider">NEW</span>}
        </h2>
        <div className="space-y-4">
            {notifications.length === 0 ? (
                <div className="py-20 text-center text-gray-400">Your inbox is empty. ✨</div>
            ) : notifications.map(n => (
                <div key={n.id} onMouseEnter={() => !n.read && onMarkRead(n.id)} className={clsx("p-5 lg:p-6 rounded-2xl lg:rounded-3xl border transition-all flex items-start gap-3 lg:gap-4 relative group", n.read ? "bg-white border-gray-50" : "bg-primary/5 border-primary/10 shadow-sm")}>
                    <div className={clsx(
                        "p-2.5 lg:p-3 rounded-xl lg:rounded-2xl shrink-0",
                        n.title.includes('Confirm') ? "bg-green-100 text-green-600" :
                        n.title.includes('Cancel') ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                    )}>
                        {n.title.includes('Confirm') ? <CheckCircle size={20} className="lg:size-6" weight="fill" /> :
                        n.title.includes('Cancel') ? <XCircle size={20} className="lg:size-6" weight="fill" /> : <Info size={20} className="lg:size-6" weight="fill" />}
                    </div>
                    <div className="flex-1 pr-8 lg:pr-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-sm lg:text-base leading-snug">{n.title}</h4>
                            {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                        </div>
                        <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-gray-400 font-bold uppercase mt-2 block tracking-tight">{new Date(n.date).toLocaleString()}</span>
                    </div>
                    <button onClick={() => onDelete(n.id)} className="lg:opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all absolute top-4 right-4">
                        <Trash size={18} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default NotificationsTab;
