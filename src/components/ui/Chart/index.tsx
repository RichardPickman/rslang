import React, { useEffect, useRef } from 'react';
import { animate } from "framer-motion"
import styles from './styles.module.scss';

interface ChartProps {
  type: string,
  from: number,
  to: number,
  description: string,
}

const Chart = ({ from, to, type, description }: ChartProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value: number) {
        if (node) {
          node.textContent = value.toFixed(0);
        }
      }
    });
    return () => controls.stop();
  }, [from, to]);
  
  return (<div className={styles['chart__content']}>
    <div className={styles['value']}>
      <span ref={nodeRef} className={styles['number']}></span>
      {type === 'percent' && <span className={styles['sign']}>%</span>}
    </div>
    <p className={styles['description']}>{description}</p>
  </div>);
};

export default Chart;