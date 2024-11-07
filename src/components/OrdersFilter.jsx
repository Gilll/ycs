import React, {useState} from 'react';

const OrdersFilter = ({filter, setFilter, reset, apply}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="personal__tab-header">
            <div className="personal__title-box">
                <p className="personal__title title">
                    <span>Мои Заказы</span>
                </p>
                <button type="button" className="orders__filter-btn" onClick={() => setIsOpen(!isOpen)}>
                    <span className="filter-hide desktop">Фильтр</span>
                    <span className="filter-open desktop">Cкрыть фильтр</span>
                    <span className="filter-hide mobile">Фильтр</span>
                    <span className="filter-open mobile">скрыть</span>
                </button>
            </div>
            <form className={isOpen ? "orders__filter filter_ajax isOpen" : "orders__filter filter_ajax"}>
                <div className="orders__filter-item">
                    <p className="orders__filter-name">
                        Статус заказа
                    </p>
                    <label className="orders__filter-label">
                        <select className="orders__input" value={filter.status} onChange={e => setFilter({...filter, status: e.target.value })} name="ORDER_STATUS">
                            <option value={"1"}>Заказ создан</option>
                            <option value={"2"}>Заказ выполнен</option>
                            <option value={"13"}>Заказ завершен</option>
                            <option value={"15"}>Заказ отменен</option>

                            <option value={"-1"} id="order_all">Все</option>
                        </select>
                        <svg className="orders__filter-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.0332L6 6.0332L11 1.0332" stroke="#242424" strokeWidth="2"/>
                        </svg>
                    </label>
                </div>
                <div className="orders__filter-item">
                    <p className="orders__filter-name">
                        Статус оплаты
                    </p>
                    <label className="orders__filter-label">
                        <select className="orders__input" value={filter.payment} onChange={e => setFilter({...filter, payment: e.target.value })} name="PAYMENT_STATUS">
                            <option value={"10"}>Ожидает оплаты</option>
                            <option value={"11"}>Внесена предоплата</option>
                            <option value={"12"}>Оплачено</option>
                            <option value={"-1"} id="payment_all">Все</option>
                        </select>
                        <svg className="orders__filter-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.0332L6 6.0332L11 1.0332" stroke="#242424" strokeWidth="2"/>
                        </svg>
                    </label>
                </div>
                <div className="orders__filter-item">
                    <p className="orders__filter-name">
                        Дата съемки
                    </p>
                    <div className="orders__dates-box">
                        <label className="orders__filter-label">
                            <input placeholder="С" value={filter.from} type="text" className="orders__input input-date"
                                   name="DATE_FROM"/>
                            <input type="date" value={filter.from} onChange={e => setFilter({...filter, from: e.target.value })}/>
                            <svg className="orders__dates-icon" width="22" height="22" viewBox="0 0 22 22"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.75 8.24992V16.4999C2.75 18.525 4.39162 20.1666 6.41667 20.1666H15.5833C17.6084 20.1666 19.25 18.525 19.25 16.4999V8.24992M2.75 8.24992V6.87492C2.75 4.84987 4.39162 3.20825 6.41667 3.20825H15.5833C17.6084 3.20825 19.25 4.84987 19.25 6.87492V8.24992M2.75 8.24992H19.25M14.6667 1.83325V4.58325M7.33333 1.83325V4.58325"
                                    stroke="#969696" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </label>
                        <label className="orders__filter-label">
                            <input placeholder="По" value={filter.to} type="text" className="orders__input input-date"
                                   name="DATE_UNTIL"/>
                            <input type="date" value={filter.to} onChange={e => setFilter({...filter, to: e.target.value })}/>
                            <svg className="orders__dates-icon" width="22" height="22" viewBox="0 0 22 22"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.75 8.24992V16.4999C2.75 18.525 4.39162 20.1666 6.41667 20.1666H15.5833C17.6084 20.1666 19.25 18.525 19.25 16.4999V8.24992M2.75 8.24992V6.87492C2.75 4.84987 4.39162 3.20825 6.41667 3.20825H15.5833C17.6084 3.20825 19.25 4.84987 19.25 6.87492V8.24992M2.75 8.24992H19.25M14.6667 1.83325V4.58325M7.33333 1.83325V4.58325"
                                    stroke="#969696" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="orders__filter-footer">
                    <button type="button" className="orders__filter-reset" onClick={reset}>Сбросить</button>
                    <button type="button" className="orders__filter-submit link" onClick={() => apply(false)}>
                        <span>пРИМЕНИТЬ</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrdersFilter;