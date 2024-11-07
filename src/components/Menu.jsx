import React from 'react';
import PersonalNavImg2 from "../assets/img/personal-nav-img2.webp";
import PersonalNavImg3 from "../assets/img/personal-nav-img3.webp";
import {routeNames} from "../router/routeNames";
import {NavLink} from "react-router-dom";

const Menu = ({setIsOpen}) => {
    return (
        <nav className="personal__navigation">
            <h1 className="personal__title title mobile">
                личный кабинет
            </h1>
            <div className="personal__tabs">
                <NavLink onClick={() => setIsOpen(false)} to={routeNames.personalData} className="personal__tab">
                    <span>Личные данные</span>
                    <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z"
                            fill="#242424"/>
                    </svg>
                </NavLink>
                <NavLink onClick={() => setIsOpen(false)} to={routeNames.myOrders} className="personal__tab ">
                    <span>Мои заказы</span>
                    <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z"
                            fill="#242424"/>
                    </svg>
                </NavLink>
                <NavLink onClick={() => setIsOpen(false)} to={routeNames.favorites} className="personal__tab">
                    <span>Избранное</span>
                    <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z"
                            fill="#242424"/>
                    </svg>
                </NavLink>
                <NavLink onClick={() => setIsOpen(false)} to={routeNames.notifications} className="personal__tab">
                    <span>Уведомления</span>
                    <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z"
                            fill="#242424"/>
                    </svg>
                </NavLink>
                <NavLink onClick={() => setIsOpen(false)} to={routeNames.appeals} className="personal__tab">
                    <span>Обращения</span>
                    <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5303 5.46966C34.8232 5.76255 34.8232 6.23743 34.5303 6.53032L29.7574 11.3033C29.4645 11.5962 28.9896 11.5962 28.6967 11.3033C28.4038 11.0104 28.4038 10.5355 28.6967 10.2426L32.9393 5.99999L28.6967 1.75735C28.4038 1.46446 28.4038 0.989584 28.6967 0.69669C28.9896 0.403797 29.4645 0.403797 29.7574 0.69669L34.5303 5.46966ZM-2.21771e-07 5.25L34 5.24999L34 6.74999L2.21771e-07 6.75L-2.21771e-07 5.25Z"
                            fill="#242424"/>
                    </svg>
                </NavLink>
                <span className="personal__tab btn-exit">
                        <span>Выйти</span>
                    </span>
            </div>
            <div className="personal__nav-links">
                <a href="https://www.google.ru" target="_blank" className="personal__nav-link">
                    <img src={PersonalNavImg2} alt="" className="personal__nav-link-bg"/>
                    <p className="personal__nav-link-sub-title"/>
                    <p className="personal__nav-link-title">
                        Ваши фото
                    </p>
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfx4PFE0F-_RAD2bc4adoSe0zfppq0vysZ-43oe_sRBtmKT3A/viewform"
                   target="_blank" className="personal__nav-link">
                    <img src={PersonalNavImg3} alt="" className="personal__nav-link-bg"/>
                    <p className="personal__nav-link-title">
                        Форма на ретушь
                    </p>
                </a>
            </div>
        </nav>
    );
};

export default Menu;