import TitleComponent from '../titleComponent/titleComponent';
import clsx from 'clsx';

const BenefitItem = ({ props }) => {
    const Icon = props.icon;

    const colorThemes = {
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", hoverText: "group-hover:text-emerald-600" },
        amber: { bg: "bg-amber-50", text: "text-amber-600", hoverText: "group-hover:text-amber-600" },
        green: { bg: "bg-green-50", text: "text-green-600", hoverText: "group-hover:text-green-600" },
        sky: { bg: "bg-sky-50", text: "text-sky-600", hoverText: "group-hover:text-sky-600" }
    };

    const theme = colorThemes[props.color] || colorThemes.emerald;

    return (
        <div className='benefit-card flex sm:flex-col sm:justify-center items-center gap-5 sm:text-center group p-6'>
            <div className="flex-shrink-0">
                {Icon ? (
                    <div className={clsx(
                        "md:size-16 size-14 rounded-xl flex items-center justify-center duration-300",
                        theme.bg, theme.text
                    )}>
                        <Icon size={32} weight="duotone" />
                    </div>
                ) : (
                    <img className='benefit-img md:size-16 size-14 object-contain' src={props.img} alt="img" />
                )}
            </div>
            <div>
                <TitleComponent type='h5' size='base' className={clsx(
                    "benefit-title mb-2 text-gray-900 font-bold transition-colors duration-300",
                    theme.hoverText
                )}>{props.heading}</TitleComponent>
                <TitleComponent size='small' className='benefit-desc text-gray-500 text-xs lg:text-sm leading-relaxed'>{props.desc}</TitleComponent>
            </div>
        </div>
    )
}

export default BenefitItem;

