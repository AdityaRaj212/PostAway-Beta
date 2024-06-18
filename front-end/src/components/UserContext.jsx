import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [followerIds, setFollowerIds] = useState([]);
    const [followingIds, setFollowingIds] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const info = Cookies.get('userInfo');
            if (info) {
                const userInfo = JSON.parse(info);
                setUserName(userInfo.name);
                setUserId(userInfo.userId);
                setUserEmail(userInfo.email);
                setUserPassword(userInfo.password);
                setFollowerIds(userInfo.followerIds || []);
                setFollowingIds(userInfo.followingIds || []);
            }
        };

        fetchUserInfo();
    }, []);

    const addFollowing = (id) => {
        setFollowingIds((prevIds) => [...prevIds, id]);
    };

    const removeFollowing = (id) => {
        setFollowingIds((prevIds) => prevIds.filter((followId) => followId !== id));
    };

    const removeFollower = (id) => {
        setFollowerIds((prevIds) => prevIds.filter((followId) => followId !== id));
    };

    const changeUserName = (name) => {
        setUserName(name);
    }

    return (
        <UserContext.Provider value={{ userName, changeUserName, userId, userEmail, setUserEmail, userPassword, setUserPassword, followerIds, setFollowerIds, followingIds, setFollowingIds, addFollowing, removeFollowing, removeFollower }}>
            {children}
        </UserContext.Provider>
    );
}