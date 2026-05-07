import clsx from 'clsx';
import { CaretRight } from 'phosphor-react';

const ProfileSidebar = ({ tabs, activeTab, onTabChange, badgeCounts }) => (
    <div className="lg:col-span-1">
        <div className="bg-white lg:rounded-2xl rounded-lg shadow-sm border border-gray-100 p-2 lg:p-4 sticky top-5 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={clsx(
                        "flex-shrink-0 flex items-center justify-between px-4 lg:px-4 py-2.5 lg:py-3 text-xs lg:text-sm font-semibold rounded-lg duration-300",
                        activeTab === tab.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20 lg:scale-[1.02]"
                            : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                    )}
                >
                    <div className="flex items-center gap-2.5 lg:gap-3">
                        <tab.icon size={20} weight={activeTab === tab.id ? "fill" : "regular"} />
                        <span className="whitespace-nowrap">{tab.label}</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        {badgeCounts[tab.id] > 0 && (
                            <span className={clsx(
                                "px-1.5 py-0.5 text-[10px] rounded-full font-bold",
                                activeTab === tab.id ? "bg-white text-primary" : "bg-red-500 text-white"
                            )}>
                                {badgeCounts[tab.id]}
                            </span>
                        )}
                        {activeTab === tab.id && <CaretRight size={14} weight="bold" />}
                    </div>
                    {/* Mobile Badge */}
                    {!activeTab !== tab.id && badgeCounts[tab.id] > 0 && (
                        <div className="lg:hidden ml-2 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </button>
            ))}
        </div>
    </div>
);

export default ProfileSidebar;
