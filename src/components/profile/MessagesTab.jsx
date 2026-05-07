const MessagesTab = ({ messages, loading }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-12 animate-fade-in">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8">Messages & Queries</h2>
        <div className="space-y-6">
            {loading ? (
                <div className="py-10 text-center animate-pulse text-gray-400">Loading conversations...</div>
            ) : messages.length === 0 ? (
                <div className="py-20 text-center text-gray-400">No active messages.</div>
            ) : messages.map(msg => (
                <div key={msg.id} className="p-5 lg:p-8 border border-gray-50 rounded-2xl lg:rounded-[2rem] bg-gray-50/20">
                    <div className="pb-4 border-b border-gray-100 flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-sm lg:text-base">{msg.subject}</h3>
                        <span className="text-[10px] bg-white px-3 py-1 rounded-full text-gray-400 font-bold uppercase">{msg.date}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col items-end">
                            <div className="bg-primary text-white p-4 lg:p-5 rounded-2xl lg:rounded-3xl rounded-tr-none max-w-[90%] lg:max-w-[80%] shadow-lg shadow-primary/10">
                                <p className="text-xs lg:text-sm leading-relaxed">{msg.message}</p>
                            </div>
                        </div>
                        {msg.adminReply && (
                            <div className="flex flex-col items-start pt-2">
                                <div className="bg-white border border-gray-100 p-4 lg:p-5 rounded-2xl lg:rounded-3xl rounded-tl-none max-w-[90%] lg:max-w-[80%] shadow-sm">
                                    <p className="text-xs lg:text-sm text-gray-800 leading-relaxed">{msg.adminReply}</p>
                                </div>
                                <span className="text-[10px] text-primary font-bold tracking-widest mt-2 ml-2">ADMIN RESPONSE</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default MessagesTab;
