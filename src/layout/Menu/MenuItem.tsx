import React from 'react';

interface Props {
    name: string;
}

export const MenuItem = (props: Props) => {
    return (
        <a href={`/${props.name}`}>{props.name}</a>
    )
}