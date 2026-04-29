import TitleComponent from '../titleComponent/titleComponent';

const BenefitItem = ({ props }) => {
    return (
        <div className='benefit-card flex sm:flex-col sm:justify-center items-center gap-4 sm:text-center'>
            <div>
                <img className='benefit-img md:size-16 size-14 object-contain' src={props.img} alt="img" />
            </div>
            <div>
                <TitleComponent type='h5' size='base' className='benefit-title sm:mb-2 text-black font-bold'>{props.heading}</TitleComponent>
                <TitleComponent size='small' className='benefit-desc text-black sm:text-base'>{props.desc}</TitleComponent>
            </div>
        </div>
    )
}

export default BenefitItem;

