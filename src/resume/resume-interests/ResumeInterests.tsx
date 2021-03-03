import './ResumeInterests.scss';
import * as resume from '../../assets/resume.json';
import React from 'react';
import {Typography} from '@material-ui/core';

function ResumeInterests() {
    const interests = resume.interests;

    return <section className="ResumeInterests">
        {
            interests.map((interest, index) =>
                <div key={index} className="ResumeProjects_Interest">
                    <Typography variant="h3">{interest.name}</Typography>
                    <Typography gutterBottom={true}>{interest.keywords}</Typography>
                </div>
            )
        }
    </section>;
}

export default ResumeInterests;
