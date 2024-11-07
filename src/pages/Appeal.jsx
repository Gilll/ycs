import React, {useEffect, useState} from 'react';
import {useOutletContext, useParams} from "react-router";
import {routeNames} from "../router/routeNames";
import {Link, useSearchParams} from "react-router-dom";
import {useApi} from "../hooks/useAPI";
import PageIsLoading from "../components/PageIsLoading";
import Spinner from "../components/Spinner";
import Empty from "../components/Empty";

const Appeal = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [messagesCount, setMessagesCount] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [chatError, setChatError] = useState(false)

    const [getChatRoom] = useApi({
        url: '/ajax/OL1/ajax.php',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        formData: 'type=chat_history&CHAT_ID=' + searchParams.get("chat-id")
    })

    const [sendMessage, messageIsSending] = useApi({
        url: '/ajax/OL1/ajax.php',
        headers: 'remove',
        //formData: 'type=send_message&CHAT_ID=' + searchParams.get("chat-id") + '&MESSAGE=' + message
    })

    const updateMessages = () => {
        getChatRoom().then(resp => {
            if (resp.response === 'success') {
                if (resp.string !== '') {
                    let i = 0;
                    for (const k in resp.test) {
                        i++
                    }
                    if (i !== messagesCount) {
                        document.getElementById('chatRoom').innerHTML = resp.string
                        setMessagesCount(i)
                    }
                } else {
                    setChatError(true)
                }
            } else {
                setChatError(true)
            }
        }).catch(err => {
            console.log(err)
        }).then(() => {
            setPageIsLoading(false)
        })
    }

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        updateMessages()
        let intervalId = setInterval(() => {
            updateMessages()
        },3000)
        setMenuIsOpen(false)
        return () => {
            clearInterval(intervalId);
        };
    },[params])

    useEffect(() => {
        if (messagesCount > 0) {
            const roomREF = document.getElementById('chatRoom')
            roomREF.scrollTop = roomREF.scrollHeight;
        }
    },[messagesCount])

    const trySendMessage = () => {
        if (message.trim()) {
            let formData = new FormData();
            formData.append("type", "send_message");
            formData.append("CHAT_ID", searchParams.get("chat-id"));
            formData.append("MESSAGE", message);
            if (selectedFile) {
                formData.append("FILE", selectedFile);
            }
            sendMessage({ formData: formData }).then(resp => {
                const roomREF = document.getElementById('chatRoom')
                setMessage('')
                setSelectedFile(null)
                setMessagesCount(messagesCount + 1)
                let block = document.createElement('div');
                block.innerHTML = resp.message
                roomREF.append(block);
            }).catch(() => alert('Ошибка передачи данных'))
        }
    }

    return (
        <div className="personal__tab-content_box chat active">
            <Link to={routeNames.appeals} className="link request-back-link">
                <svg viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z"
                        fill="#242424"/>
                </svg>
                <span>Назад</span>
            </Link>
            <div className="personal__tab-header">
                <div className="personal__title-box">
                    <p className="personal__title title">
                        <span>обращения</span>
                    </p>
                </div>
                <span className="request-num">Заявка {params.id}</span>
            </div>
            <div className={"request-personal__content" + (pageIsLoading ? " isLoading" : "")}>
                 <PageIsLoading/>
                {chatError ? <Empty text="Чат с таким ID не найден"/> :
                    <div className="chat__container">
                        <div className="chat__msgs" id="chatRoom">
                            {messages.length > 0 && messages.map(mess =>
                                <div className="msg msg--outgoing">
                                    <div className="msg__container">
                                        <div className="msg__text">{mess.message.text}</div>
                                    </div>
                                    <div className="msg__time">{(new Date(mess.message.date).getHours()).toString().padStart(2, '0') + ':' + (new Date(mess.message.date).getMinutes()).toString().padStart(2, '0')}</div>
                                </div>
                            )}
                        </div>
                        <div className="chat__bottom">
                            <div className="chat__input">
                                <input type="text" name="MESSAGE" value={message} onChange={e => setMessage(e.target.value)} placeholder="Введите сообщение"/>
                                {selectedFile && <div className="file-info">{selectedFile.name} <span onClick={() => setSelectedFile(null)}>удалить</span></div>}
                            </div>
                            <div className="chat__btns">
                                <label className="chat__add-file">
                                    <input type="file" name="FILE" onChange={e => {
                                        setSelectedFile(e.target.files[0])
                                    }}/>
                                    <svg viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.8661 0.00430071C13.0841 0.0431422 12.3084 0.34698 11.6648 0.988116L0.826609 11.7854C0.171391 12.4381 -0.0677748 13.246 0.0161528 13.9986C0.100123 14.7512 0.482544 15.4482 1.02012 15.9837C1.55761 16.5193 2.2573 16.9002 3.01274 16.9839C3.76825 17.0676 4.57917 16.8292 5.23435 16.1766L14.5243 6.92186C15.4103 6.0391 15.3449 4.89067 14.7178 4.26593C14.0908 3.64127 12.9379 3.57599 12.0518 4.45871L5.85864 10.6284L6.39571 11.1635L12.589 4.9937C13.2512 4.33395 13.8402 4.46152 14.1808 4.80084C14.5215 5.1402 14.6496 5.72698 13.9872 6.38674L4.69741 15.6414C4.19139 16.1455 3.64757 16.2929 3.0967 16.2319C2.5458 16.171 1.98738 15.8771 1.55719 15.4487C1.12704 15.0201 0.832179 14.4637 0.770995 13.915C0.709811 13.3661 0.857665 12.8244 1.36368 12.3203L12.2019 1.52315C12.8921 0.835524 13.6861 0.657081 14.5192 0.797188C15.3524 0.937336 16.2124 1.42605 16.8904 2.10157C17.5685 2.77701 18.0591 3.63379 18.1997 4.46379C18.3404 5.29384 18.1613 6.08471 17.471 6.77242L8.18118 16.0271L8.71817 16.5621L18.0081 7.30733C18.8662 6.45253 19.1225 5.36358 18.9486 4.33781C18.7749 3.31205 18.201 2.3371 17.4275 1.56653C16.654 0.795926 15.6754 0.224318 14.6457 0.0511291C14.3883 0.00783185 14.1269 -0.00864644 13.8662 0.00430071H13.8661Z"
                                            fill="#242424"/>
                                    </svg>
                                </label>
                                <button className="chat__send chat-send__ajax"
                                        data-chat="chatb54181208377bf6b5707536225a61472d2ddea18f00665ce8623e36bd4e3c7c5" onClick={trySendMessage}>
                                    {messageIsSending ? <Spinner/> :
                                        <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18.7033 0.298057C18.5645 0.159317 18.3886 0.0636461 18.1967 0.0225611C18.0048 -0.0185239 17.8052 -0.0032711 17.6218 0.0664833L0.655874 6.48821H0.652481C0.456862 6.56345 0.289238 6.69724 0.172502 6.87131C0.0557659 7.04539 -0.00439032 7.25126 0.000249567 7.4608C0.00488946 7.67034 0.0740992 7.87335 0.198426 8.04208C0.322753 8.21082 0.496135 8.33706 0.694893 8.40357L0.712282 8.40908L6.53539 10.8957C6.64897 10.9302 6.7696 10.9343 6.88525 10.9076C7.0009 10.8809 7.10752 10.8243 7.19447 10.7435L16.5403 2.03486C16.5681 2.00701 16.6012 1.98492 16.6376 1.96985C16.674 1.95478 16.713 1.94702 16.7523 1.94702C16.7917 1.94702 16.8307 1.95478 16.8671 1.96985C16.9035 1.98492 16.9366 2.00701 16.9644 2.03486C16.9922 2.06271 17.0143 2.09577 17.0294 2.13216C17.0445 2.16854 17.0522 2.20754 17.0522 2.24693C17.0522 2.28631 17.0445 2.32531 17.0294 2.36169C17.0143 2.39808 16.9922 2.43114 16.9644 2.45899L8.25561 11.8008C8.1748 11.8878 8.11822 11.9944 8.0915 12.1101C8.06478 12.2257 8.06887 12.3463 8.10335 12.4599L10.5908 18.2866C10.5933 18.2951 10.5959 18.3027 10.5988 18.3108C10.7346 18.7039 11.0781 18.9813 11.4933 19H11.5357C11.7453 19.0012 11.9505 18.9393 12.1244 18.8223C12.2984 18.7054 12.4331 18.5388 12.5112 18.3443L18.9319 1.38255C19.0026 1.19902 19.0187 0.998928 18.9781 0.806464C18.9375 0.614 18.8421 0.437412 18.7033 0.298057Z"
                                                fill="#242424"/>
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Appeal;