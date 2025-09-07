import edit_img from '../assets/icons/edit.png';
import del_img from '../assets/icons/delete.png';
import icon from '../assets/icons/userProfilePic.jpg';
import { useContext, useEffect, useRef, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import axios from 'axios';
import userContext from '../assets/utils/userContext';

function Comment({ videoId, user, item, uploader }){
    const [ comment, setComment ] = useState([]);                       // comment array
    const [ commentValue, setCommentValue ] = useState('');             //setting add comment value
    const [ modifyCommentValue, setModifyCommentValue ] = useState(''); //setting modified comment value
    const [ newComment, setNewComment ] = useState(false);              // for displaying message- comment added successfully
    const [ addComment, setAddComment ] = useState(false);              // for displaying add comment section
    const [ editingCommentId, setEditingCommentId ] = useState(null);   // for input text and actions to modify comment by commentId
    const inputRef = useRef(null);
    const userCont = useContext(userContext);

    useEffect(() => {
        setComment(item);
    }, [ videoId, user, item]);

    useEffect(() => {
        if (editingCommentId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingCommentId]);   

    function uploadDate(date){
        return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    }

    function handleComment(e){
        setCommentValue(e.target.value);
    }

    //api to post comment to video
    async function handlePostComment(){
        try{
            const newComm = {
                videoId : videoId,
                text : commentValue.trim()
            }
            const res = await axios.post("/api/comment/", newComm, {headers: {Authorization: `JWT ${localStorage.getItem('Token')}`} });
            if(res.status === 201)
            {
                setComment(res.data.data);
                setCommentValue('');
                setAddComment(false);
                setNewComment(true);
                setTimeout(() => setNewComment(false), 5000);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                userCont.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    function handleOpenModifyComment(e, text){
        setEditingCommentId(e);
        setModifyCommentValue(text);
    }

    function handleCloseModifyComment(){
        setEditingCommentId(null);
        setModifyCommentValue(" ");
    }

    function handleSetEditComment(e){
        setModifyCommentValue(e.target.value);
    }

    //api to modify comment
    async function handleModifyComment(e){
        try{
            const res = await axios.patch(`/api/comment/${videoId}/${e}`, { text: modifyCommentValue.trim() }, {headers: {Authorization: `JWT ${localStorage.getItem('Token')}`} });
            if (res.status === 200 )
            {
                setModifyCommentValue(" ");
                setEditingCommentId(null);
                setComment(res.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                setEditingCommentId(null);
                localStorage.removeItem('Token');
                userCont.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    //api to delete comment
    async function handleDeleteComment(e){
        try{
            const res = await axios.delete(`/api/comment/${videoId}/${e}`, {headers: {Authorization: `JWT ${localStorage.getItem('Token')}`} });
            if(res.status === 200)
            {
                setNewComment(false);
                setComment(res.data.data);
            }
        } catch(err){
            if(err.response?.status === 401){
                localStorage.removeItem('Token');
                userCont.setLoggedInUser(null);
                alert("User session expired. Please login and try again.");
            } else {
                alert("Error occured! Please try after some time.");
            }
        }
    }

    return(
        <>
            <span className="text-[20px] font-bold py-1">{comment?.length} Comments</span>
                    {
                        addComment && 
                        <div className='w-[100%] py-2 '>
                            <span className='py-1'>Commenting as</span>
                            <div className='w-[100%] flex justify-start items-start gap-2 py-1'>
                                <div className='h-[40px] w-[40px] border rounded-full bg-green-900 text-white flex justify-center items-center text-[20px]'><span>{user.username.charAt(0)}</span></div>
                                <div className='flex flex-col justify-center items-start w-[100%]'>
                                    <span>{user.username}</span>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>    
                    }
                    {  user && !(comment?.find(c => c.userId === user?.userId)) && user?.userId !== uploader  && <input type="text" placeholder="Add a comment..." value={commentValue} className="relative w-[100%] outline-0 border-b-1 py-1 mb-4" onFocus={e => setAddComment(true)} onChange={e => handleComment(e)}></input>}
                    { comment?.find(c => c.userId === user?.userId) && <span className='text-[14px] text-gray-500'>Your comment is added.</span> }
                    { !user && <span className='py-2 text-gray-500'>Sign in to add a comment...</span>}
                    { newComment && <span className='text-green-700 pb-4 font-medium'>Commented added successfully!</span> }
                    { addComment && 
                        <div className="flex justify-between items-center">
                            <span className="text-[12px]">By completing this action you are creating a channel and agree to YouTube-clone's Terms of Service.</span>
                            <div className="flex gap-3">
                            <button className="text-[14px] font-medium px-3 py-2 rounded-3xl hover:bg-gray-200" onClick={() => setAddComment(false)}>Cancel</button>
                            <button className="text-[14px] font-medium px-3 py-2 rounded-3xl bg-gray-100 hover:bg-gray-200" onClick={handlePostComment}>Comment</button>
                            </div>
                        </div>
                    }

                    {
                        comment?.slice().sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt) ).map( (comment ,index) => (
                            <div key={comment._id} className="relative w-[100%] h-[auto] flex flex-col lg:flex-row gap-3 justify-start pb-10">
                                <div className="relative h-[100%] w-[50px] overflow-hidden rounded-full">
                                    <img src={icon} alt='icon' className='relative h-[50px] w-[50px] rounded-full'/>
                                </div>
                                <div className="w-[80%] flex flex-col gap-1">
                                    <div className='w-[100%] flex flex-col sm:flex-row'>
                                        <span className='text-[14px] font-bold'>@{comment.userId}</span>
                                        <span className='pl-2 text-gray-500 text-[12px]'>{uploadDate(comment.updatedAt)}</span>
                                    </div>
                                    { editingCommentId !== comment._id && <span className='text-[14px] w-[100%]'>{comment.text}</span> } 
                                    { editingCommentId === comment._id && <input type="text" value={modifyCommentValue} className='text-[14px] outline-blue-700 p-1' ref={inputRef} onChange={(e) => {handleSetEditComment(e)}} ></input> }
                                    <div className="pt-3 flex justify-start items-center">
                                        { user && <button className="relative h-[100%] border-r border-gray-400 px-6 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tl-3xl rounded-bl-3xl">Like</button>}
                                        { user && <button className="relative h-[100%] px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-tr-3xl rounded-br-3xl">Dislike</button>}
                                    </div>
                                </div>
                                <div className={`w-[200px] lg:w-[10%] flex ${ editingCommentId? "flex-col" : "flex-row"} justify-start lg:justify-center items-center gap-2`}>
                                    { editingCommentId !== comment._id && user?.userId === comment.userId && (
                                        <>
                                        <button className=' rounded-3xl px-0 py-0  cursor-pointer hover:bg-gray-200  ' onClick={()=>handleOpenModifyComment(comment._id, comment.text)}><img src={edit_img} className='h-[30px] w-[30px]'/></button>
                                        <button className=' rounded-3xl px-0 py-0 cursor-pointer hover:bg-gray-200 ' onClick={() => handleDeleteComment(comment._id)}><img src={del_img} className='h-[30px] w-[30px]'/></button>
                                        </>) 
                                    }
                                    { editingCommentId === comment._id && user?.userId === comment.userId && (
                                        <>
                                        <button className='rounded-3xl px-4 py-1 cursor-pointer bg-blue-600 text-white' onClick={() => handleModifyComment(comment._id)}>Modify</button> 
                                        <button className='border rounded-3xl px-4 py-1 cursor-pointer bg-gray-600 text-white' onClick={handleCloseModifyComment}>Cancel</button>
                                        </>) 
                                    }
                                </div>
                            </div>
                        ))
                    }
        </>
    )
}

export default Comment;