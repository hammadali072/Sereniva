import React, { useState, useEffect, useRef } from 'react';
import { ChatCircleDots, X, PaperPlaneRight, Robot, Phone, Calendar, AppWindow, Clock, CheckCircle, Info, ArrowRight } from 'phosphor-react';
import clsx from 'clsx';
import * as Data from '../../Data';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'initial',
            type: 'bot',
            content: {
                type: 'welcome',
                title: 'Welcome!',
                text: 'Hello! Welcome to Sereniva Spa. I am your wellness assistant. How can I help you today?',
                options: ['Contact Info', 'Booking', 'Hours']
            },
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isTyping, isOpen]);

    const getBotResponse = (query) => {
        const lowerQuery = query.toLowerCase().trim();
        const services = Data.MassageServicesData || [];
        const contacts = Data.ContactData || [];
        const hours = Data.WorkingHours || [];

        // 1. Specific Massage Detection (Direct mention of a service name)
        const specificMassage = services.find(m =>
            lowerQuery.includes(m.name.toLowerCase()) ||
            (m.name.toLowerCase().includes('aromatherapy') && (lowerQuery.includes('aroma') || lowerQuery.includes('scent'))) ||
            (m.name.toLowerCase().includes('deep tissue') && (lowerQuery.includes('deep') || lowerQuery.includes('tissue'))) ||
            (m.name.toLowerCase().includes('hot stone') && (lowerQuery.includes('hot') || lowerQuery.includes('stone'))) ||
            (m.name.toLowerCase().includes('swedish') && lowerQuery.includes('swedish'))
        );

        if (specificMassage) {
            return { type: 'specific_massage', data: specificMassage };
        }

        // 2. Symptom/Need Matching (Recommendations based on user's problem)
        const recommendations = [
            {
                keys: ['pain', 'chronic', 'muscle', 'stiff', 'athlete', 'sore', 'tension', 'back', 'neck', 'shoulder', 'ache', 'injury', 'recovery', 'heavy'],
                target: 'Deep Tissue Massage',
                reason: 'target those deeper muscle layers and break down stubborn tension knots.'
            },
            {
                keys: ['stress', 'anxiety', 'mood', 'mental', 'relax', 'harmony', 'feeling blue', 'tired', 'burnt out', 'sleep', 'insomnia', 'calm', 'peace'],
                target: 'Aromatherapy Massage',
                reason: 'melt away mental stress and balance your emotions using therapeutic botanical oils.'
            },
            {
                keys: ['warm', 'cold', 'heat', 'circulat', 'melt', 'metabol', 'stiffness', 'warmth', 'winter', 'flu', 'energy'],
                target: 'Hot Stone Massage',
                reason: 'provide deep volcanic warmth that penetrates deep into your muscles to restore flow.'
            },
            {
                keys: ['first time', 'rhythm', 'light', 'gentle', 'classical', 'blood', 'beginner', 'introduction', 'refresh', 'standard'],
                target: 'Swedish Massage',
                reason: 'provide a classic, rhythmic full-body renewal that is both gentle and highly restorative.'
            }
        ];

        // Find the BEST matching recommendation based on keyword count or first match
        const recMatch = recommendations.find(r => r.keys.some(k => lowerQuery.includes(k)));
        if (recMatch) {
            return { type: 'recommendation', target: recMatch.target, reason: recMatch.reason };
        }

        // 3. Recommendation Intent (Asking for help/suggestions without specific symptoms)
        if (lowerQuery.includes('suggest') || lowerQuery.includes('recommend') || lowerQuery.includes('help me choose') || lowerQuery.includes('what should i get')) {
            return {
                type: 'welcome',
                text: "I'd be happy to help you choose! Are you looking for deep muscle relief, mental relaxation, classic rejuvenation, or something involving soothing heat?",
                options: ['Muscle Pain', 'Stress Relief', 'Just Relax', 'Warmth & Heat']
            };
        }

        // Handle the specific responses from the suggestion buttons
        if (lowerQuery === 'muscle pain') {
            const m = services.find(s => s.name === 'Deep Tissue Massage');
            return { type: 'recommendation', target: m.name, reason: 'target those deeper muscle layers and break down stubborn tension knots.' };
        }
        if (lowerQuery === 'stress relief') {
            const m = services.find(s => s.name === 'Aromatherapy Massage');
            return { type: 'recommendation', target: m.name, reason: 'melt away mental stress and balance your emotions using therapeutic botanical oils.' };
        }
        if (lowerQuery === 'just relax') {
            const m = services.find(s => s.name === 'Swedish Massage');
            return { type: 'specific_massage', data: m };
        }
        if (lowerQuery === 'warmth & heat') {
            const m = services.find(s => s.name === 'Hot Stone Massage');
            return { type: 'recommendation', target: m.name, reason: 'provide deep volcanic warmth that penetrates deep into your muscles to restore flow.' };
        }

        // 4. Category Routes (General inquiries)
        if (lowerQuery.includes('menu') || (lowerQuery.includes('service') && !lowerQuery.includes('detail')) || (lowerQuery.includes('massage') && (lowerQuery.includes('all') || lowerQuery.includes('list')))) {
            return { type: 'services_list', data: services };
        }

        if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('location') || lowerQuery.includes('address') || lowerQuery.includes('find') || lowerQuery.includes('where')) {
            return { type: 'contact_info', data: contacts, social: Data.SocialData || [] };
        }

        if (lowerQuery.includes('hour') || lowerQuery.includes('time') || lowerQuery.includes('open') || lowerQuery.includes('when') || lowerQuery.includes('schedule') || lowerQuery.includes('day')) {
            return { type: 'hours_info', data: hours };
        }

        if (lowerQuery.includes('book') || lowerQuery.includes('appointment') || lowerQuery.includes('reserve') || lowerQuery.includes('slot')) {
            return { type: 'booking_info' };
        }

        if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey') || lowerQuery.includes('greeting')) {
            return { type: 'text', text: "Hello! I'm here to help you discover the perfect wellness experience at Sereniva. Would you like to see our massage menu, or should I suggest a treatment for you?" };
        }

        if (lowerQuery.includes('thank') || lowerQuery.includes('thanks') || lowerQuery.includes('awesome') || lowerQuery.includes('great')) {
            return { type: 'text', text: "You're very welcome! Let me know if you need anything else to help your relaxation journey. ✨" };
        }

        // Catch-all (Out of context)
        return {
            type: 'welcome',
            title: "Out of Context",
            text: "I'm designed to help with Sereniva Spa services, bookings, and wellness advice. I'm afraid your request is beyond my current scope. For more specific inquiries, please refer to our contact information!",
            options: ['Contact Info', 'Massage Menu', 'Booking']
        };
    };

    const handleSendMessage = (text = inputValue) => {
        if (!text.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const userMsg = {
            id: `u-${Date.now()}`,
            type: 'user',
            text: text,
            time: timestamp
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botResp = getBotResponse(text);
            const botMsg = {
                id: `b-${Date.now()}`,
                type: 'bot',
                content: botResp,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setIsTyping(false);
            setMessages(prev => [...prev, botMsg]);
        }, 1200);
    };

    const renderBotMessage = (content) => {
        if (!content) return <p>Thinking...</p>;

        const IconWrapper = ({ icon: Icon, ...props }) => Icon ? <Icon {...props} /> : null;

        switch (content.type) {
            case 'text':
                return <p className="leading-relaxed">{content.text}</p>;

            case 'specific_massage':
                const sm = content.data;
                return (
                    <div className="space-y-4 w-full">
                        <div className="relative h-28 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <img src={sm.image} alt={sm.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                                <p className="text-white font-bold text-sm">{sm.name}</p>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">{sm.detailPageHeading}</p>
                        <p className="text-[12px] text-gray-600 italic leading-snug">"{sm.cardDescription}"</p>

                        <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10">
                            <div className="space-y-2">
                                {(sm.benefits || []).slice(0, 3).map((b, i) => (
                                    <div key={i} className="flex items-start gap-2 text-[11px] text-gray-700">
                                        <CheckCircle size={14} weight="fill" className="text-primary mt-0.5 shrink-0" />
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-primary">${sm.price}</span>
                                <span className="text-[10px] text-gray-400">/ {sm.duration}</span>
                            </div>
                            <button
                                onClick={() => window.location.href = `/services/${sm.id || sm.name.toLowerCase().replace(/ /g, '-')}`}
                                className="flex items-center gap-1 text-[11px] font-bold text-primary hover:translate-x-1"
                            >
                                Book <ArrowRight size={14} weight="bold" />
                            </button>
                        </div>
                    </div>
                );

            case 'services_list':
                return (
                    <div className="space-y-3 w-full">
                        <p className="font-semibold text-primary text-sm border-b border-primary/10 pb-1">Treatment Menu:</p>
                        <div className="space-y-2">
                            {content.data.map((s, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSendMessage(`Tell me about ${s.name}`)}
                                    className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 cursor-pointer shadow-sm active:scale-[0.98] group hover:border-primary/50 hover:bg-white"
                                >
                                    <div>
                                        <p className="font-bold text-gray-800 text-[12px] group-hover:text-primary">{s.name}</p>
                                        <p className="text-[10px] text-gray-500 font-medium">{s.duration}</p>
                                    </div>
                                    <span className="font-bold text-primary text-[12px]">${s.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'recommendation':
                return (
                    <div className="space-y-3">
                        <p className="text-[13px] leading-relaxed">Based on your needs, I suggest the <strong>{content.target}</strong> to {content.reason}</p>
                        <button
                            onClick={() => handleSendMessage(`Tell me about ${content.target}`)}
                            className="w-full py-2.5 bg-primary text-white text-[11px] font-semibold rounded-lg shadow-md active:scale-[0.98] hover:bg-primary/90"
                        >
                            View {content.target} Details
                        </button>
                    </div>
                );

            case 'contact_info':
                return (
                    <div className="space-y-3 w-full">
                        <p className="font-semibold text-primary text-sm pb-1 border-b border-primary/10">Contact Details</p>
                        <div className="space-y-2">
                            {content.data.map((c, i) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100">
                                    <div className="p-2 bg-white rounded-md shadow-sm border border-gray-100">
                                        <IconWrapper icon={c.icon} size={14} className="text-primary" weight="fill" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{c.label}</p>
                                        <p className="text-[12px] font-bold text-gray-700 leading-none mt-0.5">{c.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 pt-2 justify-center border-t border-gray-50">
                            {content.social.map((s, i) => (
                                <a key={i} href={s.to} target="_blank" rel="noreferrer" className="size-9 rounded-lg bg-gray-50 flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white">
                                    <IconWrapper icon={s.icon} size={18} weight="bold" />
                                </a>
                            ))}
                        </div>
                    </div>
                );

            case 'hours_info':
                return (
                    <div className="space-y-3 w-full">
                        <p className="font-semibold text-primary text-sm flex items-center gap-2 pb-1 border-b border-primary/10">
                            <Clock size={18} weight="bold" /> Operational Hours:
                        </p>
                        <div className="space-y-2">
                            {content.data.map((w, i) => (
                                <div key={i} className="flex justify-between text-[11px] py-1.5 border-b border-gray-50 last:border-0 px-1">
                                    <span className="text-gray-500 font-medium">{w.day}</span>
                                    <span className="font-bold text-gray-800">{w.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'booking_info':
                return (
                    <div className="space-y-3">
                        <p className="font-semibold text-primary text-sm">Secure Your Appointment</p>
                        <p className="text-[12px] text-gray-600 leading-relaxed">Ready to begin your journey to relaxation? Our online booking system is available 24/7.</p>
                        <button
                            onClick={() => window.location.href = '/services#appointment'}
                            className="w-full py-3 bg-primary text-white text-[11px] font-semibold rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 hover:bg-primary/90"
                        >
                            <Calendar size={18} weight="bold" /> Schedule Appointment
                        </button>
                    </div>
                );

            case 'welcome':
            default:
                return (
                    <div className="space-y-3 w-full">
                        {content.title && <p className="font-bold text-primary text-sm">{content.title}</p>}
                        <p className="text-[13px] leading-relaxed">{content.text}</p>
                        {content.options && (
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                {content.options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleSendMessage(`Tell me about ${opt}`)}
                                        className="px-2 py-2.5 bg-gray-50 hover:bg-primary/10 hover:border-primary/30 text-[10px] font-bold text-gray-700 rounded-lg border border-gray-100 active:scale-95 shadow-sm"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Chat Window */}
            <div className={clsx(
                "absolute bottom-0 right-0 w-[calc(100vw-32px)] sm:w-[400px] h-[80vh] max-h-[640px] bg-white flex flex-col rounded-2xl shadow-[0_32px_40px_-16px_rgba(0,0,0,0.15)] duration-500 origin-bottom-right border border-gray-100 overflow-hidden",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-12 pointer-events-none"
            )}>
                {/* Minimalist Header */}
                <div className="bg-white/80 backdrop-blur-xl px-6 py-5 flex items-center justify-between shrink-0 border-b border-gray-50 z-20">
                    <div className="flex items-center gap-3.5">
                        <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/5">
                            <Robot size={28} weight="duotone" className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base tracking-tight text-gray-900">Sereniva Assistant</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Always Online</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="size-9 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all active:scale-90">
                        <X size={18} weight="bold" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA] custom-scrollbar scroll-smooth">
                    {messages.map((msg) => (
                        <div key={msg.id} className={clsx(
                            "flex flex-col max-w-[88%] animate-fade-in-down",
                            msg.type === 'user' ? "ml-auto items-end" : "items-start"
                        )}>
                            <div className={clsx(
                                "px-4 py-3 rounded-2xl text-[13px] lg:text-sm font-medium leading-relaxed tracking-tight",
                                msg.type === 'user'
                                    ? "bg-primary text-white shadow-lg shadow-primary/10 rounded-tr-none"
                                    : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none"
                            )}>
                                {msg.type === 'bot' ? renderBotMessage(msg.content) : msg.text}
                            </div>
                            <span className="text-[9px] text-gray-300 mt-2 px-2 font-bold uppercase tracking-[0.1em]">{msg.time}</span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex flex-col items-start max-w-[85%]">
                            <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1.5 items-center">
                                <span className="size-1.5 bg-primary/30 rounded-full animate-bounce" />
                                <span className="size-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="size-1.5 bg-primary/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-2" />
                </div>

                <div className="bg-white px-6 py-5 shrink-0 border-t border-gray-50">
                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Message Sereniva..."
                                className="w-full bg-gray-50/50 border border-transparent rounded-xl px-5 py-4 text-sm focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none placeholder:text-gray-400 font-medium duration-300"
                            />
                        </div>
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim()}
                            className="size-13 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-30 disabled:grayscale duration-300 hover:shadow-primary/30"
                            style={{ width: '48px', height: '48px' }}
                        >
                            <PaperPlaneRight size={20} weight="bold" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button (FAB) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "rounded-xl bg-primary flex items-center justify-center text-white shadow-xl duration-300 hover:scale-110 active:scale-95 relative z-[10000]",
                    isOpen ? "rotate-90 opacity-0 pointer-events-none" : "rotate-0 opacity-100"
                )}
                style={{ width: '64px', height: '64px' }}
            >
                <div className="relative">
                    <ChatCircleDots size={34} weight="fill" />
                    <span className="absolute -top-1 -right-1 flex size-4">
                        <span className="animate-ping absolute inline-flex size-full rounded-full bg-white opacity-40" />
                        <span className="relative inline-flex rounded-full size-4 bg-white text-[10px] text-primary font-black items-center justify-center shadow-sm">1</span>
                    </span>
                </div>
            </button>
        </div>
    );
};

export default Chatbot;

