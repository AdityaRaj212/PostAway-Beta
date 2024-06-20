import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';
import CreatePost from './CreatePost';
import getColorForLetter from './ColourMapping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ProfilePageContent from './ProfilePageContent';
import { useParams } from 'react-router-dom';
import EditProfile from './EditProfile';
import ManageButton from './ManageButton';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProfilePage = () => {
    const {userId} = useParams();
    const [user,setUser] = useState({});
    const [currUserId,setCurrUserId] = useState(null);
    const {userName} = useContext(UserContext);

    useEffect(()=>{

        const fetchCurrUserId = async () => {
            const userIdResponse = await axios.get(`/api/users/get-user-id-of-logged-in-user`);
            setCurrUserId(userIdResponse.data);
        }
        fetchCurrUserId();

        const fetchUser = async () => {
            const userResponse = await axios.get(`/api/users/get-user-by-id/${userId}`);
            setUser(userResponse.data);
            console.log('user: '+user);
        }
        fetchUser();
    },[userId, user.name, userName])

    let bgColor;
    if(user.name){
        bgColor = getColorForLetter(user.name[0]);
        return (
            <div className={styles.container}>
                {/* column 1 */}
                            {/* column 1 */}
            <div className={styles.column1}>
                <div className={styles.stickyComponents}>

                    <div className={styles.logo}>
                        <a href="/"><img src="/Post-Away_transparent.png"/></a>
                    </div>

                    <div className={`${styles.createPost} ${styles.clickable}`}>
                        <CreatePost/>
                    </div>

                    <div className={`${styles.manageButton} `}>
                        <ManageButton/>
                    </div>                    
                </div>
            </div>
    
                {/* column2 */}
                <div className={styles.column2}>
                    <div className={styles.userInfo}>
                        <div className={styles.profileCircle} style={{ backgroundColor: bgColor }}>
                            {user.name[0]}
                        </div>
                        <div className={styles.textualInfo}>
                            <div className={styles.nameAndProfile}>
                                <div className={styles.userName}>
                                    <FontAwesomeIcon icon={faAt} /> {userName}
                                </div>
                                {
                                    (currUserId==user._id) &&
                                    (<EditProfile/>)
                                }
                            </div>
                            <div className={styles.postAndFollowers}>
                                <div className={`${styles.noOfPosts} ${styles.userStats}`}>
                                    {(user.postIds.length<=1 && (<span><span className={styles.number}>{user.postIds.length}</span> Post</span>))}
                                    {(user.postIds.length>1 && (<span><span className={styles.number}>{user.postIds.length}</span> Posts</span>))}
                                </div>
                                <div className={`${styles.noOfFollowers} ${styles.userStats}`}>
                                    {(user.followerIds.length<=1 && (<span><span className={styles.number}>{user.followerIds.length}</span> Follower</span>))}
                                    {(user.followerIds.length>1 && (<span><span className={styles.number}>{user.followerIds.length}</span> Followers</span>))}
                                </div>
                                <div className={`${styles.noOfFollowing} ${styles.userStats}`}>
                                    {(user.followingIds.length<=1 && (<span><span className={styles.number}>{user.followingIds.length}</span> Following</span>))}
                                    {(user.followingIds.length>1 && (<span><span className={styles.number}>{user.followingIds.length}</span> Followings</span>))}
    
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className={styles.userContent}>
                        <ProfilePageContent userId={userId}/>
                        <div className={styles.postsAndLiked}>
                        </div>
                        <div className={styles.content}>
    
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        bgColor = 'violet';
        return null;
    }


};

export default ProfilePage;