import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/core/styles/withStyles';
import { red, grey, green } from '@material-ui/core/colors';
import { IUserStatus } from '../../identity/types';

const cache = new Map();

export default function statusBadgeFactory(status: IUserStatus) {
  if (cache.has(status)) return cache.get(status);
  const color = status === 'available' ? green[500] : status === 'incall' ? red[500] : grey[500];
  const StatusBadge = withStyles(() => ({
    badge: {
      backgroundColor: color,
      color: color,
    },
  }))(Badge);
  cache.set(status, StatusBadge);
  return StatusBadge;
}
