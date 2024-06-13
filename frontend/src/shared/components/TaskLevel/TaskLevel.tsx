import { FC } from 'react';
import { TaskLevel as TaskLevelType } from '@/shared/models';
import cn from 'classnames';
import styles from "./TaskLevel.module.css";
import { capitalizeFirstLetter } from '@/shared/utils';

export interface TaskLevelProps {
  level: TaskLevelType
}

export const TaskLevel: FC<TaskLevelProps> = ({ level }) => {
  return <div className={cn(styles.badge, styles[level])}>{capitalizeFirstLetter(level)}</div>;
};