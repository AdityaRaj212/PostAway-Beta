import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './FollowButton.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';

const FollowButton = ({ user, fetchPosts }) => {
    const { userId, followingIds, addFollowing, removeFollowing } = useContext(UserContext);
    const [isFollower, setIsFollower] = useState(false);

    const currUserId = userId;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const followerResponse = await axios.get(`/api/users/is-follower/${user._id}`);
                const isUserFollower = followerResponse.data;
                setIsFollower(isUserFollower);
            } catch (err) {
                console.log('Error while fetching follower response: ' + err);
            }
        };
        fetchDetails();
    }, [user._id]);

    useEffect(() => {
        setIsFollower(followingIds.includes(user._id));
    }, [followingIds, user._id]);

    const handleFollowRequest = async () => {
        try {
            if (isFollower && currUserId !== user._id) {
                await axios.delete(`/api/users/remove-following/${user._id}`);
                setIsFollower(false);
                toast.success(`Unfollowed ${user.name}`);
                removeFollowing(user._id);
            } else if (currUserId !== user._id) {
                await axios.post(`/api/users/add-following/${user._id}`);
                setIsFollower(true);
                toast.success(`Followed ${user.name}`);
                addFollowing(user._id);
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
                    <FontAwesomeIcon icon={isFollower ? faUserMinus : faUserPlus} /> &nbsp;
                    {isFollower ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    );
};

export default FollowButton;
