import './ResumeSkills.scss';
import List from '../../common/list/List';
import React from 'react';
import * as resume from '../../assets/resume.json';
import {Typography, useMediaQuery} from '@material-ui/core';
import {CTMedia} from '../../common/media/media-queries';


function ListItems(keywords: string[]): JSX.Element[] {
    return keywords.map((word, index) =>
        <li key={index}>
            <Typography>{word}</Typography>
        </li>);
}

function ListHeader(skill: { name: string }): JSX.Element {
    return <Typography variant="h3">{skill.name}</Typography>;
}

function GenerateList(skills: { name: string, keywords: string[] }[],
                      twoColumns = false) {
    return skills.map((skill, index) => (
        <List
            key={index}
            twoColumns={twoColumns}
            header={ListHeader(skill)}
            items={ListItems(skill.keywords)}
        />
    ));
}

function ResumeSkills() {
    const media = CTMedia.is(useMediaQuery);
    const skills = resume.skills;

    return (
        <div className="ResumeSkills_lists">
            {
                GenerateList(skills, media.small && !media.print)
            }
        </div>
    );
}

export default ResumeSkills;
