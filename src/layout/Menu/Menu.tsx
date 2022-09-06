import React from 'react';
import { MenuItem } from './MenuItem';

interface Props {
    options: string[];
}

export const Menu = (props: Props) => {
 return (
     <ul>
         {props.options.map(item => <li><MenuItem name={item} /></li>)}
     </ul>
 )
}
