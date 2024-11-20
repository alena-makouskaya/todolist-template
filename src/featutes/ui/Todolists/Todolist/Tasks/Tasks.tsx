// @flow 
import * as React from 'react';
import { Task } from './Task/Task';
type Props = {
    
};
export const Tasks = (props: Props) => {
    return (
        <div className='tasks'>
            <Task />
            <Task />
            <Task />
            <Task />
            
        </div>
    );
};