import dayjs from 'dayjs';
import { formatPhoneNumber } from 'shared/formatters';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const formatDate = (timestamp) => {
  const date = dayjs(Number(timestamp));

  const utc = dayjs.utc(date);

  return utc.local().format('MMM DD - YYYY');
};

export default ({ purchases, races, lifetimeValue, user, favorites }) => {
  const csv = `${user.name}${'\n'}Races Attended (${races}),,,,,
Transactions (${purchases.length}) - Total Sales ${lifetimeValue.replace(
    ',',
    ''
  )},,,,
Cellphone:,"${formatPhoneNumber(user.cellphone)}",,,,
Email:,${user.email},,,,
Address:,${user.address}${'\n'},,,,
Event Name, Track, Date, Total, Refund,
      ${purchases
        .map(
          (value) =>
            `"${value.event ? `${value.event.name}` : ''}","${
              value.event && value.event.track
                ? `${value.event.track.name}`
                : ''
            }","${formatDate(value.purchase_date)}","${value.total}","${
              value.refund ? value.refund : ''
            }"`
        )
        .join('\n')}${'\n'}${'\n'}Favorites,${favorites.reduce(
    (acc, favorite) => {
      if (acc.length) {
        return acc.concat(`${'\n'},${favorite}`);
      } else {
        return `${favorite}`;
      }
    },
    ''
  )}`;

  download(`${user.name.replace(' ', '-')}-UserHistory.csv`, csv.trim());
};
