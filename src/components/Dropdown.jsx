import React, {useEffect, useState} from 'react';
import Spinner from "./Spinner";

const Dropdown = ({list, isOpen, onChange, isLoading}) => {
    const [selectedValue, setSelectedValue] = useState('')
    const [isDDOpen, setIsDDOpen] = useState(!!isOpen)

    useEffect(() => {
        if (list.length === 1) {
            setSelectedValue(list[0].value)
        }
    },[])

    return (
        <>
            {(!isLoading && list.length !== 0) && <div className={"request-create_dropdown" + (isDDOpen ? " open" : "")}>
                <span className="request-create_dropdown__desc">Выберите категорию проблемы из списка</span>
                <div className="request-create_dropdown__title">
                    <span onClick={() => setIsDDOpen(!isDDOpen)}>Проблемы</span>
                    <svg onClick={() => setIsDDOpen(!isDDOpen)} viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8L7.5 2L14 8" stroke="#242424" strokeWidth="2"/>
                    </svg>
                </div>
                {isLoading ? <Spinner/> :
                    <div className="request-create_dropdown__list">
                        {list.map(el =>
                            <div className={selectedValue === el.value ? "active" : ""} onClick={() => {
                                setSelectedValue(el.value)
                                onChange(el.value)
                            }}>{el.title}</div>
                        )}
                    </div>
                }
            </div>}
        </>
    );
};

export default Dropdown;