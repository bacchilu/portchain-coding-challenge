import React from 'react';

import {Schedule} from '../../types';
import {Percentiles} from '../percentiles';
import {evalExtremeValues, getPortCallsLength, getPortsDetails} from './utils';

export const StatisticsTable: React.FC<{schedules: Schedule[]}> = function ({schedules}) {
    const ports = getPortsDetails(schedules);

    const {top, bottom} = evalExtremeValues(ports, 5);
    const rows = Array.from(ports).map(([id, portDetail]) => {
        const length = getPortCallsLength(portDetail);
        let cls = '';
        if (top.includes(length)) cls = 'table-success';
        if (bottom.includes(length)) cls = 'table-danger';
        return (
            <tr key={id} className={cls}>
                <th scope="row">{id}</th>
                <td>{portDetail.name}</td>
                <td>{length}</td>
                <td>
                    <Percentiles portDetail={portDetail} />
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Port Calls</th>
                        <th scope="col">Percentiles</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
};
