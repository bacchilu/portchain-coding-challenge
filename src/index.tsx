import React from 'react';
import {createRoot} from 'react-dom/client';

import {ErrorAlert} from './app/components/error_alert';
import {Spinner} from './app/components/spinner';
import {StatisticsTable} from './app/components/statistics_table';
import {useData} from './app/hooks';

const App = function () {
    const {data, info, error} = useData();

    if (error !== null) return <ErrorAlert msg={error} />;
    if (data === undefined) return <Spinner msg={info} />;
    return <StatisticsTable schedules={data} />;
};

createRoot(document.getElementById('app')!).render(<App />);
