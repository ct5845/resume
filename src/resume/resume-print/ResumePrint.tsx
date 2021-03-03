import './ResumePrint.scss';
import ResumeHeader from '../resume-header/ResumeHeader';
import ResumePersonalStatement from '../resume-personal-statement/ResumePersonalStatement';
import ResumeSkills from '../resume-skills/ResumeSkills';
import ResumeWork from '../resume-work/ResumeWork';
import ResumeEducation from '../resume-education/ResumeEducation';
import ResumeProjects from '../resume-projects/ResumeProjects';
import ResumeInterests from '../resume-interests/ResumeInterests';
import React from 'react';
import ResumeContent from '../resume-content/ResumeContent';

function ResumePrint() {
    return <section className="ResumePrint">
        <ResumeHeader/>
        <ResumeContent title="Summary"><ResumePersonalStatement/></ResumeContent>
        <ResumeContent title="Skills"><ResumeSkills/></ResumeContent>
        <ResumeContent title="Work History"><ResumeWork/></ResumeContent>
        <ResumeContent title="Education"><ResumeEducation/></ResumeContent>
        <ResumeContent title="Projects"><ResumeProjects/></ResumeContent>
        <ResumeContent title="Interests"><ResumeInterests/></ResumeContent>
    </section>;
}

export default ResumePrint;
