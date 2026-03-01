'use client';

import React, { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel';
import styles from "./PalletsPage.module.css";

interface CatalogItem {
    path: string;
    text: string;
}

const PalletsPage: React.FC = () => {
    const [group, setGroup] = useState(0);
    const [currentItems, setCurrentItems] = useState<CatalogItem[]>([]);
    const [groupTitle, setGroupTitle] = useState('Евро группа');

    useEffect(() => {
        document.title = 'Каталог компании БизнесПаллет | Санкт-Петербург';
    }, []);

    const onGroupChange = (groupIndex: number) => {
        setGroup(groupIndex);

        if (groupIndex === 0) {
            setCurrentItems([
                {
                    path: '/assets/catalog/euro/variety1.webp',
                    text: `Европоддон б/у 800х1200 мм 1 сорт, грузоподъемность 2500 кг.`
                },
                {
                    path: '/assets/catalog/euro/variety2.webp',
                    text: `Европоддон б/у 800х1200 мм 2 сорт, грузоподъемность 2500 кг.`
                }
            ]);
            setGroupTitle('Евро группа');
        } else if (groupIndex === 1) {
            setCurrentItems([
                {
                    path: '/assets/catalog/euroBk/variety1.webp',
                    text: `Европоддон б/у 800х1200 мм 1 сорт, грузоподъемность 2500 кг. (БК)`
                },
                {
                    path: '/assets/catalog/euroBk/variety2.webp',
                    text: `Европоддон б/у 800х1200 мм 2 сорт, грузоподъемность 2500 кг. (БК)`
                }
            ]);
            setGroupTitle('Евро группа (БК)');
        } else if (groupIndex === 2) {
            setCurrentItems([
                {
                    path: '/assets/catalog/typical/variety1.webp',
                    text: `Поддон б/у 800х1200 мм 1 сорт, грузоподъемность 1500 кг.`
                },
                {
                    path: '/assets/catalog/typical/variety2.webp',
                    text: `Поддон б/у 800х1200 мм 2 сорт, грузоподъемность 1500 кг.`
                }
            ]);
            setGroupTitle('Типовая группа');
        } else if (groupIndex === 3) {
            setCurrentItems([
                {
                    path: '/assets/catalog/wide/variety1.webp',
                    text: `Поддон б/у 1000х1200 мм 1 сорт, грузоподъемность 1500 кг.`
                },
                {
                    path: '/assets/catalog/wide/variety2.webp',
                    text: `Поддон б/у 1000х1200 мм 2 сорт, грузоподъемность 1500 кг.`
                }
            ]);
            setGroupTitle('Широкая группа');
        }
    };

    useEffect(() => {
        onGroupChange(0);
    }, []);

    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroCard}>
                        <h1 className={styles.h1}>Поддоны</h1>
                        <div className={styles.line}></div>
                        <ul className={styles.desktopMenu}>
                            <li
                                onClick={() => onGroupChange(0)}
                                className={group === 0 ? styles.activeMenuItem : undefined}
                            >
                                Евро группа
                            </li>
                            <li
                                onClick={() => onGroupChange(1)}
                                className={group === 1 ? styles.activeMenuItem : undefined}
                            >
                                Евро группа (БК)
                            </li>
                            <li
                                onClick={() => onGroupChange(2)}
                                className={group === 2 ? styles.activeMenuItem : undefined}
                            >
                                Типовая группа
                            </li>
                            <li
                                onClick={() => onGroupChange(3)}
                                className={group === 3 ? styles.activeMenuItem : undefined}
                            >
                                Широкая группа
                            </li>
                        </ul>
                    </div>
                </div>

                {currentItems.length > 0 && (
                    <Carousel
                        items={currentItems}
                        groupTitle={groupTitle}
                        onGroupChange={onGroupChange}
                        currentGroup={group}
                    />
                )}
            </section>
        </div>
    );
};

export default PalletsPage;