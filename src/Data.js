import { MapPin, Envelope, Phone, FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo, Sparkle, Heart, Leaf, Moon } from 'phosphor-react';

import serviceImg1 from './assets/service-img1.webp';
import serviceImg2 from './assets/service-img2.webp';
import serviceImg3 from './assets/service-img3.webp';
import serviceImg4 from './assets/service-img4.webp';
import serviceIcon from './assets/service-icon.webp';

import postImage1 from './assets/post-img1.webp';
import postImage2 from './assets/post-img2.webp';
import postImage3 from './assets/post-img3.webp';

import teamImage1 from './assets/team-img1.webp';
import teamImage2 from './assets/team-img2.webp';
import teamImage3 from './assets/team-img3.webp';

import video1 from './assets/video-1.mp4';
import video2 from './assets/video-2.mp4';
import video3 from './assets/video-3.mp4';
import video4 from './assets/video-4.mp4';
import video5 from './assets/video-5.mp4';
import video6 from './assets/video-6.mp4';
import video7 from './assets/video-7.mp4';

import client1 from './assets/client-1.webp';
import client2 from './assets/client-2.webp';
import client3 from './assets/client-3.webp';
import client4 from './assets/client-4.webp';

import swedishMassage from './assets/swedish-massage.webp';
import deepTissueMassage from './assets/deep-tissue-massage.webp';
import stoneMassage from './assets/stone-massage.webp';

import swedishCollection from './assets/swedish-collection-img.webp';
import tissueCollection from './assets/tissue-collection-img.webp';
import hotStoneCollection from './assets/hot-stone-collection-img.webp';
import aromaTherapyCollection from './assets/aromatherapy-collection-img.webp';

import facialOil from './assets/facial-oil.webp';
import bkindSoup from './assets/bkind-soup.webp';
import bodyLotion from './assets/mokosh-body-lotion.webp';


export const MenuData = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
    { text: 'Services', to: '/services' },
    { text: 'Blog', to: '/blog' },
    { text: 'Contact', to: '/contact' },
];

export const ContactData = [
    {
        icon: Envelope, label: "Email",
        title: "support.sereniva@email.com",
        path: 'mailto:support.sereniva@email.com'
    },
    {
        icon: Phone, label: "Phone",
        title: "+1 234 567890",
        path: "tel:+1234567890"
    },
    { icon: MapPin, label: "Address", title: "1867 Fire Access, USA", path: '/' },
];

export const SocialData = [
    { icon: FacebookLogo, to: 'https://www.facebook.com/' },
    { icon: TwitterLogo, to: 'https://www.x.com/' },
    { icon: YoutubeLogo, to: 'https://www.youtube.com/' },
    { icon: InstagramLogo, to: 'https://www.instagram.com/' },
];

export const WorkingHours = [
    { day: 'Monday to Friday', time: '9AM - 6PM' },
    { day: 'Saturday', time: '9AM - 6PM' },
    { day: 'Sunday', time: '9AM - 5PM' },
];

export const ServiceData = [
    { image: serviceImg1, icon: serviceIcon, heading: 'Massage Therapy' },
    { image: serviceImg2, icon: serviceIcon, heading: 'Body Treatment' },
    { image: serviceImg3, icon: serviceIcon, heading: 'Waxing Care' },
    { image: serviceImg4, icon: serviceIcon, heading: 'Facial Care' },
];

export const ProcedureData = [
    {
        image: swedishCollection,
        heading: 'The Sereniva Signature',
        category: 'Signature Journey',
        duration: '120 Mins',
        description: 'Our ultimate wellness experience combining a custom full-body massage, an enzymatic radiance facial, and a tension-melting scalp ritual for total transformation.'
    },
    {
        image: tissueCollection,
        heading: 'Oceanic Revive Journey',
        category: 'Revitalization',
        duration: '90 Mins',
        description: 'A marine-inspired ritual featuring a mineral-rich sea salt exfoliation followed by a detoxifying seaweed body wrap and a targeted hydrotherapy session.'
    },
    {
        image: hotStoneCollection,
        heading: 'Mindful Sound Escape',
        category: 'Mind & Spirit',
        duration: '105 Mins',
        description: 'A deep sensory journey utilizing therapeutic sound bath vibrations, heated hot stone therapy, and bespoke aromatherapy to quiet the mind.'
    },
    {
        image: aromaTherapyCollection,
        heading: 'Luminous Glow Ritual',
        category: 'Advanced Facial',
        duration: '75 Mins',
        description: 'Achieve a red-carpet radiance with our multi-step facial that integrates HydraFacial technology, concentrated oxygen infusion, and rejuvenating LED light therapy.'
    },
    {
        image: postImage1,
        heading: 'Vitality Energy Reset',
        category: 'Detoxification',
        duration: '90 Mins',
        description: 'A powerful detoxifying treatment that pairs manual lymphatic drainage with a warming ginger body mask to stimulate circulation and boost vitality.'
    },
    {
        image: postImage2,
        heading: 'Deep Sleep Sanctuary',
        category: 'Sleep Wellness',
        duration: '60 Mins',
        description: 'Designed for those seeking profound rest, this ritual features magnesium-infused massage techniques and a weighted aromatherapy eye treatment for deep relaxation.'
    },
];

