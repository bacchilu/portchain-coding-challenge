import React from 'react';

export const Spinner: React.FC<{msg: string}> = function ({msg}) {
    return (
        <>
            <div className="spinner-grow" role="status" />
            <p>
                <em>{msg}</em>
            </p>
        </>
    );
};
