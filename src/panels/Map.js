import React, { useState, useRef } from "react";
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Div, Group,Cell, PanelHeader, Button, List, ANDROID, Checkbox,
    View, FormLayout, Select, CellButton, Header, Switch, PopoutWrapper,
    HeaderButton, ListItem, platform, IOS, } from '@vkontakte/vkui';
import { YMaps, Map, Placemark, ZoomControl, TypeSelector, TrafficControl, RoutePanel,
    RouteEditor, RouteButton, GeolocationControl} from 'react-yandex-maps';
import json2 from '../data_test'


const osname = platform();

const dict = {
    "Culture": [
        {
            "latitude": 55.741728,
            "longitude": 37.620864,
            "title": "Государственная Третьяковская галерея"
        },
        {
            "latitude": 55.896343,
            "longitude": 37.479041,
            "title": "Химкинский филиал РГБ"
        },
        {
            "latitude": 55.708009,
            "longitude": 37.5956,
            "title": "ГЛАВCLUB GREEN CONCERT"
        },
        {
            "latitude": 55.804916,
            "longitude": 37.585449,
            "title": "Дизайн-квартал Flacon"
        },
        {
            "latitude": 55.808128,
            "longitude": 37.510709,
            "title": "Adrenaline Stadium"
        }
    ],
    "Entertainment": [
        {
            "latitude": 55.831388,
            "longitude": 37.629277,
            "title": "москва, проспект мира, 119"
        },
        {
            "latitude": 55.597246,
            "longitude": 37.527184,
            "title": "Moreon"
        },
        {
            "latitude": 55.729833,
            "longitude": 37.731021,
            "title": "Zамания в ТЦ \"Город\""
        },
        {
            "latitude": 55.751006,
            "longitude": 37.594369,
            "title": "Биг  Креатив Компани  Москва"
        },
        {
            "latitude": 55.775339,
            "longitude": 37.749857,
            "title": "Наш Парк!"
        }
    ],
    "Institution": [],
    "Living": [
        {
            "latitude": 55.844868,
            "longitude": 37.576461,
            "title": "дом 6, к. 2"
        },
        {
            "latitude": 55.753676,
            "longitude": 37.619899,
            "title": "Хостел Москва"
        },
        {
            "latitude": 55.779671,
            "longitude": 37.603999,
            "title": "hq Hostelberry"
        },
        {
            "latitude": 55.804243,
            "longitude": 37.593509,
            "title": "Loft Hostel"
        },
        {
            "latitude": 55.772568,
            "longitude": 37.617294,
            "title": "Landmark Hostel Arbat / Хостел в Москве"
        }
    ]
};

const Mapmap = () => {
    console.log(dict);
    const state = {
                firstEntry: true, // Решает баг с постоянно всплывающим предложением разрешить доступ к гео
                lat: 0,
                long: 0,
                currentGeo: null,
                coordinates: null,
                draggingList: [2, 3, 1, 4, 5],
                activePanel: 'start'
            };
    const [ymaps, setYmaps] = useState(null);
    const routes = useRef();
    const mapRef = useRef(null);
    const getRoute = () => {
        if (ymaps) {
            var multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    // Описание опорных точек мультимаршрута.
                    referencePoints: [[json2['data'][0]['coordinates']['latitude'], json2['data'][0]['coordinates']['longitude']],
                        [json2['data'][1]['coordinates']['latitude'], json2['data'][1]['coordinates']['longitude']]],
                    // Параметры маршрутизации.
                    params: {
                        // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                        results: 2
                    }
                },
                {
                    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                    boundsAutoApply: true
                }
            );
            routes.current = multiRoute;
            mapRef.current.geoObjects.add(multiRoute);
        }
    };
    const getRoutes = () => {
        mapRef.current.geoObjects.each(item => console.log(item));
    };
    return (
        <YMaps>
            <Map
                modules={["multiRouter.MultiRoute"]}
                onLoad={ymaps => setYmaps(ymaps)}
                instanceRef={ref => {
                    if (ref) mapRef.current = ref;
                }}
                state={{
                    center: [55.751574, 37.573856],
                    zoom: 11,
                    controls: [],
                }}
                style={{
                    flex: 1,
                    height: 200
                }}
            >
                <ZoomControl options={{ float: 'right' }} />
                <TypeSelector options={{ float: 'right' }} />
                <TrafficControl options={{ float: 'right' }} />
                <RouteButton options={{ float: 'right' }} />
                <GeolocationControl options={{ float: 'left' }} />

                <button onClick={getRoute}> Построить маршрут! </button >
                {/*<button onClick={getRoutes}>Show 2</button>*/}

                {dict['Culture'].map((element) =>
                    <Placemark
                        geometry={[element['latitude'], element['longitude']]}
                        options={{preset: 'islands#greenStretchyIcon',
                        }}
                        properties={{
                            iconContent: element['title'],
                            iconColor: 'rgba(229,98,255,0.86)'

                        }}
                    />
                )}

                {dict['Entertainment'].map((element) =>
                    <Placemark
                        geometry={[element['latitude'], element['longitude']]}
                        options={{preset: 'islands#orangeStretchyIcon',
                        }}
                        properties={{
                            iconContent: element['title'],
                            iconColor: 'rgba(229,98,255,0.86)'

                        }}
                    />
                )}

                {dict['Institution'].map((element) =>
                    <Placemark
                        geometry={[element['latitude'], element['longitude']]}
                        options={{preset: 'islands#blueStretchyIcon',
                        }}
                        properties={{
                            iconContent: element['title'],
                            iconColor: 'rgba(229,98,255,0.86)'

                        }}
                    />
                )}

                {dict['Living'].map((element) =>
                    <Placemark
                        geometry={[element['latitude'], element['longitude']]}
                        options={{preset: 'islands#yellowStretchyIcon',
                        }}
                        properties={{
                            iconContent: element['title'],
                            iconColor: 'rgba(229,98,255,0.86)'

                        }}
                    />
                )}
            </Map>
        </YMaps>
    );
}

export default Mapmap;
