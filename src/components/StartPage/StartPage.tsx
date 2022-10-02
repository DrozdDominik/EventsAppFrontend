import React from "react";
import {Header} from "../../layout/Header/Header";
import {Menu} from "../../layout/Menu/Menu";

export const StartPage = () => {
    return (
        <>
            <Header name={"strona główna"} />
            <main>
                <p>Witamy w aplikacji pozwalającej sprawdzić wydarzenia w Twojej okolicy!</p>
                <p>Możesz przeglądać listę wydarzeń bez rejestracji.</p>
                <p>Poznanie szczegółów danego wydarzenia wymaga utworzenia darmowego konta użytkownika.</p>
                <p>W celu uzyskania możliwości dodawania wydarzeń do aplikacji należy skontaktować się z administratorem w celu rozszerzenia uprawnień konta.</p>
            </main>
            <div>
                <Menu options={['logowanie', 'rejestracja']}/>
            </div>
        </>
    )
}