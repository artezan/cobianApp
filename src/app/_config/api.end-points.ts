const ip = 'https://cobianback.herokuapp.com/';
// const ip = 'http://localhost:3000/';

const apiUrl = ip + 'api/v1/';
const userSession = 'usersession/';
const buyer = 'buyer/';
const buyerId = 'bybuyerid/';

export const END_POINT = {
  IP: ip,
  //   session
  USER_SESSION: apiUrl + userSession,
  // buyer
  BUYER_ID: apiUrl + buyer + buyerId,
};
