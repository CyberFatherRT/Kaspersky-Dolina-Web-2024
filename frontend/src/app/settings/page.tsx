'use client';
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { SomeStrangeType, register } from "@/shared/utils";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const router = useRouter();
  const [savedToken] = useState(() =>
    typeof window !== "undefined"
      ? localStorage?.getItem('teamToken') ?? ''
      : ''
  );
  const [savedImageToken] = useState(() =>
    typeof window !== "undefined"
      ? localStorage?.getItem('heroImage') ?? ''
      : ''
  );

  const { mutate } = useMutation({
    mutationFn: (data: SomeStrangeType) => register(data),
    mutationKey: ['settings'],
    onSuccess({ token, image }) {
      localStorage.setItem('teamToken', token);
      if (image) {
        localStorage.setItem('heroImage', image);
      }
      router.push('/tasks')
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    const token = (e.target as any).token.value;
    const image = (e.target as any).image.value;
    mutate({ token, image })
  }, [mutate])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Форма настроек</h2>
        <form className={styles.form} id="loginform" onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              type="text"
              name="token"
              placeholder="xxxxxxxx"
              required
              autoComplete="off"
              className={styles.input}
              defaultValue={savedToken}
            />
            <label id="token">Введите токен вашей команды</label>
          </div>
          <div className={styles.field}>
            <input
              type="text"
              name="image"
              placeholder="xxxxxxxx"
              autoComplete="off"
              className={styles.input}
              defaultValue={savedImageToken}
            />
            <label id="image">Введите код кастомного скина</label>
          </div>
        </form>
        <button type="submit" form="loginform" className={styles.button}>К заданиям</button>
      </div>
    </div>
  );
}