export const BlogData = [
    {
        id: "post_1",
        author: "Admin",
        date: "Jan 29, 2025",
        image: postImage1,
        title: 'Ultimate Guide to Professional Facial Treatments',
        description: 'Discover the transformative power of professional facial treatments for glowing skin. Expert aestheticians use premium products to restore natural radiance.',
        contentBlocks: [
            { id: 101, type: 'h2', value: 'Why Professional Facials Matter' },
            { id: 102, type: 'p', value: 'Whil e at-home skincare routines are essential, professional facial treatments offer a deeper level of care that can significantly improve your skin health. Our expert aestheticians analyze your skin type and concerns to tailor a treatment that targets your specific needs.' },
            { id: 103, type: 'h3', value: 'Key Benefits' },
            {
                id: 104, type: 'list', value: [
                    'Deep cleansing and exfoliation',
                    'Improved circulation and lymphatic drainage',
                    'Targeted treatment for acne, aging, or sensitivity',
                    'Stress relief and relaxation'
                ]
            },
            { id: 105, type: 'p', value: 'Regular facials can help maintain a youthful glow and prevent future skin issues. We recommend a professional treatment every 4-6 weeks for optimal results.' },
            { id: 106, type: 'image', value: postImage1, alt: 'Woman receiving a relaxing facial treatment' },
            { id: 107, type: 'h3', value: 'Our Signature Treatments' },
            {
                id: 108, type: 'descList', value: [
                    { term: 'Hydra-Glow Facial', details: 'A multi-step treatment that cleanses, exfoliates, and hydrates using advanced vortex technology.' },
                    { term: 'Anti-Aging Gold Mask', details: 'Infused with 24k gold to firm, lift, and brighten the complexion.' },
                    { term: 'Purifying Detox', details: 'Ideal for congested skin, utilizing clay masks and blue LED light therapy.' }
                ]
            }
        ]
    },
    {
        id: "post_2",
        author: "Admin",
        date: "Feb 06, 2025",
        image: postImage2,
        title: 'How Regular Massage Therapy Transforms Health',
        description: 'Experience incredible health benefits beyond simple relaxation and stress relief. Improved circulation enhances your overall wellness.',
        contentBlocks: [
            { id: 201, type: 'h2', value: 'More Than Just Relaxation' },
            { id: 202, type: 'p', value: 'Massage therapy is often viewed as a luxury, but it is a powerful tool for maintaining physical and mental health. Beyond significant stress reduction, regular massage can boost your immune system, improve posture, and enhance athletic performance.' },
            { id: 203, type: 'image', value: postImage2, alt: 'Deep tissue massage therapy session' },
            { id: 204, type: 'h3', value: 'Physiological Impacts' },
            {
                id: 205, type: 'list', value: [
                    'Lowers cortisol levels (stress hormone)',
                    'Increases serotonin and dopamine (mood boosters)',
                    'Reduces muscle tension and pain',
                    'Improves joint mobility and flexibility'
                ]
            },
            { id: 206, type: 'p', value: 'Studies have shown that even a single session can lower heart rate and blood pressure. Committing to a regular schedule amplifies these benefits, leading to long-term health improvements.' }
        ]
    },
    {
        id: "post_3",
        author: "Admin",
        date: "Mar 15, 2025",
        image: postImage3,
        title: 'Essential Oils Transform Your Spa Experience',
        description: 'Unlock therapeutic benefits of essential oils during spa experience today. Different scents reduce anxiety while promoting deep relaxation.',
        contentBlocks: [
            { id: 301, type: 'h2', value: 'The Power of Aromatherapy' },
            { id: 302, type: 'p', value: 'Aromatherapy uses natural plant extracts to promote health and well-being. When combined with spa treatments, essential oils can enhance the therapeutic effects, influencing mood and cognitive function.' },
            { id: 303, type: 'h3', value: 'Popular Essential Oils & Benefits' },
            {
                id: 304, type: 'descList', value: [
                    { term: 'Lavender', details: 'Promotes relaxation and helps treat anxiety, fungal infections, and insomnia.' },
                    { term: 'Peppermint', details: 'Boosts energy and aids digestion. Known for cooling and refreshing properties.' },
                    { term: 'Eucalyptus', details: 'Supports respiratory health and soothes muscle pain.' },
                    { term: 'Tea Tree', details: 'Known for its powerful antiseptic and anti-inflammatory properties.' }
                ]
            },
            { id: 305, type: 'image', value: postImage3, alt: 'Collection of essential oils and spa stones' },
            { id: 306, type: 'p', value: 'At Sereniva, we allow you to customize your treatment with a blend of oils that resonates with your current needs, creating a truly personalized sensory journey.' }
        ]
    },
    {
        id: "post_4",
        author: "Admin",
        date: "Apr 02, 2025",
        image: postImage1,
        title: 'Essential Wellness Practices for Daily Care',
        description: 'Transform daily routine with simple wellness practices promoting peace. Mindful breathing techniques create spa-like atmosphere at home.',
        contentBlocks: [
            { id: 401, type: 'h2', value: 'Bringing the Spa Home' },
            { id: 402, type: 'p', value: 'Wellness isnt just something you visit; its a lifestyle. Integrating small moments of self-care into your daily routine can have a profound impact on your overall happiness and stress levels.' },
            { id: 403, type: 'h3', value: 'Morning Rituals' },
            {
                id: 404, type: 'list', value: [
                    'Start with a glass of warm lemon water',
                    'Practice 5 minutes of deep breathing or meditation',
                    'Stretch gently to wake up the body',
                    'Apply a hydrating serum with mindful application'
                ]
            },
            { id: 405, type: 'p', value: 'Consistency is key. Even five minutes dedicated to yourself can reset your nervous system and prepare you for the day ahead.' }
        ]
    },
    {
        id: "post_5",
        author: "Admin",
        date: "Jan 29, 2025",
        image: postImage2,
        title: 'Complete Body Detox Purifying Treatments',
        description: 'Experience rejuvenating effects of professional body treatments today. Exfoliating scrubs and wraps remove toxins while improving skin texture.',
        contentBlocks: [
            { id: 501, type: 'h2', value: 'Why Detoxify?' },
            { id: 502, type: 'p', value: 'Our bodies are constantly exposed to environmental pollutants. A professional detox treatment helps to draw out impurities, unclog pores, and stimulate the lymphatic system.' },
            {
                id: 503, type: 'descList', value: [
                    { term: 'Body Scrub', details: 'Removes dead skin cells and stimulates circulation.' },
                    { term: 'Clay Wrap', details: 'Draws out toxins and impurities from deep within the skin.' },
                    { term: 'Lymphatic Message', details: 'Encourages the natural drainage of the lymph, which carries waste products away from the tissues.' }
                ]
            },
            { id: 504, type: 'p', value: 'You will leave feeling lighter, energized, and with skin that feels incredibly soft and revitalized.' }
        ]
    },
];

