import {Route, Switch} from 'react-router-dom';
import {routes} from '../../resume/routes';
import React from 'react';
import {CTMedia} from '../../common/media/media-queries';
import {useMediaQuery} from '@material-ui/core';
import ResumeAll from '../../resume/resume-all/ResumeAll';

function AppRoute() {
    const isLargeScreen = CTMedia.isLarge(useMediaQuery);

    return <Switch>
        {
            !isLargeScreen &&
            routes.map((route, index) =>
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            )}
        {
            isLargeScreen &&
            <>
                <Route
                    path={'/'}
                    exact={true}
                    component={ResumeAll}/>
                <Route
                    path={'/:section'}
                    component={ResumeAll}/>
            </>
        }
    </Switch>;
}

export default AppRoute;
