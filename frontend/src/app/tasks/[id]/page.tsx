'use client';
import { useMemo } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { ArrowBack } from '@kaspersky/icons/16'

import styles from "./page.module.css";
import { TaskKey, tasks } from '@/shared/models';
import { firstAnswer } from '@/tasks/1';
import { secondAnswer } from '@/tasks/2';
import { thirdAnswer } from '@/tasks/3';
import { useMutation } from '@tanstack/react-query';

const mappingAnswer: Partial<Record<TaskKey, () => Promise<unknown>>> = {
  'boots': firstAnswer,
  'news': secondAnswer,
  'malware': thirdAnswer,
}


export default function TaskPage({ params }: { params: { id: string } }) {
  const task = useMemo(() => tasks.find((task) => task.key === params.id), [params.id]);

  const handleCheckAnser = useMemo(() => task?.key ? mappingAnswer[task?.key] : undefined, [task?.key])

  const { mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: handleCheckAnser,
    mutationKey: ['checkAnswer', task?.key ?? '']
  })

  if (!task) {
    redirect('/tasks')
  }

  return (
    <div className={styles.page}>

      <div>
        <Link href={'/tasks'} className={styles.backLink}>
          <ArrowBack />
          Назад к задачам
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{task.title}</h3>
          <div>{task.description}</div>
        </div>
        <div className={styles.task}>
          <h5 className={styles.subHeader}>Задание</h5>
          <span style={{ textDecoration: 'underline' }}>Базовый уровень</span>
          <span>{task.subTasks?.basic}</span>
          <span style={{ textDecoration: 'underline' }}>Продвинутый уровень</span>
          <span>{task.subTasks?.advance}</span>
          <span style={{ textDecoration: 'underline' }}>Мудрость дня</span>
          <span>{task.subTasks?.endpoints}</span>
        </div>
        <details>
          <summary>
            <h5 className={cn(styles.subHeader, styles.summary)}>Справочная информация (осторожно, спойлеры!)</h5>
          </summary>
          <div className={styles.spoilers}>
            {task.spoilers?.map(({ title, href }) => href
              ? <a href={href} target='_blank' key={href}>{title}</a>
              : <span key={title}>{title}</span>
            )}
          </div>
        </details>
        {Boolean(handleCheckAnser) && <div className={styles.footer}>
          <button className={styles.button} onClick={() => mutate()}>Проверить</button>
        </div>}
        {isError && (
          <div className={styles.error}>
            <span style={{ textDecoration: 'underline' }}>{error.name}</span>
            <span>{error.message}</span>
          </div>
        )}
        {isSuccess && (
          <div className={styles.success}>
            <span>Успешно выполнено!</span>
            {' '}
            <Link href={'/tasks'} className={styles.backLink}>
              Назад к задачам
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}