export const TeamData = [
    {
        image: teamImage1,
        heading: 'Olivia Austin',
        text: 'Swedish Massage',
        icons: [
            { icon: FacebookLogo, to: 'https://www.facebook.com/' },
            { icon: TwitterLogo, to: 'https://www.x.com/' },
            { icon: InstagramLogo, to: 'https://www.instagram.com/' },
        ]
    },
    {
        image: teamImage2,
        heading: 'Amelia Hannan',
        text: 'Hot Stone Massage',
        icons: [
            { icon: FacebookLogo, to: 'https://www.facebook.com/' },
            { icon: TwitterLogo, to: 'https://www.x.com/' },
            { icon: InstagramLogo, to: 'https://www.instagram.com/' },
            { icon: LinkedinLogo, to: 'https://www.linkedin.com/' },
        ]
    },
    {
        image: teamImage3,
        heading: 'Kate Harris',
        text: 'Thai Massage',
        icons: [
            { icon: FacebookLogo, to: 'https://www.facebook.com/' },
            { icon: TwitterLogo, to: 'https://www.x.com/' },
            { icon: InstagramLogo, to: 'https://www.instagram.com/' },
            { icon: LinkedinLogo, to: 'https://www.linkedin.com/' },
        ]
    },
];

export const TestimonialData = [
    {
        name: "Linia Korie",
        img: client1,
        designation: "Executive",
        desc: "First i beast be fruitful open you tree all Won't can't likeness and you're have whales creature seed to two grass life blessed you meat shall you winged under from their there he That you're one called gather make much red wherein set fourth green bearing fifth replenish given she had."
    },
    {
        name: "Devid Bell",
        img: client2,
        designation: "Writer",
        desc: "First i calm be stillness ease you body all Won't can't tension and you're have oils warmth peace to two breath flow soft blessed you light shall you quiet hands under from their there he That you're one called comfort make much rest wherein set fourth glow care fifth welcome given she had."
    },
    {
        name: "Horray Coreal",
        img: client3,
        designation: "Co-Executive",
        desc: "First i peace be gentle heal you soul all Won't can't hurry and you're have warmth calm oils to two scents deep soft blessed you rest shall you quiet touch under from their there he That you're one called unwind make much slow wherein set fourth hush breathe fifth soften given she had."
    },
    {
        name: "Linia Korie",
        img: client4,
        designation: "Executive",
        desc: "First i beast be fruitful open you tree all Won't can't likeness and you're have whales creature seed to two grass life blessed you meat shall you winged under from their there he That you're one called gather make much red wherein set fourth green bearing fifth replenish given she had."
    },
];

