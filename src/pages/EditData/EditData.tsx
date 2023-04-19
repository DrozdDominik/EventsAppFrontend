import React from 'react';
import { NavigateBtn } from '../../components/common/Btns/Navigate/NavigateBtn';
import { EditDataType } from '../../types';
import { EditName } from '../../components/EditForms/EditName';
import classes from './EditData.module.css';
import { EditEmail } from '../../components/EditForms/EditEmail';
import { EditPassword } from '../../components/EditForms/EditPassword';
import { UpgradeRole } from '../../components/UpgradeRole/UpgradeRole';

interface Props {
  dataType: EditDataType;
}
export const EditData = (props: Props) => {
  return (
    <>
      <h2 className={classes.title}>Edytuj</h2>
      {props.dataType === EditDataType.name && (
        <div className={classes.main}>
          <p className={classes.text}>Nazwa użytkownika</p>
          <EditName />
        </div>
      )}
      {props.dataType === EditDataType.email && (
        <>
          <p className={classes.text}>Email</p>
          <EditEmail />
        </>
      )}
      {props.dataType === EditDataType.password && (
        <>
          <p className={classes.text}>Hasło</p>
          <EditPassword />
        </>
      )}
      {props.dataType === EditDataType.role && (
        <>
          <p className={classes.text}>Podnieś uprawnienia użytkownika</p>
          <UpgradeRole />
        </>
      )}
      <NavigateBtn url={'..'} text={'Powrót'} />
    </>
  );
};
