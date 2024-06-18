import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './FollowButton.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';

const FollowButton = ({user,fetchPosts}) => {

    const {userId,followingIds, addFollowing, removeFollowing} = useContext(UserContext);
    const [isFollower,setIsFollower] = useState(false);
    const [content,setContent] = useState(' Follow');
    
    const currUserId = userId;
    // console.log(followingIds.includes(user.userId));
    // console.log(followingIds);
    // const [isFollower, setIsFollower] = useState(followingIds.includes(user.userId));
    
    useEffect(()=>{
        const fetchDetails = async () => {
            try{
                const followerResponse = await axios.get(`/api/users/is-follower/${user.userId}`);
                const isUserFollower = followerResponse.data;
                setIsFollower(isUserFollower);
                // setIsFollower(followingIds.includes(user.userId));
                console.log(isFollower);
                if(isUserFollower){
                    setContent(' Unfollow');
                }else{
                    setContent(' Follow');
                }
            }catch(err){
                console.log('Error while fetching follower response: '+err);
            }
        }
        fetchDetails();
    },[isFollower,content,followingIds]);

    const handleFollowRequest = async () => {
        try {
            if (isFollower && currUserId!=user.userId) {
                const removeResponse = await axios.delete(`/api/users/remove-following/${user.userId}`);
                if(removeResponse.data){
                    setIsFollower(false);
                    setContent('Follow');
                    toast.success(`Unfollowed ${user.name}`);
                    removeFollowing(user.userId);
                    console.log(followingIds);
                    // const toDeleteIndex = followingIds.findIndex(u=>u.userId==user.userId);
                    // followingIds.splice(toDeleteIndex,1);
                    // console.log(followingIds);
                    // setFollowingIds(followingIds);
                }
            } else if(currUserId!=user.userId) {
                const addResponse = await axios.post(`/api/users/add-following/${user.userId}`);
                if(addResponse.data){
                    setIsFollower(true);
                    setContent('Following');
                    toast.success(`Followed ${user.name}`);
                    addFollowing(user.userId);
                    console.log(followingIds);
                    // const toAddIndex = followingIds.findIndex(u=>u.userId==user.userId);
                    // if(toAddIndex==-1){
                    //     followingIds.push(user.userId);
                    //     setFollowingIds(followingIds);
                    // }
                }
            }
            fetchPosts();
        } catch (err) {
            console.log('Error while updating follow status: ' + err);
        }
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.followBtn}>
                <button onClick={handleFollowRequest} type="button" className={`btn ${styles.btnprimary}`}>
                    {!isFollower && <><FontAwesomeIcon icon={faUserPlus} /> &nbsp;</>}
                    {isFollower && <><FontAwesomeIcon icon={faUserMinus} /> &nbsp;</>}
                    {content}
                </button>
            </div>
        </div>
    )
}

export default FollowButton;