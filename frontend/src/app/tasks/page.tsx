'use client';
import styles from "./page.module.css";
import Image from 'next/image'
import { Settings } from '@kaspersky/icons/32'
import { AboutMidori, TaskCard } from "@/shared/components";
import { tasks } from "@/shared/models";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/shared/utils";
import { useState } from "react";

export default function Taks() {
  const router = useRouter();

  const [token] = useState(() => typeof window !== "undefined"
    ? localStorage.getItem('heroImage') ?? 'default'
    : 'default'
  );

  const { data } = useQuery({
    queryKey: ['status'],
    queryFn: getStatus,
    retryDelay: 2000,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span />
        Прокачай своего героя
        <Settings className={styles.settings} onClick={() => router.push('/settings')} />
      </div>
      <div className={styles.leftpane}>
        <AboutMidori />
      </div>
      <div className={styles.hero}>
        <Image
          src={`https://a106318.tech/images/${token}.png`}
          width={480}
          height={480}
          alt="Midori kuma"
        />
      </div>
      <div className={styles.tasks}>
        {tasks.map((task) => <TaskCard {...task} key={task.key} status={data?.[task.key]} />)}
      </div>
      <div className={styles.footer}>
      </div>
    </div>
  );
}

