import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

import styles from './Home.module.css';
import Post from "./Post";
import { Logout } from './auth';
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import Followers from "./Followers";
import Following from "./Following";
import CreatePost from "./CreatePost";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ManageButton from "./ManageButton";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

export const PlaceholderBox = () => (
    <div className={styles.placeholderBox}>
        <Card style={{ width: '38rem' }}>
        <Placeholder as={Card.Text} animation="glow" className={styles.headerHolder}>

            <div className={styles.userNameHolder}>
                <Placeholder className={styles.profileHolder} xs={3} /> 
                <Placeholder className={styles.nameHolder} xs={4} /> 
            </div>
            <Placeholder.Button className={styles.followHolder} variant="primary" xs={3} />

        </Placeholder>
        <Card.Img variant="top" src="../../placeholder_image.png" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={3} />
        </Card.Body>
      </Card>
    </div>
);

const Home = () => {
    const { userName, userId, followerIds, followingIds } = useContext(UserContext);
    const { isAuth, changeAuthState } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts/all');
            setPosts(response.data.reverse());
            setLoadingPosts(false); // Set loading state to false when posts are fetched
        } catch (err) {
            console.log("Error while fetching posts: " + err);
        }
    };

    useEffect(() => {
        fetchPosts();
        if (isAuth) {
            const info = Cookies.get('userInfo');
            setUserInfo(JSON.parse(info));
            setLoadingUserInfo(false); // Set loading state to false when user info is fetched
        }
    }, [isAuth]);

    const handleLogout = () => {
        document.cookie = `jwtToken=''; max-age=0`;
        changeAuthState(); // Trigger the change in authentication state
        setShowLoginPopup(true); // Show login popup upon logout
    }

    return (
        <div className={styles.container}>

            {/* column 1 */}
            <div className={styles.column1}>
                <div className={styles.stickyComponents}>
                    <div className={styles.logo}>
                        <a href="/"><img src="/uploads/Post-Away_transparent.png" alt="Logo" /></a>
                    </div>

                    <div className={`${styles.createPost} ${styles.clickable}`}>
                        <CreatePost />
                    </div>

                    <div className={`${styles.userProfile} ${styles.clickable}`}>
                        <Link to={`/profile/${userId}`} className={styles.profileLink}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </div>
                            <h2>My Profile</h2>
                        </Link>
                    </div>

                    <div className={styles.manageButton}>
                        <ManageButton />
                    </div>
                </div>
            </div>

            {/* column 2 */}
            <div className={styles.column2}>
                {isAuth && (
                    <div className={styles.greetings}>
                        <h2>Welcome, {userName}!</h2>
                    </div>
                )}

                <div className={styles.postContainer}>
                    {loadingPosts ? (
                        <>
                            <PlaceholderBox />
                            <PlaceholderBox />
                            <PlaceholderBox />
                        </>
                    ) : posts.length === 0 ? (
                        <div>No posts available</div>
                    ) : (
                        posts.map(post => (
                            <Post key={post.id} post={post} fetchPosts={fetchPosts} />
                        ))
                    )}
                </div>
            </div>

            {/* column 3 */}
            <div className={styles.column3}>
                <div className={styles.stickyComponents}>
                {isAuth ? (
                        <>
                            <div className={styles.info}>
                                <Logout handleLogout={handleLogout}/>
                            </div>
                            <div className={styles.followers}>
                                <Followers followerIds={followerIds} />
                            </div>
                            <div className={styles.following}>
                                <Following followingIds={followingIds} />
                            </div>
                        </>
                    ) : null}

                    {/* <div className={styles.info}>
                        {loadingUserInfo ? <PlaceholderBox /> : <Logout />}
                    </div>
                    <div className={styles.followers}>
                        {loadingUserInfo ? <PlaceholderBox /> : <Followers followerIds={followerIds} />}
                    </div>
                    <div className={styles.following}>
                        {loadingUserInfo ? <PlaceholderBox /> : <Following followingIds={followingIds} />}
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Home;
