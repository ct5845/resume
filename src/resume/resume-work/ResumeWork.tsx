import './ResumeWork.scss';
import * as resume from '../../assets/resume.json';
import {ResumeWorkHistoryCompany} from './ResumeWorkHistoryCompany';
import {ResumeWorkHistoryRole} from './ResumeWorkHistoryRole';
import ResumeWorkCompany from './resume-work-company/ResumeWorkCompany';

function ResumeWork() {
    const workHistory: ResumeWorkHistoryCompany[] = [];

    resume.work.forEach(item => {
        const role: ResumeWorkHistoryRole = {
            name: item.position,
            startDate: item.startDate,
            endDate: item.endDate,
            achievements: item.highlights
        };

        let company = workHistory.find(wh => wh.name === item.name);

        if (!company) {
            company = {
                id: item.id,
                name: item.name,
                roles: []
            };
            workHistory.push(company);
        }

        company.roles.push(role);
    });

    return (
        <section className="ResumeWork">
            {
                workHistory.map((wh, index) =>
                    <ResumeWorkCompany key={index} item={wh}/>)
            }
        </section>
    );
}

export default ResumeWork;
