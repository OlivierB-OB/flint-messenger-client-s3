import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { UserName } from './UserName';

export interface IContactNameProps {
  target: string;
}

const mapStateToProps = ({ identity, users }: IAppState, { target }: IContactNameProps) => ({
  info: identity.info?.uid === target ? identity.info : users.list.find((user) => user.uid === target),
});

export const ContactName = connect(mapStateToProps)(UserName);
