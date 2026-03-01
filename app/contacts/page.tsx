'use client';

import React, { useEffect } from 'react';
import YandexMap from '@/components/YandexMap';
import styles from "./ContactsPage.module.css";

const ContactsPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Контакты компании БизнесПаллет | Санкт-Петербург';
      }, []);

    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroCard}>
                        <h1>Наши контакты</h1>
                        <div className={styles.heroText}>
                            <p>ООО&nbsp;«Бизнес&nbsp;Паллет»</p>
                            <p>Юридический адрес ( офис) : г.&nbsp;Колпино, ул.&nbsp;Севастьянова, д.&nbsp;12 Лит&nbsp;А, офис&nbsp;207<br />
                                Адрес склада : г.&nbsp;Колпино, ул.&nbsp;Финляндская, участок&nbsp;1, сооружение&nbsp;2,<br />
                                западнее дома&nbsp;30, корпус&nbsp;2, лит&nbsp;А по&nbsp;Финляндской улице<br />
                                Телефон: 8-921-406-08-96<br />
                                <a href="mailto:business_pllt@mail.ru" className={styles.link}>
                                    Электронная почта: business_pllt@mail.ru<br />
                                </a>
                                <a href="mailto:bp@business-pallet.ru" className={styles.link}>
                                    Корпоративная почта: bp@business-pallet.ru
                                </a>
                            </p>
                            <br />
                            <p>Позвонив нам , Вы получите подробную информацию.<br />
                                Мы рады каждому клиенту!</p>
                        </div>
                        <button 
                            className={styles.mainBtn} 
                            onClick={() => window.location.href = 'tel:+79214060896'}
                        >
                            Позвонить
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <h1>Как нас найти?</h1>
                    <div className={styles.mapText}>Мы находимся по&nbsp;адресу:  г.&nbsp;Колпино, ул.&nbsp;Финляндская,&nbsp;участок&nbsp;1, сооружение&nbsp;2, западнее дома&nbsp;30, корпус&nbsp;2, лит&nbsp;А</div>
                    <div className={styles.mapWrapper}>
                        <YandexMap />
                    </div>

                    <div className={styles.mapLegend}>
                        <p><span className={styles.legendLine}></span> Схема подъезда</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactsPage;