import './ResumeHeader.scss';
import * as resume from '../../assets/resume.json';
import React from 'react';
import {Box, Typography} from '@material-ui/core';
import usePageSpacing from '../../common/spacing/usePageSpacing';

function ResumeHeader() {
    const header = resume.basics;
    const name = header.name;
    const jobTitle = header.label;
    const email = header.email;
    const mailto = `mailto:${email}`;
    const location = `${header.location.city} / ${header.location.countryCode}`;
    const website = `${header.url}`;

    const padding = usePageSpacing();

    return (
        <Box component="header"
             px={padding}
             className="ResumeHeader">
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
