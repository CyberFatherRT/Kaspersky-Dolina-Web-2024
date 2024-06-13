'use client';
import Image from 'next/image'
import { FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Task, TaskStatus } from '@/shared/models';
import { TaskLevel } from '../TaskLevel';
import styles from "./TaskCard.module.css";
import { TaskProgress } from '../TaskProgress';

type TaskCardProps = Task & { status?: TaskStatus }

export const TaskCard: FC<TaskCardProps> = ({ title, description, level, icon, href, status }) => {
  const router = useRouter()
  const progress = useMemo(() => Object.values(status ?? {}).filter(v => v === true).length, [status])
  return (
    <div className={styles.сard} onClick={() => router.push(href)}>
      <Image
        src={icon}
        width={64}
        height={64}
        alt={icon}
      />
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          {title}
          {' '}
          {progress ? <TaskProgress progress={progress} /> : <TaskLevel level={level} />}
        </div>
        <span className={styles.cardDesc}>{description}</span>
      </div>
    </div>
  )
}   