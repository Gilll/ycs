import React, {useEffect} from 'react';
import {useOutletContext} from "react-router";

const Page404 = () => {
    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        setMenuIsOpen(false)
    },[])
    return (
        <div>
            <section className="error-fo">
                <div className="error-fo__bg">
                    <img src="../assets/img/404.png" alt=""/>
                </div>
                <div className="error-fo__bg-mobile">
                    <img src="../assets/img/404mob.png" alt=""/>
                </div>
                <div className="container">
                    <div className="error-fo__block">
                        <div className="error-fo__title">
                            <span>уПС!</span>
                            <strong>оШИБКА 404</strong>
                        </div>
                        <div className="error-fo__text">
                            кАЖЕТСЯ, ТАКОЙ СТРАНИЦЫ<br/> НЕ СУЩЕСТВУЕТ
                        </div>
                        <a href="/" className="link"><span>пЕРЕЙТИ НА ГЛАВНУЮ</span></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page404;