export const SkincareData = [video1, video3, video4, video5, video6, video7, video1, video6];

export const SkinProductsData = [
    {
        img: swedishMassage,
        heading: 'Swedish Massage',
        desc: 'Gentle strokes to melt away stress and tension.',
    },
    {
        img: deepTissueMassage,
        heading: 'Deep Tissue Massage',
        desc: 'Relieves chronic pain and muscle tension.',
    },
    {
        img: stoneMassage,
        heading: 'Hot Stone Massage',
        desc: 'Heated stones to release tension and restore deep balance.',
    },
    {
        img: swedishMassage,
        heading: 'Swedish Massage',
        desc: 'Gentle strokes to melt away stress and tension.',
    },
    {
        img: deepTissueMassage,
        heading: 'Deep Tissue Massage',
        desc: 'Relieves chronic pain and muscle tension.',
    },
    {
        img: stoneMassage,
        heading: 'Hot Stone Massage',
        desc: 'Heated stones to release tension and restore deep balance.',
    },
];

export const BenefitData = [
    {
        icon: Sparkle,
        heading: 'Holistic Wellness',
        desc: 'Deeply restorative rituals designed to harmonize mind, body, and spirit.',
        color: 'emerald'
    },
    {
        icon: Heart,
        heading: 'Expert Therapists',
        desc: 'Our certified practitioners bring years of specialized mastery to every touch.',
        color: 'amber'
    },
    {
        icon: Leaf,
        heading: 'Pure Botanicals',
        desc: 'We use only organic, sustainably sourced extracts for natural radiance.',
        color: 'emerald'
    },
    {
        icon: Moon,
        heading: 'Serene Sanctuary',
        desc: 'Escape to a world of absolute silence, designed for your ultimate peace.',
        color: 'amber'
    },
];

export const CollectionData = [
    {
        img: swedishCollection,
        heading: 'Swedish',
        color: 'bg-lightBlue2',
    },
    {
        img: tissueCollection,
        heading: 'Deep Tissue',
        color: 'bg-lightPink20',
    },
    {
        img: hotStoneCollection,
        heading: 'Hot Stone',
        color: 'bg-lightBlue3',
    },
    {
        img: aromaTherapyCollection,
        heading: 'Aromatherapy',
        color: 'bg-lightPink30',
    }
];

export const ArrivalData = [
    {
        img: facialOil,
        heading: 'Facial Oil',
        desc: 'New from Mokosh - body lotion'
    },
    {
        img: bkindSoup,
        heading: 'BKIND Soup',
        desc: 'Low-maintenance, high-performance'
    },
    {
        img: bodyLotion,
        heading: 'Mokosh body lotion',
        desc: 'Cushiony, smooth, pout-perfecting lip oil.'
    },
];

