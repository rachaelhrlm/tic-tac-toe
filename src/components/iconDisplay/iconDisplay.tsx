import React, { FunctionComponent } from 'react';
import { BiRadioCircle, BiX } from 'react-icons/bi';

export const IconDisplay: FunctionComponent = () => {
    return (
        <div className="flex">
            <BiX className="text-cyan-500" viewBox="0 0 20 20" size={40} strokeWidth={2} />
            <BiRadioCircle viewBox="0 0 20 20" className="text-pink-500" size={40} strokeWidth={2} />
        </div>
    );
};
