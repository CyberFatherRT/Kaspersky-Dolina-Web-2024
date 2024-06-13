import { FC } from 'react';
import styles from "./AboutMidori.module.css";

export interface AboutMidoriProps { }

export const AboutMidori: FC<AboutMidoriProps> = (props) => {
  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>Мидори Кума</h4>
      <div><span className={styles.key}>Возраст:</span> неизвестен</div>
      <div><span className={styles.key}>Пол:</span> неизвестен</div>
      <div><span className={styles.key}>Вид:</span> медведь (предположительно)</div>
      <div><span className={styles.key}>Место рождения:</span> Токио, Акихабарa</div>
      <div><span className={styles.key}>Место работы:</span> Лаборатория Касперского</div>
      <div className={styles.description}>
        <span className={styles.key}>Описание:</span>
        <p>
          В молодости он вёл довольно раскованный образ жизни, был совершенно ни разу не хикикомори.
          По рассказам очевидцев, Мидори Кума неоднократно был замечен на разных японских тусовках, презентациях, выставках и прочих, так называемых, конференциях.
          Иными словами, он вёл тот самый образ жизни, который сейчас принято называть «активная светская жизнь».
        </p>
        <p>
          Сейчас Мидори Кума помогает людям безопасно пользоваться интернетом и защищать свои онлайн-данные.
          Особое внимание он уделяет обучению детей. Кроме того, он активно посещает мероприятия, посвященные кибербезопасности, и ведет свои аккаунты в социальных сетях.
        </p>
      </div>
    </div>
  );
};