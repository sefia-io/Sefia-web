import React from 'react';
import styles from './ShootingStar.module.css';

const ShootingStar = () => {
  return (
    <section className={styles.section}>
      {Array.from({ length: 20 }).map((_, index) => (
        <Star key={index} />
      ))}
    </section>
  );
};

const Star = () => {
  // 랜덤 위치와 속도 생성
  const top = Math.random() * 100; // 0% ~ 100%
  const right = Math.random() * 100; // 0% ~ 100%
  const delay = Math.random() * 0; // 0s ~ 3s로 변경하여 지연 시간 추가
  const duration = 1 + Math.random() * 2; // 1s ~ 3s

  const style: React.CSSProperties = {
    top: `${top}%`,
    right: `${right}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return <span className={styles.star} style={style}></span>;
};

export default ShootingStar;
