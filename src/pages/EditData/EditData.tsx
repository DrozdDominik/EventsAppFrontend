import React from 'react';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';

interface Props {
  dataType: 'name' | 'email' | 'password' | 'role';
}
export const EditData = (props: Props) => {
  let editDataType;

  switch (props.dataType) {
    case 'name':
      editDataType = 'Nazwa użytkownika';
      break;
    case 'email':
      editDataType = 'Email';
      break;
    case 'password':
      editDataType = 'Hasło';
      break;
    case 'role':
      editDataType = 'Uprawnienia użytkownika';
      break;
  }

  return (
    <>
      <h2>Edytuj</h2>
      <p>{editDataType}</p>
      <NavigateBtn url={'/user/settings'} text={'Powrót'} />
    </>
  );
};
