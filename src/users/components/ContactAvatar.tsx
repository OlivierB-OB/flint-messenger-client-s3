import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { UserAvatar } from './UserAvatar';

export interface IContactAvatarProps {
  target: string;
}

const mapStateToProps = ({ users, identity }: IAppState, { target }: IContactAvatarProps) => ({
  info: identity.info?._id === target ? identity.info : users.list.find((user) => user._id === target),
});

export const ContactAvatar = connect(mapStateToProps)(UserAvatar);
