import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {routeNames} from "../router/routeNames";
import Dropdown from "../components/Dropdown";
import {useApi} from "../hooks/useAPI";
import {AutoComplete} from "primereact/autocomplete";
import {useNavigate, useOutletContext} from "react-router";
import Spinner from "../components/Spinner";

const CreateAnAppeal = () => {
    const [step, setStep] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubCat, setSelectedSubCat] = useState('')
    const [subCatList, setSubCatList] = useState([])
    const [orders, setOrders] = useState([])
    const [ordersFiltered, setOrdersFiltered] = useState([])
    const [orderSel, setOrderSel] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [categoryErr, setCategoryErr] = useState('')
    const [subCatErr, setSubCatErr] = useState('')
    const [orderIdErr, setOrderIdErr] = useState('')

    const navigate = useNavigate();

    const [getOrders] = useApi({
        url: '/ajax/profile/api/orders.php',
        method: 'GET'
    })

    const [getProblems, problemsIsLoading] = useApi({
        url: '/ajax/profile/problems.php',
        rawResp: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        formData: 'SECTION=' + selectedCategory
    })

    const [createDialog, dialogIsLoading] = useApi({
        url: '/ajax/OL1/ajax.php',
        headers: 'remove',
        //formData: 'type=send_message&USER_ID=1&ORDER_ID=' + orderSel + '&SUBJECT=' + selectedSubCat + '&CHAT_FILE=' + selectedFile
    })

    const [menuIsOpen, setMenuIsOpen] = useOutletContext();

    useEffect(() => {
        getOrders().then(resp => {
            setOrders(resp.order)
            console.log(resp.order)
        }).catch(err => {
            console.log(err)
        })
        setMenuIsOpen(false)
    },[])

    const search = (event) => {
        setOrdersFiltered(orders.filter(item => item.ID.includes(event.query)).map(el => {
            return (el.ID + ' ' + el.UF_ORDER_TYPE + ' ' + el.UF_MODEL_DATE)
        }));
    }

    const tryCreate = () => {
        let formData = new FormData();
        formData.append("type", "send_message");
        formData.append("ORDER_ID", orderSel);
        formData.append("USER_ID", '1');
        formData.append("SUBJECT", selectedSubCat ? selectedSubCat : selectedCategory);
        if (selectedFile) {
            formData.append("CHAT_FILE", selectedFile);
        }
        createDialog({ formData: formData }).then(resp => {
            let url = routeNames.appeal + '/new?chat-id=' + resp.chat;
            navigate(url)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="personal__tab-content_box request-create active">
            <Link to={routeNames.appeals} className="link request-back-link">
                <svg viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.469669 5.46966C0.176777 5.76255 0.176777 6.23743 0.469669 6.53032L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 5.99999L6.3033 1.75735C6.5962 1.46446 6.5962 0.989584 6.3033 0.69669C6.01041 0.403797 5.53554 0.403797 5.24264 0.69669L0.469669 5.46966ZM35 5.25L1 5.24999L1 6.74999L35 6.75L35 5.25Z"
                        fill="#242424"/>
                </svg>
                <span>Назад</span>
            </Link>
            <div className="request-create_progress">
                <div className={step ? "progress-line step2" : "progress-line"}/>
                <div className="progress-numbers">
                    <span className={step ? "complete" : ""}>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </div>
            <div className="personal__tab-header">
                <div className="personal__title-box">
                    <p className="personal__title title">
                        <span>создание обращения</span>
                    </p>
                </div>
            </div>
            {step === 0 &&
            <div className="request-personal__content request-create__step-1 active">
                <Dropdown isOpen={true} list={[
                    { value: 47, title: 'Доставка' },
                    { value: 48, title: 'Оплата' },
                    { value: 49, title: 'Съемка' },
                    { value: 50, title: 'Ретушь' },
                    { value: 51, title: 'Книга жалоб и предложений' },
                ]} onChange={(val) => {
                    setSelectedCategory(val)
                    setCategoryErr('')
                }}/>
                {categoryErr && <div className="category-error">
                    {categoryErr}
                </div>}
                <span className="request__create-request-link link load__problems" onClick={() => {
                    if (selectedCategory) {
                        getProblems().then(resp => {
                            let arr1 = resp.split('"'),
                                arr2 = resp.split('>'),
                                result = []
                            arr2.map((el, index) => {
                                let tt = el.split('<')[0]
                                if (tt) {
                                    result.push({ value: arr1[index], title: tt })
                                }
                            })
                            setSubCatList(result)
                            console.log('---sub-cat---')
                            console.log(result)
                        }).catch(err => {
                            console.log(err)
                            setCategoryErr('Ошибка при получении данных с сервера')
                        })
                        setStep(1)
                    } else {
                        setCategoryErr('Необходимо выбрать категорию')
                    }
                }}>
                    <span>создать</span>
                </span>
            </div>
            }
            {step === 1 &&
            <div className="request-personal__content request-create__step-2 active">
                <div className="request-create_order-num">
                    <div className="request-create_order-num__desc">Введите номер заказа</div>
                    <div className="request-create_order-num__input">
                        <AutoComplete value={orderSel} suggestions={ordersFiltered} completeMethod={search} onChange={(e) => {
                            console.log(e.value)
                            setOrderSel(e.value.toString().split(" ")[0])
                            setOrderIdErr('')
                        }} />
                    </div>
                    {orderIdErr && <div className="order-id-error">{orderIdErr}</div>}
                </div>
                <Dropdown isOpen={true} list={subCatList} isLoading={problemsIsLoading} onChange={(val) => {
                    setSelectedSubCat(val)
                    setSubCatErr('')
                }}/>
                {subCatErr && <div className="sub-category-error">{subCatErr}</div>}
                <div className="request-create_add-pic">
                    <div className="request-create_add-pic__desc">Загрузите фото (при желании)</div>
                    <label className="add-file-input">
                        <input type="file" name="CHAT_FILE" onChange={e => {
                            setSelectedFile(e.target.files[0])
                        }}/>
                        <span>{selectedFile ? selectedFile.name : 'загрузить'}</span>
                    </label>
                </div>
                <span className="request__request-next-link link create-chat" data-user="1" onClick={() => {
                    if (orderSel.trim() === '') {
                        setOrderIdErr('Необходимо выбрать ID заказа')
                    } else {
                        if (orders.filter(item => item.ID === orderSel.trim()).length === 0) {
                            setOrderIdErr('В списке ваших заказов нет заказа с данным ID')
                        } else {
                            if (subCatList.length > 0) {
                                if (selectedSubCat) {
                                    tryCreate()
                                } else {
                                    setSubCatErr('Небходимо выбрать категорию')
                                }
                            } else {
                                tryCreate()
                            }
                        }
                    }
                }}>
                    {dialogIsLoading && <Spinner/>}
                    <span>далее</span>
                </span>
            </div>
            }
        </div>
    );
}

export default CreateAnAppeal;