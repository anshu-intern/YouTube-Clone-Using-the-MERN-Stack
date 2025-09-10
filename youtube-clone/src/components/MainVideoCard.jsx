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
        <article className='relative flex flex-col justify-start items-start gap-0 p-1 w-[100%] max-w-[400px] h-[350px] md:w-[320px] md:h-[300px]'>
            <div className='relative overflow-hidden w-[100%] h-[70%] rounded-xl border border-gray-200 overflow-hidden'>
                <Link to={`watch/${value._id}`} className='relative w-[100%] h-[100%]'>
                    <img src={`${value.thumbnailUrl}`} alt='video image' className='relative h-[100%] w-[100%]'/>
               </Link>
            </div>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[16px] font-bold text-black py-1 line-clamp-2'>{value.title}</span>
            </Link>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{value.uploader?.username}</span>
            </Link>
            <Link to={`watch/${value._id}`} className='w-[100%]'>
                <span className='w-[100%] text-[14px] text-gray-500 py-1'>{ formatViewsIntl(value.views) } * {uploadDate}</span>
            </Link>
        </article>
        </>
    )
}

export default MainVideoCard;