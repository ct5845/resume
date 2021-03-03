import React from 'react';
import './App.scss';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {routes} from '../resume/routes';
import {useMediaQuery} from '@material-ui/core';
import {CTMedia} from '../common/media/media-queries';
import ResumeHome from '../resume/resume-home/ResumeHome';
import AppRoute from './app-route/AppRoute';
import ResumePrint from '../resume/resume-print/ResumePrint';

function App() {
    const media = CTMedia.is(useMediaQuery);
    const showFooter = !media.medium && !media.print;
    const showHeader = !media.print;

    const classes = [
        media.tiny ? 'mediaIsTiny' : null,
        media.small ? 'mediaIsSmall' : null,
        media.medium ? 'mediaIsMedium' : null,
        media.large ? 'mediaIsLarge' : null,
        media.highDef ? 'mediaIsHighDef' : null,
        media.print ? 'mediaIsPrint' : null
    ]
        .filter(is => !!is)
        .join(' ');

    const smallScreenRoutes = <AppRoute/>;

    const mediumScreenRouterWrapper = <ResumeHome>
        {smallScreenRoutes}
    </ResumeHome>;

    const header = <Switch>
        {routes.map((route, index) =>
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={route.header}
            />
        )}
    </Switch>;

    const content =
        media.print ? <ResumePrint/> :
            media.medium ? mediumScreenRouterWrapper :
                smallScreenRoutes;

    const footer = <Switch>
        {routes.map((route, index) =>
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={route.footer}
            />
        )}
    </Switch>;

    return (
        <HashRouter>
            <div className={`App ${classes}`}>
                {showHeader && header}
                <main className="App_main">
                    {content}
                </main>
                {showFooter && footer}
            </div>
        </HashRouter>
    );
}

export default App;