export const MassageServicesData = [
    {
        name: "Aromatherapy Massage",
        category: "Massage",
        price: "125",
        duration: "60 min",
        detailPageHeading: "A Multisensory Journey to Perfect Mental and Physical Harmony",
        cardDescription: "Restore your senses with a blend of pure essential oils and gentle therapeutic touch.",
        fullDescription: "Immerse yourself in a world of sensory bliss. Our Aromatherapy Massage combines the healing power of essential oils with professional massage techniques to address your unique needs. Whether you seek stress relief, energy restoration, or emotional balance, our therapists curate a custom blend of high-grade botanical extracts to transport you to total tranquility.",
        benefits: ["Reduces stress and anxiety", "Balances hormone levels", "Improved mental clarity", "Enhanced emotional well-being"],
        included: ["Custom essential oil consultation", "Dermalogica botanical oils", "Steam ritual", "Post-session herbal infusion"],
        status: "Active",
        featured: true,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
        altText: "Aromatherapy Massage Treatment"
    },
    {
        name: "Deep Tissue Massage",
        category: "Massage",
        price: "145",
        duration: "60 min",
        detailPageHeading: "Recover and Rebuild with Intensive Muscle Alignment",
        cardDescription: "Focused pressure on deep muscle layers to release chronic tension and alleviate persistent pain.",
        fullDescription: "Our Deep Tissue Massage is designed for those seeking focused, intense relief from chronic muscle tension. Using slow, deliberate strokes and deep finger pressure, we target the deepest layers of muscle tissue, tendons, and fascia. This treatment is ideal for athletes, those with persistent pain, or anyone looking to break down scar tissue and improve overall mobility.",
        benefits: ["Breaks down scar tissue", "Alleviates chronic pain", "Improves posture and mobility", "Enhances athletic performance"],
        included: ["Deep muscle assessment", "Trigger point therapy", "Arnica muscle cooling balm", "Hydration therapy advice"],
        status: "Active",
        featured: true,
        image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800",
        altText: "Deep Tissue Massage Professional"
    },
    {
        name: "Hot Stone Massage",
        category: "Massage",
        price: "165",
        duration: "90 min",
        detailPageHeading: "Melt Away Tension with Therapeutic Volcanic Heat",
        cardDescription: "Deeply relaxing treatment using heated basalt stones to soothe sore muscles and calm the mind.",
        fullDescription: "Experience the ancient healing power of heat. In our Hot Stone Massage, smooth, water-heated volcanic basalt stones are placed on key energy centers of your body and used as extensions of the therapist's hands. The deep penetrating heat allows for deeper muscle manipulation, effectively melting away stubborn tension and inducing a state of deep meditative relaxation.",
        benefits: ["Promotes deep muscle relaxation", "Increases local circulation", "Reduces muscle spasms", "Promotes better sleep"],
        included: ["Hand-selected basalt stones", "Aromatic warming oil", "Energy point balancing", "Premium linen service"],
        status: "Active",
        featured: true,
        image: "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?auto=format&fit=crop&q=80&w=800",
        altText: "Hot Stone Massage Stones"
    },
    {
        name: "Swedish Massage",
        category: "Massage",
        price: "110",
        duration: "60 min",
        detailPageHeading: "The Art of Classic Relaxation and Full Body Wellness",
        cardDescription: "Experience the foundation of massage therapy with long, rhythmic strokes designed to improve circulation.",
        fullDescription: "Indulge in the gold standard of relaxation. Our Swedish Massage uses five primary strokes—effleurage, petrissage, tapotement, friction, and vibration—to provide a luxurious experience that increases oxygen levels in the blood, decreases muscle toxins, and improves overall circulation. It is perfect for first-timers or those looking for a lighter, restorative touch to renew both body and spirit.",
        benefits: ["Reduces physiological stress", "Improves blood circulation", "Increases oxygen in the blood", "Relieves generalized fatigue"],
        included: ["Full body classic massage", "Choice of fragrance-free/infused oils", "Climate-controlled suite", "Signature relaxation tea"],
        status: "Active",
        featured: false,
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
        altText: "Classic Swedish Massage"
    }
];

// --- Centralized Admin & Profile Mock Data ---

