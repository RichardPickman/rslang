import { motion } from 'framer-motion';
import React from 'react';
import './styles.scss';

interface SparkleAnimationProps {
  img: string;
}
const SparkleAnimation = ({img}: SparkleAnimationProps) => {
  return (
    <>
      <motion.img
        src={img}
        className={'pattern-stars'}
        data-id='1'
        alt={'stars'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ repeat: Infinity, duration: 4, repeatType: 'mirror', delay: 1 }}
      />
      <motion.img
        src={img}
        className={'pattern-stars'}
        data-id='2'
        alt={'stars'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: 'mirror', delay: 2 }}
      />
      <motion.img
        src={img}
        className={'pattern-stars'}
        data-id='3'
        alt={'stars'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror', delay: 2 }}
      />
      <motion.img
        src={img}
        className={'pattern-stars'}
        data-id='4'
        alt={'stars'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 5, repeatType: 'mirror', delay: 4 }}
      />
      <motion.img
        src={img}
        className={'pattern-stars'}
        data-id='5'
        alt={'stars'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 5, repeatType: 'mirror', delay: 0.2 }}
      />
    </>
  );
};

export default SparkleAnimation;