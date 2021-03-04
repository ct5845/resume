import './ResumeNavigation.scss';
import {Box, Button} from '@material-ui/core';
import {Link, useLocation} from 'react-router-dom';
import React from 'react';
import {useMedia} from '../../common/media/useMedia';

function getButtonColor(mediaIsMedium: boolean, mediaIsLarge: boolean, pathnameMatches: boolean) {
    return !mediaIsMedium || pathnameMatches && !mediaIsLarge ? 'primary' : 'default';
}

function ResumeNavigation() {
    const location = useLocation();
    const media = useMedia();

    const routesAndLabels = [
        {route: '/summary', label: 'Summary'},
        {route: '/skills', label: 'Skills'},
        {route: '/work', label: 'Work History'},
        {route: '/education', label: 'Education'},
        {route: '/projects', label: 'Projects'},
        {route: '/interests', label: 'Interests'}
    ];

    if (media.medium) {
        routesAndLabels.splice(0, 0, {route: '/', label: 'Home'});
    }

    const links = routesAndLabels
        .map((routeAndLabel, index) => {
            return <Button
                key={index}
                className="ResumeNavigation_Button"
                component={Link}
                to={routeAndLabel.route}
                variant="outlined"
                color={getButtonColor(!!media.medium, !!media.large,location.pathname === routeAndLabel.route)}>{routeAndLabel.label}</Button>;
        });

    return <Box component="nav" className="ResumeNavigation">
        {links}
    </Box>;
}

export default ResumeNavigation;
