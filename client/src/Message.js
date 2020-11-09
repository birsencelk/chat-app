import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const Message = (props) => {
  const clockParameter = localStorage.getItem('clockDisplay');

  const _formatClock = (time, display) => {
    return format(new Date(time), display);
  }

  const { id, time, body, userName } = props;

  return (<>
     <div className="message__head">
        <div className="message__head__user-name">
          { userName || 'Guest' + id }
        </div>,

        <div className="message__head__sent-date">
        { clockParameter=='12 hours' ? _formatClock(time,'hh:mm') : _formatClock(time,'HH:mm')}
        </div>
     </div>
     <div className="message__bottom">
      { body.includes('http') ? <img className="message__bottom__image" src={ body } alt="image"/> : body }
      </div>
    </>)
}

Message.propTypes = {
  id: PropTypes.number,
  time: PropTypes.string,
  body: PropTypes.string,
  userName: PropTypes.string
}

export default Message;