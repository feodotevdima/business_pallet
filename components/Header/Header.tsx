'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./Header.module.css";

const Header = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollYRef = useRef(0);

    const getButtonColor = () => {
        switch (pathname) {
            case '/about':
                return '#85AE72';
            case '/pallets':
                return '#FFAD5B';
            case '/services':
                return '#bad3edff';
            case '/contacts':
                return '#C4C59C';
            default:
                return '#85AE72';
        }
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    const handleCall = () => {
        window.location.href = 'tel:+79214060896';
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (menuOpen) {
            scrollYRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            window.scrollTo(0, scrollYRef.current);
        }
        
        return () => {
            if (menuOpen) {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                window.scrollTo(0, scrollYRef.current);
            }
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && menuOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [menuOpen]);

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Десктопное меню */}
                <nav className={styles.desktopNav}>
                    <Link
                        href="/about"
                        className={`${styles.link} ${isActive('/about') || isActive('/') ? styles.active : ''}`}
                    >
                        О компании
                    </Link>
                    <Link
                        href="/pallets"
                        className={`${styles.link} ${isActive('/pallets') ? styles.active : ''}`}
                    >
                        Поддоны
                    </Link>
                    <Link
                        href="/services"
                        className={`${styles.link} ${isActive('/services') ? styles.active : ''}`}
                    >
                        Услуги
                    </Link>
                    <Link
                        href="/contacts"
                        className={`${styles.link} ${isActive('/contacts') ? styles.active : ''}`}
                    >
                        Контакты
                    </Link>
                </nav>

                {/* Бургер меню */}
                <button 
                    className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Контакты */}
                <div className={styles.contacts}>
                    <div className={styles.phone}>8-921-406-08-96</div>
                    <button 
                        className={styles.callBtn} 
                        style={{ backgroundColor: getButtonColor() }}
                        onClick={handleCall}
                    >
                        Позвонить
                    </button>
                </div>

                {/* Оверлей и мобильное меню */}
                <div 
                    className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
                    onClick={closeMenu}
                    role="button"
                    tabIndex={0}
                    aria-label="Закрыть меню"
                />

                <div 
                    className={`${styles.mobileMenu} ${menuOpen ? styles.show : ''}`}
                    role="menu"
                    aria-hidden={!menuOpen}
                >
                    <Link 
                        href="/about"
                        onClick={closeMenu}
                        role="menuitem"
                    >
                        О компании
                    </Link>
                    <Link 
                        href="/pallets"
                        onClick={closeMenu}
                        role="menuitem"
                    >
                        Поддоны
                    </Link>
                    <Link 
                        href="/services"
                        onClick={closeMenu}
                        role="menuitem"
                    >
                        Услуги
                    </Link>
                    <Link 
                        href="/contacts"
                        onClick={closeMenu}
                        role="menuitem"
                    >
                        Контакты
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;