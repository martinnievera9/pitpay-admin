import moment from 'moment';

export function formatTimestamp(timestamp, format, unix = false) {
  const date = unix ? moment(timestamp) : moment.unix(timestamp);

  const utc = moment.utc(date);

  return utc.local().format(format);
}

export function formatCustomDate(date, format) {
  return moment(date, format);
}

/**
 * @param {string} [n] phoneNumber
 * @return {string} a formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
  // Filter out phone numbers with country codes other than +1
  if (
    !phoneNumber ||
    phoneNumber.startsWith('+1-') ||
    (phoneNumber.startsWith('+') && !phoneNumber.startsWith('+1'))
  ) {
    return phoneNumber;
  }
  // It's a US/Canada number; let's format it.
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return ['(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}
