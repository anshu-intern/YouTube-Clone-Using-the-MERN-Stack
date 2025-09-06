import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';

function MainVideoCard({value}){
    const uploadDate = formatDistanceToNowStrict(new Date(value.uploadDate), { addSuffix: true });

    function formatViewsIntl(views) {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
        });
        return formatter.format(views) + ' views';
    }

    return(
        <>
        <article className='relative flex flex-col justify-start items-start gap-0 p-1 w-[32%] h-[46%] min-h-[380px] overflow-hidden '>
            <div className='relative overflow-hidden w-[100%] h-[70%] rounded-xl'>
                <Link to={`watch/${value._id}`} className='w-[100%]'>
                    <img src={`${value.thumbnailUrl}`} alt='video image' className='h-[100%] w-[100%]'/>
               </Link>
            </div>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[16px] font-bold text-black py-1'>{value.title}</span>
            </Link>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{value.uploader}</span>
            </Link>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{ formatViewsIntl(value.views) } * {uploadDate}</span>
            </Link>
        </article>
        </>
    )
}

export default MainVideoCard;