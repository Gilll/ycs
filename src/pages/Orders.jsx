import React, {useEffect, useState} from 'react';
import OrdersFilter from "../components/OrdersFilter";
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import Empty from "../components/Empty";
import {useOutletContext} from "react-router";

const Orders = () => {
    const filterInitial = {
        status: "-1",
        payment: "-1",
        from: '',
        to: ''
    }
    const [orders, setOrders] = useState([])
    const [filter, setFilter] = useState(filterInitial)
    const [filteredOrders, setFilteredOrders] = useState([])
    const [getOrders, ordersIsLoading] = useApi({
        url: '/ajax/profile/api/orders.php',
        method: 'GET'
    })

    const applyFilter = (reset) => {
        if (reset) {
            if (orders.order && orders.order.length) {
                setFilteredOrders(orders.order)
            }
        } else {
            if (orders.order && orders.order.length) {
                setFilteredOrders(orders.order.filter(order => {
                    if (filter.payment === '-1') {
                        return order
                    } else if (order.UF_OPLATA === filter.payment) {
                        return order
                    }
                }).filter(order => {
                    if (filter.status === '-1') {
                        return order
                    } else if (order.UF_ORDER_STATUS === filter.status) {
                        return order
                    }
                }).filter(order => {
                    if (filter.from.trim() === '') {
                        return order
                    } else {
                        let dt = order.UF_ORDER_DATE.split('.'),
                            format = new Date(dt[2] + '-' + dt[1] + '-' + dt[0])
                        if (format > new Date(filter.from)) {
                            return order
                        }
                    }
                }).filter(order => {

                    if (filter.to.trim() === '') {
                        return order
                    } else {
                        let dt = order.UF_ORDER_DATE.split('.'),
                            format = new Date(dt[2] + '-' + dt[1] + '-' + dt[0])
                        if (format < new Date(filter.to)) {
                            return order
                        }
                    }
                }))
            }
        }
    }

    useEffect(() => {
        if (orders.order && orders.order.length) {
            applyFilter(false)
        }
    },[orders])

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        getOrders().then(resp => {
            console.log(resp)
            setOrders(resp)
        }).catch(err => {
            console.log(err)
            alert('Ошибка при получении данных с сервера')
        })
        setMenuIsOpen(false)
    },[])



    return (
        <div className="personal__tab-content orders active">
            <button type="button" className="personal__back-link" onClick={() => setMenuIsOpen(true)}>
                <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z"
                        fill="#242424"/>
                </svg>
                <span>Назад</span>
            </button>
            <OrdersFilter filter={filter} setFilter={setFilter} apply={() => applyFilter(false)} reset={() => {
                setFilter(() => filterInitial)
                applyFilter(true)
            }}/>
            <div className="orders__content">
                {ordersIsLoading ?
                    <PageIsLoading/> :
                    filteredOrders.length > 0 ? <div className="orders_items">
                            {filteredOrders.map(order =>
                                <div className="orders_item">
                                    <div className="orders_item__img">
                                        <img src={order.ORDER_PICTURE} alt=""/>
                                    </div>
                                    <div className="orders_item__info">
                                        <div className="orders_item__top">
                                            <div className="orders_item__num">№ {order.ID}</div>
                                            <div className="orders_item__date">{order.UF_ORDER_DATE}</div>
                                        </div>
                                        <div className="orders_item__details">
                                            <div className="orders_item__detail">
                                                <span className="title">Тип заказа</span>
                                                <span>{order.UF_ORDER_TYPE}</span>
                                            </div>
                                            <div className="orders_item__detail">
                                                <span className="title">Статус</span>
                                                <span>
                                                    {(order.UF_OPLATA === '10' && order.UF_ORDER_STATUS !== '15') ?
                                                    'Ожидает предоплаты' : orders.filter[order.UF_ORDER_STATUS].VALUE
                                                    }
                                                </span>
                                            </div>
                                            <div className="orders_item__detail">
                                                <span className="title">Модель</span>
                                                <span>{order.UF_MODEL_NAME}</span>
                                            </div>
                                            <div className="orders_item__detail">
                                                <span className="title">Стоимость</span>
                                                <span>{order.UF_PRICE} ₽</span>
                                            </div>
                                            <a href={"/cabinet/order/" + order.ID} className="orders_item__link link">Подробнее</a>
                                        </div>
                                    </div>
                                </div>
                            )} </div>
                      : <Empty/>
                }
            </div>
        </div>
    );
};

export default Orders;