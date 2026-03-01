'use client';

import React from 'react';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';

const YandexMap: React.FC = () => {
    const pointCoordinates = [59.752917, 30.549867]; // Колпино

    // Координаты для схемы подъезда (путь)
    const routeCoordinatesFirst = [
        [59.752624, 30.550445],
        [59.752618, 30.552462],
    ];
    const routeCoordinatesFirstArrow = [
        [59.752668, 30.550561],
        [59.752624, 30.550445],
        [59.752579, 30.550571],
    ];

    const routeCoordinatesSecond = [
        [59.752001, 30.552466],
        [59.752550, 30.552456],
    ];
    const routeCoordinatesSecondArrow = [
        [59.752472, 30.552344],
        [59.752550, 30.552456],
        [59.752480, 30.552553],
    ];

    const routeCoordinatesThird = [
        [59.752671, 30.552455],
        [59.753776, 30.552436],
    ];
    const routeCoordinatesThirdArrow = [
        [59.752742, 30.552342],
        [59.752671, 30.552455],
        [59.752743, 30.552547]
    ];

    return (
        <YMaps>
            <Map
                defaultState={{
                    center: pointCoordinates,
                    zoom: 17,
                }}
                width="100%"
                height="400px"
            >
                <Placemark
                    geometry={pointCoordinates}
                />
                <Polyline
                    geometry={routeCoordinatesFirst}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
                <Polyline
                    geometry={routeCoordinatesFirstArrow}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
                <Polyline
                    geometry={routeCoordinatesSecond}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
                <Polyline
                    geometry={routeCoordinatesSecondArrow}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
                <Polyline
                    geometry={routeCoordinatesThird}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
                <Polyline
                    geometry={routeCoordinatesThirdArrow}
                    options={{
                        strokeColor: '#FF8000',
                        strokeWidth: 4,
                    }}
                />
            </Map>
        </YMaps>
    );
};

export default YandexMap;