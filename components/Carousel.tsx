'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import styles from "../app/pallets/PalletsPage.module.css";

interface CatalogItem {
    path: string;
    text: string;
}

interface CarouselProps {
    items: CatalogItem[];
    groupTitle: string;
    onGroupChange: (index: number) => void;
    currentGroup: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, groupTitle, onGroupChange, currentGroup }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isChangingSlide, setIsChangingSlide] = useState(false);

    const touchStartX = useRef(0);
    const touchCurrentX = useRef(0);
    const slideContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const SWIPE_THRESHOLD = 80;
    const MAX_SWIPE_OFFSET = 200;

    const menuItems = [
        { id: 0, text: 'Евро группа' },
        { id: 1, text: 'Евро группа (БК)' },
        { id: 2, text: 'Типовая группа' },
        { id: 3, text: 'Широкая группа' }
    ];

    const nextSlide = () => {
        if (items.length === 0) return;

        setSlideDirection('right');
        setIsAnimatingIn(false);

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
            setSlideDirection(null);
            setIsAnimatingIn(true);

            setTimeout(() => {
                setIsAnimatingIn(false);
            }, 300);
        }, 300);
    };

    const prevSlide = () => {
        if (items.length === 0) return;

        setSlideDirection('left');
        setIsAnimatingIn(false);

        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
            setSlideDirection(null);
            setIsAnimatingIn(true);

            setTimeout(() => {
                setIsAnimatingIn(false);
            }, 300);
        }, 300);
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex) return;

        const direction = index < currentIndex ? 'left' : 'right';
        setSlideDirection(direction);

        setTimeout(() => {
            setCurrentIndex(index);
            setSlideDirection(null);
        }, 300);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchCurrentX.current = e.touches[0].clientX;
        setIsSwiping(true);
        setSwipeOffset(0);
        setIsChangingSlide(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isSwiping || isChangingSlide) return;

        e.preventDefault();
        touchCurrentX.current = e.touches[0].clientX;
        const deltaX = touchCurrentX.current - touchStartX.current;

        let offset = deltaX;
        if (Math.abs(deltaX) > MAX_SWIPE_OFFSET) {
            offset = deltaX > 0 ? MAX_SWIPE_OFFSET : -MAX_SWIPE_OFFSET;
        }

        setSwipeOffset(offset);
    };

    const handleTouchEnd = () => {
        if (!isSwiping || isChangingSlide) return;

        setIsSwiping(false);
        const deltaX = touchCurrentX.current - touchStartX.current;

        const shouldSwitch = Math.abs(deltaX) > SWIPE_THRESHOLD;

        if (shouldSwitch) {
            setIsChangingSlide(true);

            const targetOffset = deltaX > 0 ? MAX_SWIPE_OFFSET * 2 : -MAX_SWIPE_OFFSET * 2;
            const duration = 200;
            const startOffset = swipeOffset;
            const startTime = Date.now();

            const animateSwipeCompletion = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentOffset = startOffset + (targetOffset - startOffset) * easeProgress;

                setSwipeOffset(currentOffset);

                if (progress < 1) {
                    requestAnimationFrame(animateSwipeCompletion);
                } else {
                    if (deltaX > 0) {
                        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
                    } else {
                        setCurrentIndex((prev) => (prev + 1) % items.length);
                    }

                    setIsAnimatingIn(true);
                    setSwipeOffset(0);

                    setTimeout(() => {
                        setIsAnimatingIn(false);
                        setIsChangingSlide(false);
                    }, 300);
                }
            };

            requestAnimationFrame(animateSwipeCompletion);
        } else {
            animateReturnToCenter();
        }

        touchStartX.current = 0;
        touchCurrentX.current = 0;
    };

    const animateReturnToCenter = () => {
        const duration = 200;
        const startOffset = swipeOffset;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentOffset = startOffset * (1 - easeProgress);

            setSwipeOffset(currentOffset);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setSwipeOffset(0);
            }
        };

        requestAnimationFrame(animate);
    };

    const getSlideStyle = () => {
        const style: React.CSSProperties = {};

        if (isSwiping || Math.abs(swipeOffset) > 0) {
            style.transform = `translateX(${swipeOffset}px)`;
            style.transition = isSwiping ? 'none' : 'transform 0.2s ease-out';

            if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
                const opacity = 1 - Math.abs(swipeOffset) / (MAX_SWIPE_OFFSET * 3);
                style.opacity = Math.max(0.7, opacity);
            }
        }

        return style;
    };

    const getSlideClasses = () => {
        const classes = [styles.carouselSlide];

        if (slideDirection === 'left') {
            classes.push(styles.slideOutLeft);
        } else if (slideDirection === 'right') {
            classes.push(styles.slideOutRight);
        }

        return classes.join(' ');
    };

    // Закрываем dropdown при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.carouselContainer} ref={dropdownRef}>
            {/* Заголовок с dropdown для мобильных */}
            <div style={{ position: 'relative', marginBottom: '30px' }}>
                <h1
                    className={styles.carouselTitle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {groupTitle}
                    <span className={`${styles.arrowIcon} ${isMobileMenuOpen ? styles.open : ''}`}>
                        {isMobileMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                </h1>

                {/* Dropdown меню для мобильных */}
                <div className={`${styles.dropdownMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => {
                                    onGroupChange(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={currentGroup === item.id ? styles.activeMenuItem : ''}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div
                className={styles.carousel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
            >
                <button
                    className={`${styles.carouselButton} ${styles.prevButton}`}
                    onClick={prevSlide}
                >
                    <Image 
                        src='/assets/buttons/prevButton.svg' 
                        alt="Previous" 
                        width={24}
                        height={24}
                    />
                </button>

                <div
                    className={styles.carouselSlideContainer}
                    ref={slideContainerRef}
                >
                    <div
                        className={getSlideClasses()}
                        style={getSlideStyle()}
                    >
                        <div className={`
                            ${styles.carouselContent} 
                            ${isAnimatingIn ? styles.slideIn : ''}
                        `}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={items[currentIndex].path}
                                    className={styles.carouselImage}
                                    alt={items[currentIndex].text}
                                    width={600}
                                    height={400}
                                    draggable="false"
                                    priority
                                />
                            </div>
                            <div className={styles.textContent}>
                                <div className={styles.carouselText}>
                                    {items[currentIndex].text}
                                </div>
                                <button
                                    className={styles.mainBtn}
                                    onClick={() => window.location.href = 'tel:+79214060896'}
                                >
                                    Узнать цену
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className={`${styles.carouselButton} ${styles.nextButton}`}
                    onClick={nextSlide}
                >
                    <Image 
                        src='/assets/buttons/nextButton.svg' 
                        alt="Next" 
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div className={styles.carouselIndicators}>
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Перейти к поддону ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;