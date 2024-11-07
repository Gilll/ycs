import React, {useState} from 'react';
import Menu from "./Menu";
import {Outlet} from "react-router";

const PageWrapper = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(true)

    return (
        <div className="App">
            <section className="personal">
                <div className={"container personal__container" + (menuIsOpen ? " active" : "")}>
                    <Menu setIsOpen={setMenuIsOpen}/>
                    <div className="personal__content">
                        <Outlet context={[menuIsOpen, setMenuIsOpen]}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageWrapper;