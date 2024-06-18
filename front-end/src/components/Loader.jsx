import React, { useContext } from 'react';
import styles from './Loader.module.css';
import { LoadingContext } from './LoadingContext';

const Loader = ({ duration }) => {
  const {loading} = useContext(LoadingContext);

  if(!loading){
    return null;
  }else{
    const loaderStyle = {
      animationDuration: `${duration}s`
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.loader} style={loaderStyle}></div>
      </div>
    );
  }
};

export default Loader;
