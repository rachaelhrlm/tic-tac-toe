import React, { FunctionComponent } from 'react';
import { BiRadioCircle, BiX } from 'react-icons/bi';

export const IconDisplay: FunctionComponent = () => {
    return (
        <div className="flex text-4xl sm:text-5xl">
            <BiX className="text-cyan-500" viewBox="0 0 20 20" strokeWidth={2} />
            <BiRadioCircle viewBox="0 0 20 20" className="text-yellow-500" strokeWidth={2} />
        </div>
    );
};