export const adminStats = {
    appointments: { total: 154, today: 12, pending: 8, canceled: 5 },
    users: { total: 450, new: 15, active: 410 },
    therapists: { total: 12, active: 10, onLeave: 2 },
    revenue: { total: 45000, month: 5200, week: 1200 },
    messages: { total: 24, unread: 5 }
};

export const appointments = [
    { id: 101, customer: "Alice Green", service: "Swedish Massage", therapist: "Olivia Austin", date: "2025-10-25", time: "10:00 AM", status: "Confirmed", phone: "555-0101", notes: "Prefers firm pressure", price: 80 },
    { id: 102, customer: "Mark Brown", service: "Deep Tissue", therapist: "Amelia Hannan", date: "2025-10-25", time: "11:30 AM", status: "Pending", phone: "555-0102", notes: "First time client", price: 95 },
    { id: 103, customer: "Sophie Turner", service: "Hot Stone", therapist: "Kate Harris", date: "2025-10-26", time: "02:00 PM", status: "Completed", phone: "555-0103", notes: "", price: 120 },
    { id: 104, customer: "James White", service: "Facial Care", therapist: "Olivia Austin", date: "2025-10-26", time: "09:00 AM", status: "Cancelled", phone: "555-0104", notes: "Rescheduled to next week", price: 65 },
    { id: 105, customer: "Emily Clark", service: "Aromatherapy", therapist: "Unassigned", date: "2025-10-27", time: "03:00 PM", status: "Pending", phone: "555-0105", notes: "Allergic to lavender", price: 90 },
    { id: 106, customer: "Michael Scott", service: "Swedish Massage", therapist: "Olivia Austin", date: "2025-10-28", time: "10:00 AM", status: "Confirmed", phone: "555-0106", notes: "", price: 80 },
];

