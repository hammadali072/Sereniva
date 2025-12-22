import { useState, useRef } from 'react';
import { blogPosts as initialBlogs } from '../../data/admin-data';
import {
    Plus, Trash, PencilSimple, Image as ImageIcon,
    TextHOne, TextH, TextT, ListBullets,
    ListDashes, X, FileText
} from 'phosphor-react';
import clsx from 'clsx';
import ThemeButton from '../../components/themeButton/themeButton';
import TitleComponent from '../../components/titleComponent/titleComponent';
import { useToast } from '../../context/toast-context';

const ContentManager = () => {
    const { showToast } = useToast();
    const [blogs, setBlogs] = useState(initialBlogs);
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef(null);

    // Initial State for Form
    const initialFormState = {
        title: '',
        description: '',
        image: '',
        altText: '',
        contentBlocks: []
    };

    const [formData, setFormData] = useState(initialFormState);

    // Block Types Configuration
    const blockTypes = [
        { type: 'h1', icon: TextHOne, label: 'H1 Heading' },
        { type: 'h2', icon: TextH, label: 'H2 (Subheading)' },
        { type: 'h3', icon: TextH, label: 'H3 (Small Heading)' },
        { type: 'p', icon: TextT, label: 'Paragraph' },
        { type: 'list', icon: ListBullets, label: 'Bullet List' },
        { type: 'descList', icon: ListDashes, label: 'Description List' },
        { type: 'image', icon: ImageIcon, label: 'Content Image' },
    ];

    // Helper: Scroll to top
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Helper: Image Upload
    const handleImageUpload = (e, field, blockId = null) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (blockId) {
                    // Update content block image
                    setFormData(prev => ({
                        ...prev,
                        contentBlocks: prev.contentBlocks.map(b =>
                            b.id === blockId ? { ...b, value: result } : b
                        )
                    }));
                } else {
                    // Update main image
                    setFormData(prev => ({ ...prev, [field]: result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Action: Add Block
    const addBlock = (type) => {
        const newBlock = {
            id: Date.now(),
            type,
            value: '',
            alt: '' // for images
        };
        setFormData(prev => ({
            ...prev,
            contentBlocks: [...prev.contentBlocks, newBlock]
        }));
    };

    // Action: Remove Block
    const removeBlock = (id) => {
        setFormData(prev => ({
            ...prev,
            contentBlocks: prev.contentBlocks.filter(b => b.id !== id)
        }));
    };

    // Action: Update Block Value
    const updateBlock = (id, value, field = 'value') => {
        setFormData(prev => ({
            ...prev,
            contentBlocks: prev.contentBlocks.map(b =>
                b.id === id ? { ...b, [field]: value } : b
            )
        }));
    };

    // Action: Save Blog
    const handleSave = () => {
        if (!formData.title || !formData.description) {
            showToast("Title and Description are required", "error");
            return;
        }

        if (isEditing) {
            setBlogs(prev => prev.map(b => b.id === formData.id ? { ...formData, id: b.id } : b));
            showToast("Blog post updated successfully", "success");
        } else {
            const newBlog = {
                ...formData,
                id: Date.now(),
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                status: 'Draft',
                views: 0
            };
            setBlogs(prev => [newBlog, ...prev]);
            showToast("New blog post created", "success");
        }

        // Reset
        setFormData(initialFormState);
        setIsEditing(false);
    };

    // Action: Edit Blog
    const handleEdit = (blog) => {
        setFormData({
            ...blog,
            contentBlocks: blog.contentBlocks || [] // Ensure array exists
        });
        setIsEditing(true);
        scrollToForm();
    };

    // Action: Delete Blog
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this blog post?")) {
            setBlogs(prev => prev.filter(b => b.id !== id));
            showToast("Blog post deleted", "error");
        }
    };

    return (
        <div className="space-y-12 animate-fade-in-down pb-20">
            {/* Header */}
            <div>
                <TitleComponent type="h2">Manage Blogs</TitleComponent>
                <p className="text-gray-500 mt-1">Create rich content for your audience</p>
            </div>

            {/* Dynamic Blog Editor Form */}
            <div ref={formRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        {isEditing ? <PencilSimple size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                        {isEditing ? 'Edit Blog Post' : 'Create New Post'}
                    </h3>
                    {isEditing && (
                        <button
                            onClick={() => { setIsEditing(false); setFormData(initialFormState); }}
                            className="text-gray-500 hover:text-red-500 text-sm font-medium"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar: Main Image */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Featured Image</label>

                            <label className="block w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primaryLight/10 transition-colors cursor-pointer overflow-hidden relative group">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon size={32} className="mb-2" />
                                        <span className="text-xs font-semibold">Click to upload image</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} />

                                {formData.image && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-bold">Change Image</span>
                                    </div>
                                )}
                            </label>

                            {formData.image && (
                                <button
                                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                                >
                                    <Trash size={12} /> Remove Image
                                </button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Image Alt Text</label>
                            <input
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                                placeholder="Describe the image..."
                                value={formData.altText}
                                onChange={e => setFormData({ ...formData, altText: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Title & Description */}
                        <div className="space-y-4">
                            <div>
                                <input
                                    className="w-full p-0 text-3xl font-Merriwheather font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0"
                                    placeholder="Enter Blog Title..."
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <textarea
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none h-24 font-sans leading-relaxed"
                                    placeholder="Write a short description or summary..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Blocks Builder */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">Content Builder</label>

                            {/* Toolbar */}
                            <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-lg">
                                {blockTypes.map(b => (
                                    <button
                                        key={b.type}
                                        onClick={() => addBlock(b.type)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded shadow-sm hover:text-primary hover:shadow-md transition-all border border-gray-200"
                                        title={`Add ${b.label}`}
                                    >
                                        <b.icon size={16} weight="bold" /> {b.label}
                                    </button>
                                ))}
                            </div>

                            {/* Blocks List */}
                            <div className="space-y-3 min-h-[100px]">
                                {formData.contentBlocks.length === 0 && (
                                    <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                        <p className="text-sm">Click the buttons above to add content blocks</p>
                                    </div>
                                )}

                                {formData.contentBlocks.map((block, index) => (
                                    <div key={block.id} className="group relative p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition-colors shadow-sm">
                                        <div className="absolute -left-3 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => removeBlock(block.id)} className="p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 shadow-sm" title="Remove Block">
                                                <X size={12} weight="bold" />
                                            </button>
                                        </div>

                                        {/* Block Inputs based on Type */}
                                        {block.type.startsWith('h') && (
                                            <input
                                                className={clsx(
                                                    "w-full border-none p-0 focus:ring-0 font-Merriwheather placeholder-gray-300",
                                                    block.type === 'h1' ? "text-2xl font-bold" :
                                                        block.type === 'h2' ? "text-xl font-bold" : "text-lg font-bold"
                                                )}
                                                placeholder={`Heading ${block.type.toUpperCase()}`}
                                                value={block.value}
                                                onChange={e => updateBlock(block.id, e.target.value)}
                                            />
                                        )}

                                        {block.type === 'p' && (
                                            <textarea
                                                className="w-full border-none p-0 focus:ring-0 text-base text-gray-600 leading-relaxed resize-none h-auto overflow-hidden bg-transparent placeholder-gray-300"
                                                placeholder="Type your paragraph here..."
                                                value={block.value}
                                                onChange={e => updateBlock(block.id, e.target.value)}
                                                rows={3}
                                            />
                                        )}

                                        {block.type.includes('list') && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">{block.label}</p>
                                                <textarea
                                                    className="w-full bg-gray-50 p-3 rounded-lg text-sm border-none focus:ring-1 focus:ring-primary h-24"
                                                    placeholder="Enter each list item on a new line..."
                                                    value={block.value}
                                                    onChange={e => updateBlock(block.id, e.target.value)}
                                                />
                                            </div>
                                        )}

                                        {block.type === 'image' && (
                                            <div className="flex gap-4 items-start">
                                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
                                                    {block.value ? (
                                                        <img src={block.value} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        type="file"
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primaryLight file:text-primary hover:file:bg-primaryLight/80"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, null, block.id)}
                                                    />
                                                    <input
                                                        className="w-full p-2 text-sm border border-gray-200 rounded"
                                                        placeholder="Image caption / alt text..."
                                                        value={block.alt}
                                                        onChange={e => updateBlock(block.id, e.target.value, 'alt')}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <ThemeButton variant="primary" onClick={handleSave} className="!px-8">
                                {isEditing ? 'Update Post' : 'Publish Post'}
                            </ThemeButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Existing Blogs Grid */}
            <div className="space-y-6">
                <TitleComponent type="h3">Published Posts</TitleComponent>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 border border-gray-100/50">

                            {/* Image Container */}
                            <div className="aspect-[4/3] relative overflow-hidden">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                        <FileText size={48} weight="duotone" />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={clsx(
                                        "px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-lg border border-white/20 uppercase tracking-widest",
                                        blog.status === 'Published'
                                            ? "bg-emerald-500/90 text-white"
                                            : "bg-white/90 text-gray-600"
                                    )}>
                                        {blog.status}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Floating Edit Button (visible on hover) */}
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 z-10"
                                    title="Edit Post"
                                >
                                    <PencilSimple size={20} weight="bold" />
                                </button>

                                <div className="space-y-4">
                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-4">
                                        <div className="flex items-center gap-2">
                                            <span>{blog.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-300">Video</span>
                                            <span>{blog.views || 0} Reads</span>
                                        </div>
                                    </div>

                                    {/* Title & Desc */}
                                    <div>
                                        <h3 className="text-xl font-bold font-Merriwheather text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-sans">
                                            {blog.description}
                                        </p>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="pt-2 flex items-center justify-between">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="text-sm font-bold text-gray-400 group-hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            Read More <span>&rarr;</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-2 -mr-2"
                                            title="Delete Post"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
