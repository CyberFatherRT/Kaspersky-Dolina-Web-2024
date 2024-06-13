import { FC } from 'react';
import { Star } from '@kaspersky/icons/16'
import styles from "./TaskProgress.module.css";


export interface TaskProgressProps {
  progress: number;
}

export const TaskProgress: FC<TaskProgressProps> = ({ progress }) => {
  return (
    <div className={styles.wrap}>
      <Star className={styles.star} />
      <Star className={progress >= 2 ? styles.star : undefined} />
      {progress === 3 && <Star className={styles.star} />}
    </div>
  );
};