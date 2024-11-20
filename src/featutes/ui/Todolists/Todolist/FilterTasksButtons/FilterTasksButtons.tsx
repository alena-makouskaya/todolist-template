// @flow 
import * as React from 'react';
type Props = {
    
};
export const FilterTasksButtons = (props: Props) => {
    return (
        <div className='filterTasksButtons'>
            <button className='isActive'>All</button>
            <button>Active</button>
            <button>Completed</button>
            
        </div>
    );
};