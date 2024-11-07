import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import Spinner from "../components/Spinner";
import {useOutletContext} from "react-router";

const PersonalData = () => {
    const [initialValue, setInitialValue] = useState({
        ID: '',
        EMAIL: '',
        NAME: '',
        PERSONAL_PHONE: '',
        UF_BRAND: '',
        UF_BRAND_LINK: '',
        UF_DEL_ADRESS: ''
    })
    const [message, setMessage] = useState({
        text: '&nbsp;',
        status: ''
    })
    const [form, setForm] = useState({
        ID: '',
        EMAIL: '',
        NAME: '',
        PERSONAL_PHONE: '',
        UF_BRAND: '',
        UF_BRAND_LINK: '',
        UF_DEL_ADRESS: ''
    })

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    const [getOrders, ordersIsLoading] = useApi({
        url: '/ajax/profile/api/data.php',
        method: 'GET'
    })

    const [updateData, updateIsLoading] = useApi({
        url: '/ajax/profile/updateData.php',
        data: form
    })

    useEffect(() => {
        getOrders().then(resp => {
            setInitialValue(resp)
            setForm(resp)
        }).catch(err => {
            setMessage({
                text: 'Обшибка при получении данных',
                status: 'err'
            })
            console.log(err)
        })
        setMenuIsOpen(false)
    },[])

    return (
        <div className="personal__tab-content form active">
            {ordersIsLoading ?
                    <PageIsLoading/>
                :
                <div>
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
                                <span>личные</span> данные
                            </p>
                        </div>
                    </div>
                    <form className="form__wrap">
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                Контактное лицо
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="ФИО" type="text" className="form__input" name="FIO"
                                       value={form.NAME} onChange={e => setForm({...form, NAME: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                Номер телефона
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="Телефон" type="tel" className="form__input mask-phone" name="TELEPHONE"
                                       value={form.PERSONAL_PHONE} onChange={e => setForm({...form, PERSONAL_PHONE: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                E-mail
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="Почта" type="email" className="form__input" name="EMAIL"
                                       value={form.EMAIL} onChange={e => setForm({...form, EMAIL: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                Название бренда
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="Бренд" type="text" className="form__input" name="BRAND_NAME"
                                       value={form.UF_BRAND} onChange={e => setForm({...form, UF_BRAND: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                Ссылка на ваш бренд
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="Ссылка на сайт" type="text" className="form__input" name="BRAND_LINK"
                                       value={form.UF_BRAND_LINK} onChange={e => setForm({...form, UF_BRAND_LINK: e.target.value})}
                                />
                            </label>
                        </div>
                        <div className="form__filter-item">
                            <p className="form__filter-name">
                                Адрес для отправки изделий
                            </p>
                            <label className="form__filter-label">
                                <input placeholder="Адрес офиса или адрес ПВЗ СДЭК" type="text" className="form__input" name="DEL_ADRESS"
                                       value={form.UF_DEL_ADRESS} onChange={e => setForm({...form, UF_DEL_ADRESS: e.target.value})}
                                />
                            </label>
                        </div>
                    </form>
                    <div className={message.status === 'ok' ? "form__filter-item success" : message.status === 'err' ? "form__filter-item error" : "form__filter-item"} id="data-message">
                        <p className="form__filter-name">
                            {message.text}
                        </p>
                    </div>
                    <div className="form__filter-footer">
                        <button className="form__filter-reset" onClick={() => {
                            if (initialValue) setForm(initialValue)
                        }}>отменить</button>
                        <button className="form__filter-submit link" id="update-button" onClick={() => {
                            updateData().then(() => {
                                setMessage({ text: 'Данные успешно обновлены!', status: 'ok' })
                                setInitialValue(form)
                                setTimeout(() => {
                                    setMessage({ text: '&nbsp;', status: '' })
                                },3000)
                            }).catch(() => {
                                setMessage({ text: 'Ошибка при сохранении данных', status: 'err' })
                            })
                        }}>
                            {updateIsLoading && <Spinner/>}
                            <span>Сохранить</span>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default PersonalData;