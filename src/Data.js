import { MapPin, Envelope, Phone, FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo, YoutubeLogo } from 'phosphor-react';

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

import veganImg from './assets/vegan.webp';
import deliveryImg from './assets/delivery.webp';
import naturImg from './assets/natur.webp';
import recycleImg from './assets/recycle.webp';

import swedishCollection from './assets/swedish-collection-img.webp';
import tissueCollection from './assets/tissue-collection-img.webp';
import hotStoneCollection from './assets/hot-stone-collection-img.webp';
import aromaTherapyCollection from './assets/aromatherapy-collection-img.webp';

import facialOil from './assets/facial-oil.webp';
import bkindSoup from './assets/bkind-soup.webp';
import bodyLotion from './assets/mokosh-body-lotion.webp';


export const menuData = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
    { text: 'Services', to: '/services' },
    { text: 'Blog', to: '/blog' },
    { text: 'Contact', to: '/contact' },
];

export const contactData = [
    { icon: Envelope, label: "Email", title: "hammadali.cse123@gmail.com", path: "mailto:hammadali.cse123@gmail.com" },
    { icon: Phone, label: "Phone", title: "+92 317 4030299", path: "tel:+923174030299" },
    { icon: MapPin, label: "Address", title: "1867 Fire Access, USA", path: '/' },
];

export const socialData = [
    { icon: FacebookLogo, to: 'https://www.facebook.com/' },
    { icon: TwitterLogo, to: 'https://www.x.com/' },
    { icon: YoutubeLogo, to: 'https://www.youtube.com/' },
    { icon: InstagramLogo, to: 'https://www.instagram.com/' },
];

export const workingHours = [
    { day: 'Monday to Friday', time: '9AM - 6PM' },
    { day: 'Saturday', time: '9AM - 6PM' },
    { day: 'Sunday', time: '9:00 AM - 5PM' },
];

export const serviceData = [
    { image: serviceImg1, icon: serviceIcon, heading: 'Massage Therapy' },
    { image: serviceImg2, icon: serviceIcon, heading: 'Body Treatment' },
    { image: serviceImg3, icon: serviceIcon, heading: 'Waxing Care' },
    { image: serviceImg4, icon: serviceIcon, heading: 'Facial Care' },
];

export const procedureData = [
    {
        image: postImage1,
        heading: 'Massage Therapy',
        description: 'Quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
    },
    {
        image: postImage2,
        heading: 'Beauty Care',
        description: 'Est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
        image: postImage3,
        heading: 'Executive Reflexology',
        description: 'Et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut'
    },
];

export const blogData = [
    {
        user: "Admin",
        datePosted: "Jan 29, 2025",
        image: postImage1,
        heading: 'Ultimate Guide to Professional Facial Treatments',
        description: 'Discover transformative power of professional facial treatments for glowing skin. Expert aestheticians use premium products to restore natural radiance.'
    },
    {
        user: "Admin",
        datePosted: "Feb 06, 2025",
        image: postImage2,
        heading: 'How Regular Massage Therapy Transforms Health',
        description: 'Experience incredible health benefits beyond simple relaxation and stress relief. Improved circulation enhances your overall wellness.'
    },
    {
        user: "Admin",
        datePosted: "Mar 15, 2025",
        image: postImage3,
        heading: 'Essential Oils Transform Your Spa Experience',
        description: 'Unlock therapeutic benefits of essential oils during spa experience today. Different scents reduce anxiety while promoting deep relaxation.'
    },
    {
        user: "Admin",
        datePosted: "Apr 02, 2025",
        image: postImage1,
        heading: 'Essential Wellness Practices for Daily Care',
        description: 'Transform daily routine with simple wellness practices promoting peace. Mindful breathing techniques create spa-like atmosphere at home.'
    },
    {
        user: "Admin",
        datePosted: "Jan 29, 2025",
        image: postImage2,
        heading: 'Complete Body Detox Purifying Treatments',
        description: 'Experience rejuvenating effects of professional body treatments today. Exfoliating scrubs and wraps remove toxins while improving skin texture.'
    },
];

export const teamData = [
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

export const testimonialData = [
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

export const bestProductsData = [video1, video3, video4, video5, video6, video7, video1, video6];

export const skinProductsData = [
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

export const productBenefitsData = [
    {
        img: veganImg,
        heading: 'Vegan',
        desc: 'Our entire collection is vegan and cruelty free.'
    },
    {
        img: deliveryImg,
        heading: 'Fast & Free Shipping',
        desc: 'Doorstep delivery to most of the US.'
    },
    {
        img: naturImg,
        heading: 'Natural',
        desc: 'We only use the finest natural ingredients.'
    },
    {
        img: recycleImg,
        heading: 'Recyclable',
        desc: 'All packaging is recyclable and eco conscious.'
    },
];

export const popularCollectionData = [
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

export const newBeautyProductsData = [
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