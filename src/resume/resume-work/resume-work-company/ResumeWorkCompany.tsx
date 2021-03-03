import React from 'react';
import ResumeWorkRole from '../resume-work-role/ResumeWorkRole';
import {ResumeWorkHistoryCompany} from '../ResumeWorkHistoryCompany';
import './ResumeWorkCompany.scss';
import {Typography} from '@material-ui/core';

function ResumeWorkCompany(props: { item: ResumeWorkHistoryCompany }) {
    return <div className="ResumeWorkCompany">
        <Typography variant="subtitle1">{props.item.name}</Typography>
        <div className="ResumeWorkCompany_roles">
            {
                props.item.roles.map((role, index) =>
                    <ResumeWorkRole key={index} role={role}/>)
            }
        </div>
    </div>;
}

export default ResumeWorkCompany;
