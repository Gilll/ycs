import React from 'react';
import PersonalData from "../pages/PersonalData";
import {routeNames} from "./routeNames";
import {Route, Routes} from "react-router";
import PageWrapper from "../components/pageWrapper";
import Orders from "../pages/Orders";
import Favorites from "../pages/Favorites";
import Notifications from "../pages/Notifications";
import Appeals from "../pages/Appeals";
import CreateAnAppeal from "../pages/CreateAnAppeal";
import Appeal from "../pages/Appeal";
import Page404 from "../pages/Page404";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={routeNames.preRoute} element={<PageWrapper/>}>
                <Route path={routeNames.personalData} element={<PersonalData/>}/>
                <Route path={routeNames.myOrders} element={<Orders/>}/>
                <Route path={routeNames.favorites} element={<Favorites/>}/>
                <Route path={routeNames.notifications} element={<Notifications/>}/>
                <Route path={routeNames.appeals} element={<Appeals/>}/>
                <Route path={routeNames.appeal + '/:id'} element={<Appeal/>}/>
                <Route path={routeNames.appealCrete} element={<CreateAnAppeal/>}/>
                <Route path="*" element={<Page404/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;