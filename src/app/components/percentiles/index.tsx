import React from 'react';

import {PortDetail} from '../../types';
import {humanizeTimedelta} from '../../utils';
import {evalPercentiles} from './utils';

export const Percentiles: React.FC<{portDetail: PortDetail}> = function ({portDetail}) {
    const data = evalPercentiles(portDetail);
    if (data === null) return null;
    return (
        <>
            <strong>5°</strong>: <em>{humanizeTimedelta(data.p_05)}</em>
            <br />
            <strong>20°</strong>: <em>{humanizeTimedelta(data.p_20)}</em>
            <br />
            <strong>50°</strong>: <em>{humanizeTimedelta(data.p_50)}</em>
            <br />
            <strong>75°</strong>: <em>{humanizeTimedelta(data.p_75)}</em>
            <br />
            <strong>90°</strong>: <em>{humanizeTimedelta(data.p_90)}</em>
        </>
    );
};
