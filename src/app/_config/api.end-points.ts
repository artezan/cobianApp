const ip = 'https://cobianback.herokuapp.com/';
// const ip = 'http://localhost:3000/';

const apiUrl = ip + 'api/v1/';
const userSession = 'usersession/';
const buyer = 'buyer/';
const buyerId = 'bybuyerid/';
const property = 'property/';
const bypropertyid = 'bypropertyid/';
const checkbuyer = 'checkbuyer/';
const propertybyBuyer = 'matchsearchbybuyer/';
const statusBuyerProperty = 'status/';

export const END_POINT = {
  IP: ip,
  //   session
  USER_SESSION: apiUrl + userSession,
  // buyer
  BUYER_ID: apiUrl + buyer + buyerId,
  BUYER: apiUrl + buyer,
  BUYER_CHECK: apiUrl + buyer + checkbuyer,
  // properties
  PROPERTY_MATCH_SEARCH: apiUrl + property + propertybyBuyer,
  PROPERTY_BY_ID: apiUrl + property + bypropertyid,
  PROPERTY: apiUrl + property,
  // status buyer property
  STATUS_BP: apiUrl + statusBuyerProperty,
};
