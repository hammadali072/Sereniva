import { Lock } from 'phosphor-react';
import ThemeButton from '../themeButton/themeButton';

const SecurityTab = ({ data, setData, onSubmit }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-12 animate-fade-in">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8">Security Settings</h2>
        <div>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">New Password</label>
                        <input type="password" value={data.newPassword} onChange={e => setData({ ...data, newPassword: e.target.value })} className="w-full sm:p-4 p-3 bg-gray-50 border border-gray-200 rounded-xl duration-300 focus:bg-white focus:border-primary disabled:opacity-60" required />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Confirm New Password</label>
                        <input type="password" value={data.confirmPassword} onChange={e => setData({ ...data, confirmPassword: e.target.value })} className="w-full sm:p-4 p-3 bg-gray-50 border border-gray-200 rounded-xl duration-300 focus:bg-white focus:border-primary disabled:opacity-60" required />
                    </div>
                </div>
                <ThemeButton type="submit" variant="primary" className="shadow-lg shadow-primary/20 w-full md:w-auto">Update Password</ThemeButton>
            </form>
            <div className="mt-10 p-5 lg:p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4 text-xs text-amber-700/80 leading-relaxed">
                <Lock size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p>Use at least 8 characters with a mix of letters, numbers, and symbols. To maintain security, never share your password with others.</p>
            </div>
        </div>
    </div>
);

export default SecurityTab;
