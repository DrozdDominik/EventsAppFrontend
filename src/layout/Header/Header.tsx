import React from 'react';
import './Header.css';

interface Props {
    name: string;
}

export const Header = (props: Props) => {
    return (
        <header className={"title"}>Wydarzenia w Twojej okolicy - {props.name}</header>
    )
}