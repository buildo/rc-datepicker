import t from 'tcomb';
import moment from 'moment';

export const Mode = t.enums.of(['day', 'month', 'year']);

export const MomentDate = t.irreducible('MomentDate', x => moment.isMoment(x));

export const Value = t.union([t.String, t.Date, MomentDate]);
