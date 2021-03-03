import React from 'react';
import './ResumeEducation.scss';
import * as resume from '../../assets/resume.json';
import List from '../../common/list/List';
import {ResumeEducationHistoryAward, ResumeEducationHistoryInstitution} from './ResumeEducationHistoryInstitution';
import Header3AndSecondaryText from '../../common/header3-and-secondary-text/Header3AndSecondaryText';
import {Typography} from '@material-ui/core';

function ResumeEducationInstitutionHeader(institution: ResumeEducationHistoryInstitution) {
    return <Header3AndSecondaryText
        date={`${institution.startDate} - ${institution.endDate}`}
        header={institution.name}
    />
}

function ResumeEducationInstitutionAwards(awards: ResumeEducationHistoryAward[]) {
    return awards.map((award, index) =>
        <li key={index}>
            <Typography><strong>{ !award.hideScore ? award.score : '' } {award.studyType}</strong>
            &nbsp;
            { award.courses.map((course, index) =>
                <span className="ResumeEducation_AwardName" key={index}>{course}</span>
            )}
            </Typography>
        </li>
    )
}

function ResumeEducation() {
    let institutions: ResumeEducationHistoryInstitution[] = [];

    resume.education.forEach(item => {
        const award = {
            studyType: item.studyType,
            score: item.score,
            hideScore: item.hideScore,
            courses: item.courses
        }
        let institution = institutions.find(insti => insti.name === item.institution);

        if (!institution) {
            institution = {
                name: item.institution,
                startDate: item.startDate,
                endDate: item.endDate,
                awards: []
            }
            institutions.push(institution);
        } else {
            if (item.startDate < institution.startDate) {
                institution.startDate = item.startDate;
            }
        }

        institution.awards.push(award);
    });

    return (
        <section className="ResumeEducation">
            {
                institutions.map((institution, index) =>
                    <List
                        key={index}
                        hideBullets={true}
                        header={ResumeEducationInstitutionHeader(institution)}
                        items={ResumeEducationInstitutionAwards(institution.awards)}
                    />)
            }
        </section>
    );
}

export default ResumeEducation;
