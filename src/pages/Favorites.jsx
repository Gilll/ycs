import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import FavoriteItem from "../components/FavoriteItem";
import Empty from "../components/Empty";
import {useOutletContext} from "react-router";

const Favorites = () => {
    const [items, setItems] = useState({
        models: [],
        notification: {}
    })

    const [getFavorite, favoriteIsLoading] = useApi({
        url: '/ajax/profile/api/favorite.php',
        method: 'GET'
    })
    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        getFavorite().then(resp => {
            console.log(resp)
            setItems(resp)
        }).catch(err => {
            console.log(err)
            alert('Ошибка при получении данных с сервера')
        })
        setMenuIsOpen(false)
    },[])



    return (
        <div className="personal__tab-content likes-order active">
            <button type="button" className="personal__back-link" onClick={() => setMenuIsOpen(true)}>
                <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z"
                        fill="#242424"/>
                </svg>
                <span>Назад</span>
            </button>
            <div className="personal__title-box">
                <p className="personal__title title">
                    <span>избранные</span> модели
                </p>
            </div>
            {favoriteIsLoading ? <PageIsLoading/> :
                (items.models && items.models.length) ? <div className="personal__tab-models-wrapper">
                    {items.models.map(model =>
                        <FavoriteItem model={model} notification={items.notification} removeById={() => {
                            setItems({...items, models: items.models.filter(el => el.ID !== model.ID)})
                        }}/>
                    )}
                </div> : <Empty/>
            }
        </div>
    );
};

export default Favorites;