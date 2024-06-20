import { useEffect,useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './ManageFollowing.module.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot,faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';
import ShortProfileByUserId from './ShortProfileByUserId';

const ManageFollowing = ({ name, ...props }) => {
  const {followingIds: initialFollowingIds, removeFollowing} = useContext(UserContext);
  
  const [followingIds, setFollowingIds] = useState(initialFollowingIds);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setFollowingIds(initialFollowingIds);
  }, [initialFollowingIds]);


  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const handleRemoveFollowing = async (followingId) => {
    try{
      console.log('Following Id' + followingId);
      const removeResponse = await axios.delete(`/api/users/remove-following/${followingId}`);
      console.log(removeResponse.data);
      removeFollowing(followingId);
      setFollowingIds((prevFollowingIds) => prevFollowingIds.filter(f => f !== followingId));
      console.log(followingIds);
    }catch(err){
      console.log('Error while removing following: '+err);
    }
  }

  return (
    <>
    <div className={styles.container}>
      <Button variant="" onClick={toggleShow} >
        <div className={styles.text}>
          <h3>{name}</h3>
        </div>
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className={styles.offCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Manage Following</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {
          (followingIds.length!=0) &&
          (
            followingIds.map((followingId) => (
              <div className={styles.userCard}>
                <div key={followingId} className={styles.userProfile}>
                  <ShortProfileByUserId userId={followingId} /> 
                </div>
                <div className={styles.removeFollower}>
                  <button onClick={() => handleRemoveFollowing(followingId)}>
                    <FontAwesomeIcon icon={faUserSlash} />
                  </button>
                </div>
              </div>
            ))
          )
        }
        {
          (followingIds.length==0) &&
          (
            <div>
              <Alert key='info' variant='info'>
                You are not following anyone 
              </Alert>
            </div>
          )
        }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    </>
  );
}

export default ManageFollowing;