import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useAPI";

const FavoriteItem = ({model, notification, removeById}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [not1, setNot1] = useState(notification.UF_YCS_MODELS.includes(model.ID))
    const [not2, setNot2] = useState(notification.UF_SIMPLE_MODELS.includes(model.ID))

    const [changeNotification1] = useApi({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/ajax/profile/notification.php',
        formData: 'ACTION=' + not1 + '&NOTE=UF_YCS_MODELS&ID=' + model.ID
    })

    const [changeNotification2] = useApi({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/ajax/profile/notification.php',
        formData: 'ACTION=' + not2 + '&NOTE=UF_SIMPLE_MODELS&ID=' + model.ID
    })

    const [removeFromFav] = useApi({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/ajax/profile/favour.php',
        formData: 'ACT=false&NAME=' + model.ID
    })

    useEffect(() => {
        if (showDetails) {
            changeNotification1().then(resp => console.log(resp)).catch(() => alert('Ошибка при сохранении данных на сервере'))
        }
    },[not1])
    useEffect(() => {
        if (showDetails) {
            changeNotification2().then(resp => console.log(resp)).catch(() => alert('Ошибка при сохранении данных на сервере'))
        }
    },[not2])

    return (
        <div className={ "model-wrapper" + (showDetails ? ' show-details': '')}>
            <a href={model.DETAIL_PAGE_URL} className="model">
                <div className="model__image">
                    <img src={model.PREVIEW_PICTURE} alt=""/>
                </div>
                <div className="model__like ajax___like active" onClick={(e => {
                    e.preventDefault()
                    e.stopPropagation()
                    removeFromFav()
                    removeById()
                })}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.4545 2C15.1636 2 13.1716 3.00731 12 4.69539C10.8284 3.00731 8.83636 2 6.54545 2C4.81011 2.00197 3.14642 2.67501 1.91935 3.87146C0.692279 5.06792 0.00202103 6.6901 0 8.38214C0 11.4881 1.98545 14.7207 5.90182 17.9883C7.69642 19.4794 9.63492 20.7974 11.6902 21.924C11.7854 21.9739 11.8919 22 12 22C12.1081 22 12.2146 21.9739 12.3098 21.924C14.3651 20.7974 16.3036 19.4794 18.0982 17.9883C22.0145 14.7207 24 11.4881 24 8.38214C23.998 6.6901 23.3077 5.06792 22.0806 3.87146C20.8536 2.67501 19.1899 2.00197 17.4545 2ZM12 20.6263C10.2098 19.619 1.30909 14.309 1.30909 8.38214C1.31053 7.02845 1.86269 5.73061 2.84438 4.77341C3.82608 3.81621 5.15713 3.27784 6.54545 3.27643C8.75782 3.27643 10.6156 4.4284 11.3945 6.28348C11.4439 6.40053 11.5277 6.50065 11.6356 6.57111C11.7434 6.64157 11.8702 6.67919 12 6.67919C12.1298 6.67919 12.2566 6.64157 12.3644 6.57111C12.4723 6.50065 12.5561 6.40053 12.6055 6.28348C13.3844 4.4284 15.2422 3.27643 17.4545 3.27643C18.8429 3.27784 20.1739 3.81621 21.1556 4.77341C22.1373 5.73061 22.6895 7.02845 22.6909 8.38214C22.6909 14.309 13.7902 19.619 12 20.6263Z"/>
                        <path className="model__like-heat"
                              d="M24 8.45986C24 15.7532 12.8796 21.6567 12.4061 21.9005C12.2813 21.9658 12.1417 22 12 22C11.8583 22 11.7187 21.9658 11.5939 21.9005C11.1204 21.6567 0 15.7532 0 8.45986C0.00198508 6.74719 0.702493 5.10522 1.94784 3.89418C3.19319 2.68314 4.88167 2.00193 6.64286 2C8.85536 2 10.7925 2.92522 12 4.48913C13.2075 2.92522 15.1446 2 17.3571 2C19.1183 2.00193 20.8068 2.68314 22.0522 3.89418C23.2975 5.10522 23.998 6.74719 24 8.45986Z"/>
                    </svg>
                </div>

                <div className="model__notif" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowDetails(true)
                }}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5619_1278)">
                            <path
                                d="M14.3744 17.25V17.9688C14.3744 18.7312 14.0715 19.4625 13.5324 20.0017C12.9932 20.5408 12.2619 20.8438 11.4994 20.8438C10.7369 20.8438 10.0057 20.5408 9.4665 20.0017C8.92733 19.4625 8.62443 18.7312 8.62443 17.9688V17.25M19.2116 15.7869C18.058 14.375 17.2436 13.6563 17.2436 9.76377C17.2436 6.19922 15.4234 4.92928 13.9252 4.3125C13.7262 4.23074 13.5389 4.04297 13.4782 3.83857C13.2154 2.94418 12.4787 2.15625 11.4994 2.15625C10.5201 2.15625 9.78296 2.94463 9.52287 3.83947C9.46222 4.04611 9.2749 4.23074 9.07589 4.3125C7.57595 4.93018 5.75751 6.19563 5.75751 9.76377C5.75527 13.6563 4.94083 14.375 3.78724 15.7869C3.30927 16.3718 3.72794 17.25 4.56394 17.25H18.4394C19.2709 17.25 19.6869 16.3691 19.2116 15.7869Z"
                                stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_5619_1278">
                                <rect width="23" height="23" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="model__name">{model.NAME}</div>
                <div className="model__catalog">{model.PROPERTY_KATALOG_VALUE}</div>
                {model.PROPERTY_STATUS_VALUE && <div className="model__status">повышенная стоимость</div>}
            </a>
            <div className="model__notif-details">
                <div className="model__notif-details_top">
                    <div className="model__notif-details_title">Уведомления</div>
                    <div className="model__notif-details_close" onClick={() => setShowDetails(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 0H0V20H20V0Z" fill="white" fillOpacity="0.01"/>
                            <path d="M3 3L16 16" stroke="white" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M3 16L16 3" stroke="white" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className="model__notif-details_checkboxes">
                    <div className="record__checkbox">
                        <input className="record__custom-checkbox" type="checkbox" name="checkbox"
                                checked={not1}/>
                        <label onClick={() => setNot1(!not1)} htmlFor="var-1"><span>новые даты Съемка в стиле ycs</span></label>
                    </div>
                    <div className="record__checkbox">
                        <input className="record__custom-checkbox" type="checkbox" name="checkbox"
                               checked={not2}/>
                        <label onClick={() => setNot2(!not2)} htmlFor="var-2"><span>новые даты Обычная съемка</span></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteItem;