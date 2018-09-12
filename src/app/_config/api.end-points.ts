// const ip = 'https://cobianback.herokuapp.com/';
const ip = 'http://localhost:3000/';

const apiUrl = ip + 'api/v1/';
const userSession = 'usersession/';
const buyer = 'buyer/';
const buyerId = 'bybuyerid/';
const property = 'property/';
const bypropertyid = 'bypropertyid/';
const checkbuyer = 'checkbuyer/';
const propertybyBuyer = 'matchsearchbybuyer/';
const statusBuyerProperty = 'status/';
const credit = 'credit/';
const schedule = 'schedule/';
const upgradeStatus = 'upgradelevelbyid/';
const ofert = 'ofert/';
const ofertId = 'byofertid/';
const administrator = 'administrator/';
const adviser = 'adviser/';
const adviserId = 'byadviserid/';
const seller = 'seller/';
const sellerId = 'bysellerid/';
const creditById = 'bycreditid/';
const sbpbypropertybuyer = 'bybuyerpropid/';

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
  STATUS_UPGRADE: apiUrl + statusBuyerProperty + upgradeStatus,
  STATUS_SEARCH: apiUrl + statusBuyerProperty + sbpbypropertybuyer,
  // credit
  CREDIT: apiUrl + credit,
  CREDIT_ID: apiUrl + credit + creditById,
  // schedule
  SCHEDULE: apiUrl + schedule,
  // ofert
  OFERT: apiUrl + ofert,
  OFERT_ID: apiUrl + ofert + ofertId,
  // admin
  ADMINISTRATOR: apiUrl + administrator,
  // adviser
  ADVISER: apiUrl + adviser,
  ADVISER_ID: apiUrl + adviser + adviserId,
  // seller
  SELLER: apiUrl + seller,
  SELLER_ID: apiUrl + seller + sellerId,
};
