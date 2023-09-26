import React from 'react';

export const ErrorAlert: React.FC<{msg: string}> = function ({msg}) {
    return (
        <div className="alert alert-danger" role="alert">
            <p>
                <strong>Error fetching the data</strong>
            </p>
            <hr />
            <p>{msg}</p>
        </div>
    );
};
