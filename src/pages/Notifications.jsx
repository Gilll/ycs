import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import {useOutletContext} from "react-router";

const Notifications = () => {
    const evOn = {
        standard: true,
        pro: true,
        models: true,
        photo: true
    }
    const evOff = {
        standard: false,
        pro: false,
        models: false,
        photo: false
    }
    const [dataReady, setDataReady] = useState(false)
    const [all, setAll] = useState(-1)
    const [notifications, setNotifications] = useState(evOff)

    const [getNotifications, notificationsIsLoading] = useApi({
        url: '/ajax/profile/api/favorite.php',
        method: 'GET'
    })

    const [setNotification] = useApi({
        url: '/ajax/profile/notification.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })

    const checkAll = () => {
        if (notifications.standard && notifications.pro && notifications.models && notifications.photo) {
            setAll(1)
        } else if (!notifications.standard && !notifications.pro && !notifications.models && !notifications.photo) {
            setAll(-1)
        } else {
            setAll(0)
        }
    }

    useEffect(() => {
        checkAll()
    },[notifications.standard, notifications.pro, notifications.models, notifications.photo])

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        getNotifications().then(resp => {
            let not = resp.notification
            setDataReady(true)
            setNotifications({
                standard: not.UF_STANDART === "1",
                pro: not.UF_YCS_PHOTO === "1",
                models: not.UF_LIKE === "1",
                photo: not.UF_ANNOUNCE === "1"
            })
        })
        setMenuIsOpen(false)
    },[])



    return (
        <div className="personal__tab-content call-personal active">
            <button type="button" className="personal__back-link" onClick={() => setMenuIsOpen(true)}>
                <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z"
                        fill="#242424"/>
                </svg>
                <span>Назад</span>
            </button>
            <div className="personal__tab-header">
                <div className="personal__title-box">
                    <p className="personal__title title">
                        <span>Настройки</span> уведомлений
                    </p>
                </div>
                {notificationsIsLoading ? <PageIsLoading/> :
                    <div className="personal__tab-wrapper-cheks">
                        <div className="record__checkbox record__custom-checkbox-ajax_checkpers">
                            <input className={"record__custom-checkbox" + (all === 0 ? ' odd' : '')} type="checkbox" id="notif-1"
                                   name="checkbox" checked={all >= 0}/>
                            <label htmlFor="notif-1" onClick={() => {
                                if (all < 0) {
                                    setAll(1)
                                    setNotifications(evOn)
                                    setNotification({formData: "ALL=true"})
                                } else {
                                    setAll(-1)
                                    setNotifications(evOff)
                                    setNotification({formData: "ALL=false"})
                                }
                            }}><span>Выбрать все</span></label>
                        </div>
                        <div className="record__checkbox record__custom-checkbox-ajax_checkpers">
                            <input className="record__custom-checkbox"
                                   type="checkbox" id="notif-2" name="checkbox" checked={notifications.standard}/>
                            &gt;
                            <label htmlFor="notif-2" onClick={() => {
                                setNotifications({...notifications, standard: !notifications.standard})
                                setNotification({formData: 'NOTE=UF_STANDART&ACTION=' + !notifications.standard})
                            }}><span>Анонс каталога стандарт</span></label>
                        </div>
                        <div className="record__checkbox record__custom-checkbox-ajax_checkpers">
                            <input className="record__custom-checkbox"
                                   type="checkbox" id="notif-3" name="checkbox" checked={notifications.pro}/>
                            <label htmlFor="notif-3" onClick={() => {
                                setNotifications({...notifications, pro: !notifications.pro})
                                setNotification({formData: 'NOTE=UF_YCS_PHOTO&ACTION=' + !notifications.pro})
                            }}><span>Анонс catalog PRO</span></label>
                        </div>
                        <div className="record__checkbox record__custom-checkbox-ajax_checkpers">
                            <input className="record__custom-checkbox"
                                   type="checkbox" id="notif-6" name="checkbox" checked={notifications.models}/>
                            <label htmlFor="notif-6" onClick={() => {
                                setNotifications({...notifications, models: !notifications.models})
                                setNotification({formData: 'NOTE=UF_LIKE&ACTION=' + !notifications.models})
                            }}><span>Анонс на избранных моделей</span></label>
                        </div>
                        <div className="record__checkbox record__custom-checkbox-ajax_checkpers">
                            <input className="record__custom-checkbox ajax ajax_checkItem"
                                   type="checkbox" id="notif-7" name="checkbox" checked={notifications.photo}/>
                            <label htmlFor="notif-7" onClick={() => {
                                setNotifications({...notifications, photo: !notifications.photo})
                                setNotification({formData: 'NOTE=UF_ANNOUNCE&ACTION=' + !notifications.photo})
                            }}><span>Анонс готовности отретушированных фотографий</span></label>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Notifications;