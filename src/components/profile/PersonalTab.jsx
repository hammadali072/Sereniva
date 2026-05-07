import { User, PencilSimple } from 'phosphor-react';
import ThemeButton from '../themeButton/themeButton';

const PersonalTab = ({ formData, setFormData, isEditing, setIsEditing, onSubmit, onPhotoUpload, user, setSelectedFile }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Profile Details</h2>
            <button
                type="button"
                onClick={() => {
                    if (isEditing) {
                        setFormData({ ...formData, profilePhoto: user.photoURL || "" });
                        setSelectedFile(null);
                    }
                    setIsEditing(!isEditing);
                }}
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-2"
            >
                <PencilSimple size={24} />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-50">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm bg-gray-100">
                        {formData.profilePhoto ? (
                            <img key={formData.profilePhoto} src={formData.profilePhoto} alt="Preview" className="w-full h-full object-cover object-top" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={36} weight="duotone" /></div>
                        )}
                    </div>
                    {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-primaryDark transition-colors">
                            <PencilSimple size={16} weight="bold" />
                            <input type="file" className="hidden" accept="image/*" onChange={onPhotoUpload} />
                        </label>
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <h4 className="text-base font-medium text-gray-900">Profile Photo</h4>
                    <p className="text-xs text-gray-500">{isEditing ? "Max 2MB. Click pencil to update." : "Personalize your appearance."}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'First Name', key: 'firstName', type: 'text' },
                    { label: 'Last Name', key: 'lastName', type: 'text' },
                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                    { label: 'Age', key: 'age', type: 'number' },
                ].map(field => (
                    <div key={field.key} className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{field.label}</label>
                        <input
                            type={field.type}
                            disabled={!isEditing}
                            value={formData[field.key]}
                            onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                            className="w-full sm:p-4 p-3 bg-gray-50 border border-gray-200 rounded-xl duration-300 focus:bg-white focus:border-primary disabled:opacity-60"
                        />
                    </div>
                ))}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Gender</label>
                    <select
                        disabled={!isEditing}
                        value={formData.gender}
                        onChange={e => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full sm:p-4 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary disabled:opacity-60 appearance-none"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                </div>
                <div className="col-span-full space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input type="email" disabled value={formData.email} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-60 cursor-not-allowed" />
                </div>
            </div>
            {isEditing && (
                <div className="pt-4">
                    <ThemeButton type="submit" variant="primary" className="!px-12 !py-4">Update My Account</ThemeButton>
                </div>
            )}
        </form>
    </div>
);

export default PersonalTab;
