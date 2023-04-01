import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let title = 'Wystąpił błąd!';
  let message = 'Przepraszamy, coś poszło nie tak...';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404: {
        title = 'Nie znaleziono!';
        message = 'Nie ma takiej strony!';
        break;
      }
      case 500: {
        message = error.data.message;
        break;
      }
    }
  }

  return (
    <>
      <h3>{title}</h3>
      <p>{message}</p>
      <NavigateBtn url={'/'} text={'Strona głowna'} />
    </>
  );
};
