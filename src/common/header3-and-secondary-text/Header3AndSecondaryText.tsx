import React from 'react';
import './Header3AndSecondaryText.scss';
import {Typography} from '@material-ui/core';

function Header3AndSecondaryText(props: { date: string, header: string }) {
    return <header className="DateWithHeader">
        <Typography variant="h3">{props.header}</Typography>
        <Typography variant="body2">{props.date}</Typography>
    </header>;
}

export default Header3AndSecondaryText;
