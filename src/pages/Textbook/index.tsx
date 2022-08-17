import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { IWords } from '../../types/types';
import { useAppSelector } from './../../store/index';
import { useDispatch } from 'react-redux';
import { setWordsAction } from './../../store/reducers/textbookReducer/action-creators';

const Textbook = () => {
  const words  = useAppSelector((state) => state.textbook.words);
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, []);
  return (
    <Layout>
      <>
        <p>Textbook</p>
        {words && words.map((w: IWords) => <p>{w.word}</p>)}
      </>
    </Layout>
  );
};

export default Textbook;