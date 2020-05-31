import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { UserName, IUserNameProps } from '../../users/components/UserName';

type IMyNameDisplayProps = Partial<IUserNameProps>;

function MyNameDisplay({ info }: IMyNameDisplayProps) {
  if (!info) return null;
  return (
    <Typography variant="h6">
      <UserName info={info} />
    </Typography>
  );
}

const mapStateToProps = ({ identity }: IAppState) => ({
  info: identity.info,
});

export const MyName = connect(mapStateToProps)(MyNameDisplay);
