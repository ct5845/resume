import './ResumeProjects.scss';
import * as resume from '../../assets/resume.json';
import React from 'react';
import {Typography} from '@material-ui/core';

function ResumeProjects() {
    const projects = resume.projects;

    return <section className="ResumeProjects">
        {
            projects.map((project, index) =>
                <div key={index} className="ResumeProjects_Project">
                    <Typography variant="h3">{project.name}</Typography>
                    <a href={project.url}>{project.url}</a>
                    <Typography gutterBottom={true}>{project.description}</Typography>
                </div>
            )
        }
    </section>;
}

export default ResumeProjects;
