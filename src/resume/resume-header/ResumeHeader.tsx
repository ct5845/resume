import './ResumeHeader.scss';
import * as resume from '../../assets/resume.json';
import React from 'react';
import {Box, Typography, useMediaQuery} from '@material-ui/core';
import {MediaBreakpoints} from '../../app/app-themes/MediaBreakpoints';
import pageSpacing from '../../common/spacing/page-spacing';

function ResumeHeader() {
    const header = resume.basics;
    const name = header.name;
    const jobTitle = header.label;
    const email = header.email;
    const mailto = `mailto:${email}`;
    const location = `${header.location.city} / ${header.location.countryCode}`;
    const website = `${header.url}`;

    const mediaIsMedium = useMediaQuery(`(min-width:${MediaBreakpoints.Medium}px)`, {noSsr: true});
    const padding = pageSpacing(useMediaQuery);

    return (
        <Box component="header"
             px={padding}
             className={`ResumeHeader${mediaIsMedium ? ' mediaMedium' : ''}`}>
            <div className="ResumeHeader_title">
                <Typography variant="h1">{name}</Typography>
                <Typography variant="h2">{jobTitle}</Typography>
            </div>
            <div className="ResumeHeader_contact">
                <a href={mailto}>{email}</a>
                <a href={website}>{website}</a>
                <span>{location}</span>
            </div>
        </Box>
    );
}

export default ResumeHeader;
