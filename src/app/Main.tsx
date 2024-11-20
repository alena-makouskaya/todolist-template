// @flow 
import * as React from 'react';
import { Todolists } from '../featutes/ui/Todolists/Todolists';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
type Props = {
    
};
export const Main = (props: Props) => {
    return (
        <div className='main'>
            <AddItemForm />
            <Todolists />
            
        </div>
    );
};