export const services = [
    {
        id: 1,
        name: "Swedish Massage",
        duration: "60 min",
        price: 80,
        category: "Massage",
        status: "Active",
        featured: true,
        description: "A gentle full-body massage that improves circulation and relieves muscle tension.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Deep Tissue Massage",
        duration: "60 min",
        price: 95,
        category: "Massage",
        status: "Active",
        featured: false,
        description: "Targets the deeper layers of muscle and connective tissue.",
        image: "https://images.unsplash.com/photo-1519823551278-64ac927acdbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Hot Stone Massage",
        duration: "90 min",
        price: 120,
        category: "Massage",
        status: "Active",
        featured: true,
        description: "Heated smooth stones are placed on key points on the body.",
        image: "https://images.unsplash.com/photo-1591343395082-e214716b7be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Basic Facial",
        duration: "45 min",
        price: 65,
        category: "Facial",
        status: "Active",
        featured: false,
        description: "Cleansing, exfoliating, and nourishing session for your face.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Aromatherapy",
        duration: "60 min",
        price: 90,
        category: "Massage",
        status: "Inactive",
        featured: false,
        description: "Massage therapy with essential oils (highly concentrated plant oils).",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
];

export const therapists = [
    { id: 1, name: "Olivia Austin", specialty: "Swedish Massage", status: "Active", phone: "555-1001", email: "olivia@sereniva.com", shift: "Morning (9AM - 2PM)" },
    { id: 2, name: "Amelia Hannan", specialty: "Deep Tissue", status: "Active", phone: "555-1002", email: "amelia@sereniva.com", shift: "Afternoon (1PM - 6PM)" },
    { id: 3, name: "Kate Harris", specialty: "Thai Massage", status: "On Leave", phone: "555-1003", email: "kate@sereniva.com", shift: "Morning (9AM - 2PM)" },
];

export const users = [
    { id: 1, name: "Alice Green", email: "alice@example.com", phone: "555-0101", joinDate: "2024-05-12", status: "Active" },
    { id: 2, name: "Mark Brown", email: "mark@example.com", phone: "555-0102", joinDate: "2024-06-20", status: "Active" },
    { id: 3, name: "Sophie Turner", email: "sophie@example.com", phone: "555-0103", joinDate: "2024-08-15", status: "Disabled" },
    { id: 4, name: "James White", email: "james@example.com", phone: "555-0104", joinDate: "2024-09-01", status: "Active" },
    { id: 5, name: "Emily Clark", email: "emily@example.com", phone: "555-0105", joinDate: "2024-09-10", status: "Active" },
];

export const reviews = [
    { id: 1, author: "Alice Green", rating: 5, service: "Swedish Massage", content: "Amazing experience! The ambiance was perfect.", status: "Approved", date: "2025-10-25" },
    { id: 2, author: "Mark Brown", rating: 4, service: "Deep Tissue", content: "Great but a bit painful.", status: "Pending", date: "2025-10-24" },
    { id: 3, author: "John Doe", rating: 1, service: "Facial", content: "Terrible service. Waited 20 mins.", status: "Rejected", date: "2025-10-20" },
    { id: 4, author: "Emily Clark", rating: 5, service: "Aromatherapy", content: "So relaxing, I fell asleep!", status: "Approved", date: "2025-10-22" },
];

export const messages = [
    { id: 1, sender: "John Doe", email: "john@test.com", subject: "Inquiry", message: "Do you offer couples massage packages and what is the pricing?", date: "2025-10-24", read: false },
    { id: 2, sender: "Jane Smith", email: "jane@test.com", subject: "Feedback", message: "Loved my session with Olivia yesterday. She is fantastic!", date: "2025-10-20", read: true },
    { id: 3, sender: "Bob Johnson", email: "bob@test.com", subject: "Cancellation", message: "I need to cancel my appointment for tomorrow appropriately.", date: "2025-10-18", read: true },
    { id: 4, sender: "Sarah Lee", email: "sarah@test.com", subject: "Partnership", message: "We are a local product supplier and would love to partner.", date: "2025-10-15", read: false },
    { id: 5, sender: "Mike Brown", email: "mike@test.com", subject: "Gift Card", message: "How do I purchase a digital gift card?", date: "2025-10-12", read: true },
];

export const blogPosts = [
    { id: 1, title: "Benefits of Massage Therapy", category: "Wellness", status: "Published", date: "2025-09-10", views: 1205 },
    { id: 2, title: "Top 5 Skincare Routines for Winter", category: "Beauty", status: "Draft", date: "2025-10-05", views: 0 },
    { id: 3, title: "Understanding Deep Tissue Massage", category: "Education", status: "Published", date: "2025-08-22", views: 890 },
];

export const serviceReviews = [
    {
        id: 1,
        reviewerName: "Alice Green",
        email: "alice@example.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        service: "Swedish Massage",
        rating: 5,
        reviewText: "Amazing experience! The therapist was incredibly skilled and the ambiance was perfect. I felt completely relaxed and rejuvenated after the session.",
        status: "Approved",
        date: "2025-10-25",
        reply: "Thank you so much for your wonderful feedback, Alice! We're thrilled you enjoyed your experience."
    },
    {
        id: 2,
        reviewerName: "Mark Brown",
        email: "mark@example.com",
        avatar: "https://i.pravatar.cc/150?img=2",
        service: "Deep Tissue Massage",
        rating: 4,
        reviewText: "Great massage, really helped with my back pain. The therapist knew exactly where the tension was. A bit painful at times but that's expected with deep tissue work.",
        status: "Approved",
        date: "2025-10-24",
        reply: null
    },
    {
        id: 3,
        reviewerName: "Sophie Turner",
        email: "sophie@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
        service: "Hot Stone Massage",
        rating: 5,
        reviewText: "Absolutely divine! The heated stones melted away all my stress. Kate was wonderful and very attentive. Highly recommend this service.",
        status: "Approved",
        date: "2025-10-23",
        reply: null
    },
    {
        id: 4,
        reviewerName: "John Anderson",
        email: "john.a@example.com",
        avatar: "https://i.pravatar.cc/150?img=4",
        service: "Basic Facial",
        rating: 2,
        reviewText: "The facial was okay but I had to wait 20 minutes past my appointment time. Service quality was average at best.",
        status: "Pending",
        date: "2025-10-20",
        reply: null
    },
    {
        id: 5,
        reviewerName: "Emily Clark",
        email: "emily@example.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        service: "Aromatherapy Massage",
        rating: 5,
        reviewText: "So relaxing I literally fell asleep! The essential oils were heavenly and the massage technique was perfect. Will definitely be back.",
        status: "Approved",
        date: "2025-10-22",
        reply: "We're so happy you enjoyed the aromatherapy session, Emily! Can't wait to see you again."
    },
    {
        id: 6,
        reviewerName: "David Wilson",
        email: "david.w@example.com",
        avatar: "https://i.pravatar.cc/150?img=6",
        service: "Swedish Massage",
        rating: 3,
        reviewText: "Decent massage but the room temperature was too cold for my liking. Otherwise the therapist was professional.",
        status: "Pending",
        date: "2025-10-19",
        reply: null
    },
    {
        id: 7,
        reviewerName: "Sarah Mitchell",
        email: "sarah.m@example.com",
        avatar: "https://i.pravatar.cc/150?img=7",
        service: "Deep Tissue Massage",
        rating: 5,
        reviewText: "Best deep tissue massage I've ever had! The pressure was exactly what I needed. My chronic shoulder pain is finally gone!",
        status: "Approved",
        date: "2025-10-18",
        reply: null
    },
    {
        id: 8,
        reviewerName: "Tom Harris",
        email: "tom.h@example.com",
        avatar: "https://i.pravatar.cc/150?img=8",
        service: "Basic Facial",
        rating: 1,
        reviewText: "Terrible service. The products used irritated my skin and the staff was rude when I complained.",
        status: "Hidden",
        date: "2025-10-15",
        reply: null
    },
];

export const blogReviews = [
    {
        id: 1,
        reviewerName: "Jessica Lee",
        email: "jessica@example.com",
        avatar: "https://i.pravatar.cc/150?img=9",
        blogTitle: "Benefits of Massage Therapy",
        commentText: "Great article! Really informative and well-written. I learned so much about the different benefits of regular massage therapy.",
        status: "Approved",
        date: "2025-10-21",
        reply: "Thank you, Jessica! We're glad you found it helpful."
    },
    {
        id: 2,
        reviewerName: "Robert Chen",
        email: "robert@example.com",
        avatar: "https://i.pravatar.cc/150?img=10",
        blogTitle: "Understanding Deep Tissue Massage",
        commentText: "This answered all my questions about deep tissue massage. Now I feel confident booking my first session!",
        status: "Approved",
        date: "2025-10-19",
        reply: null
    },
    {
        id: 3,
        reviewerName: "Linda Johnson",
        email: "linda@example.com",
        avatar: "https://i.pravatar.cc/150?img=11",
        blogTitle: "Benefits of Massage Therapy",
        commentText: "Could you write more about aromatherapy specifically? Would love to learn about different essential oils.",
        status: "Approved",
        date: "2025-10-17",
        reply: "Great suggestion, Linda! We'll add that to our content calendar."
    },
    {
        id: 4,
        reviewerName: "Michael Scott",
        email: "mscott@example.com",
        avatar: "https://i.pravatar.cc/150?img=12",
        blogTitle: "Top 5 Skincare Routines for Winter",
        commentText: "When will this article be published? Really looking forward to it!",
        status: "Pending",
        date: "2025-10-16",
        reply: null
    },
    {
        id: 5,
        reviewerName: "Amanda Parker",
        email: "amanda@example.com",
        avatar: "https://i.pravatar.cc/150?img=13",
        blogTitle: "Understanding Deep Tissue Massage",
        commentText: "Very helpful! I've been dealing with chronic pain and this gave me hope that massage therapy could help.",
        status: "Approved",
        date: "2025-10-14",
        reply: null
    },
    {
        id: 6,
        reviewerName: "SpamBot123",
        email: "spam@fake.com",
        avatar: "https://i.pravatar.cc/150?img=14",
        blogTitle: "Benefits of Massage Therapy",
        commentText: "Check out my website for cheap massage equipment!!! www.scam-site.com",
        status: "Pending",
        date: "2025-10-13",
        reply: null
    },
];

export const myAppointments = [
    {
        id: 101,
        service: "Swedish Massage",
        therapist: "Olivia Austin",
        date: "2025-10-25",
        time: "10:00 AM",
        status: "Confirmed",
        duration: "60 min",
        price: 80,
        reviewed: false
    },
    {
        id: 102,
        service: "Deep Tissue",
        therapist: "Amelia Hannan",
        date: "2025-11-12",
        time: "11:30 AM",
        status: "Pending",
        duration: "60 min",
        price: 95,
        reviewed: false
    },
    {
        id: 99,
        service: "Hot Stone",
        therapist: "Kate Harris",
        date: "2025-09-15",
        time: "02:00 PM",
        status: "Completed",
        duration: "90 min",
        price: 120,
        reviewed: false
    },
    {
        id: 98,
        service: "Facial Care",
        therapist: "Olivia Austin",
        date: "2025-08-20",
        time: "09:00 AM",
        status: "Cancelled",
        duration: "45 min",
        price: 65,
        reviewed: false
    }
];
