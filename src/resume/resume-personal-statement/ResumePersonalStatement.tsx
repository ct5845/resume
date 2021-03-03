import './ResumePersonalStatement.scss';
import * as resume from '../../assets/resume.json';
import React from 'react';
import {Typography} from '@material-ui/core';

function ResumePersonalStatement() {
    const personal = resume.basics.summary;

    return (
        <Typography
            className="ResumePersonalStatement_p">{personal}</Typography>
    );
}

export default ResumePersonalStatement;
