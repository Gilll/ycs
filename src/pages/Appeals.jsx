import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {routeNames} from "../router/routeNames";
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import {useOutletContext} from "react-router";

const Appeals = () => {
    const [appeals, setAppeals] = useState([])
    const [getAppeals, appealsIsLoading] = useApi({
        url: '/ajax/profile/api/chat.php',
        method: 'GET'
    })
    useEffect(() => {
        getAppeals().then(resp => {
            console.log(resp)
            setAppeals(resp)
        }).catch(err => {
            console.log(err)
        })
    },[])

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    return (
        <div className="personal__tab-content_box request active">
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
                        <span>обращения</span>
                    </p>
                </div>
            </div>
            <div className="request-personal__content">
                <Link to={routeNames.appealCrete} className="request__new-request-link link">
                    <span>создать обращение</span>
                </Link>
                {appealsIsLoading ? <PageIsLoading/> :
                    <ul className="request_list">
                        {(appeals && appeals.length) && appeals.map(appeal =>
                            <li className="request_item">
                                <div className="request_item__table">
                                    <div className="request_item__table_item">
                                        <p>№ заявки<span className="colon">:</span></p>
                                        <p className="req_num">{appeal.PROPERTY_REQUEST_NUM_VALUE}</p>
                                    </div>

                                    <div className="request_item__table_item">
                                        <p>№ заказа<span className="colon">:</span></p>
                                        <p>{appeal.PROPERTY_ORDER_ID_VALUE || ' '}</p>
                                    </div>
                                    <div className="request_item__table_item">
                                        <p>дата<span className="colon">:</span></p>
                                        <p>{appeal.PROPERTY_DATE_VALUE}</p>
                                    </div>

                                    <div className="request_item__table_item">
                                        <p>проблема<span className="colon">:</span></p>
                                        <p>{appeal.PROPERTY_SUBJECT_NAME || ' '}</p>
                                    </div>

                                    <div className="request_item__table_item">
                                        <p>статус<span className="colon">:</span></p>
                                        <p>{appeal.PROPERTY_STATUS_VALUE || ' '}</p>
                                    </div>
                                </div>

                                <Link to={routeNames.appeal + '/' + appeal.ID + '?chat-id=' + appeal.PROPERTY_CHAT_ID_VALUE} className="request_item__chat-link link">
                                    <span>перейти в чат</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                }
            </div>
        </div>
    );
};

export default Appeals;