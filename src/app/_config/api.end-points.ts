// const ip = 'http://localhost:3004/';
// const ip = 'http://31.220.52.51:3004/';

// prod
const ip = 'http://31.220.58.194:3004/';

const apiUrl = ip + 'api/v1/';
const userSession = 'usersession/';
const userEmail = 'email/';
const buyer = 'buyer/';
const buyerId = 'bybuyerid/';
const property = 'property/';
const propertyAll = 'all/';
const bypropertyid = 'bypropertyid/';
const checkbuyer = 'checkbuyer/';
const propertybyBuyer = 'matchsearchbybuyer/';
const properySimulate = 'matchsearchbydemo/';
const statusBuyerProperty = 'status/';
const credit = 'credit/';
const schedule = 'schedule/';
const schedulePage = 'page/';
const scheduleId = 'byscheduleid/';
const scheduleCheck = 'checkschedule/';
const upgradeStatus = 'upgradelevelbyid/';
const ofert = 'ofert/';
const ofertId = 'byofertid/';
const administrator = 'administrator/';
const administratorEvents = 'events/';
const adviser = 'adviser/';
const adviserId = 'byadviserid/';
const seller = 'seller/';
const sellerId = 'bysellerid/';
const creditById = 'bycreditid/';
const sbpbypropertybuyer = 'bybuyerpropid/';
const goal = 'goal/';
const goalId = 'bygoalid/';
const build = 'build/';
const buildupdatephase = 'updatephase/';
const buildbybuildid = 'bybuildid/';
const uploadImg = 'uploadImg';
const maker = 'maker/';
const makerbymakerid = 'bymakerid/';
const deleteFile = 'deleteFile/';
const bystatusid = 'bystatusid/';
const sale = 'sale/';
const bysaleid = 'bysaleid/';
const byadviserid = 'byadviserid/';
const office = 'office/';
const byofficeid = 'byofficeid/';
const notification = 'notification/';
const notificatiosNoRead = 'noread/';
const notificatiosSearch = 'search/';
const onesignal = 'https://onesignal.com/api/v1/notifications';
const mail = 'mail/';
const mailAdd = 'add/';
const mailFind = 'find/';
const bybuyerid = 'bybuyerid/';
const chat = 'chat/';
const chatByProp = 'bypropertyid/';
const chatByCity = 'bychatcity/';
const addmessage = 'addmessage/';
const addread = 'addread/';
const bychatid = 'bychatid/';
const byDefault = 'byDefault/';
const files = 'files/';
const msgMail = 'msg/';
const resetPass = 'resetpass/';
const prebuyer = 'prebuyer/';
const prebuild = 'prebuild/';
const management = 'management/';
const submanagement = 'submanagement/';
const bymanagementid = 'bymanagementid/';
const father = 'father/';
const post = 'post/';

export const END_POINT = {
  IP: ip,
  //   session
  USER_SESSION: apiUrl + userSession,
  USER_RESET: apiUrl + userSession + userEmail,
  // buyer
  BUYER_ID: apiUrl + buyer + buyerId,
  BUYER: apiUrl + buyer,
  BUYER_CHECK: apiUrl + buyer + checkbuyer,
  // properties
  PROPERTY_MATCH_SEARCH: apiUrl + property + propertybyBuyer,
  PROPERTY_BY_ID: apiUrl + property + bypropertyid,
  PROPERTY: apiUrl + property,
  PROPERTY_ALL: apiUrl + property + propertyAll,
  PROPERTY_SIMULATE: apiUrl + property + properySimulate,
  // status buyer property
  STATUS_BP: apiUrl + statusBuyerProperty,
  STATUS_UPGRADE: apiUrl + statusBuyerProperty + upgradeStatus,
  STATUS_SEARCH: apiUrl + statusBuyerProperty + sbpbypropertybuyer,
  STATUS_ID: apiUrl + statusBuyerProperty + bystatusid,
  STATUS_FIND_BY_BUYER: apiUrl + statusBuyerProperty + bybuyerid,
  // credit
  CREDIT: apiUrl + credit,
  CREDIT_ID: apiUrl + credit + creditById,
  // schedule
  SCHEDULE: apiUrl + schedule,
  SCHEDULE_PAGE: apiUrl + schedule + schedulePage,
  SCHEDULE_CHECK: apiUrl + schedule + scheduleCheck,
  SCHEDULE_ID: apiUrl + schedule + scheduleId,
  // ofert
  OFERT: apiUrl + ofert,
  OFERT_ID: apiUrl + ofert + ofertId,
  // admin
  ADMINISTRATOR: apiUrl + administrator,
  ADMINISTRATOR_EVENTS: apiUrl + administrator + administratorEvents,
  // adviser
  ADVISER: apiUrl + adviser,
  ADVISER_ID: apiUrl + adviser + adviserId,
  // seller
  SELLER: apiUrl + seller,
  SELLER_ID: apiUrl + seller + sellerId,
  // goal
  GOAL: apiUrl + goal,
  GOAL_ID: apiUrl + goal + goalId,
  // building
  BUILD: apiUrl + build,
  BUILD_ID: apiUrl + build + buildbybuildid,
  BUILD_UPDATE_PHASE: apiUrl + build + buildupdatephase,
  BUILD_UPLOAD_IMG: apiUrl + build + uploadImg,
  BUILD_DELETE_IMG: apiUrl + build + deleteFile,
  // maker
  MAKER: apiUrl + maker,
  MAKER_ID: apiUrl + maker + makerbymakerid,
  // Sales
  SALE: apiUrl + sale,
  SALE_ID: apiUrl + sale + bysaleid,
  SALE_ADV_ID: apiUrl + sale + byadviserid,
  // Oficinista
  OFFICE: apiUrl + office,
  OFFICE_ID: apiUrl + office + byofficeid,
  // Notifi
  NOTIFICATION: apiUrl + notification,
  NOTIFICATION_SEARCH: apiUrl + notification + notificatiosSearch,
  NOTIFICATION_NOT_READ: apiUrl + notification + notificatiosNoRead,
  // OneSignal
  ONESIGNAL: onesignal,
  // Email
  EMAIL_ADD: apiUrl + mail + mailAdd,
  EMAIL_FIND: apiUrl + mail + mailFind,
  EMAIL_FILES: apiUrl + mail + files,
  EMAIL_MSG: apiUrl + mail + msgMail,
  EMAIL_RESET_PASS: apiUrl + mail + resetPass,
  // chat
  CHAT: apiUrl + chat,
  CHAT_PROP_ID: apiUrl + chat + chatByProp,
  CHAT_CITY_ID: apiUrl + chat + chatByCity,
  CHAT_ID: apiUrl + chat + bychatid,
  CHAT_DEFAULT: apiUrl + chat + byDefault,
  CHAT_ADD_MSG: apiUrl + chat + addmessage,
  CHAT_ADD_READ: apiUrl + chat + addread,
  // PRE
  PRE_BUYER: apiUrl + prebuyer,
  PRE_BUILD: apiUrl + prebuild,
  PRE_BUILD_FATHER: apiUrl + father,
  //  management
  MANAGER: apiUrl + management,
  MANAGER_ID: apiUrl + management + bymanagementid,
  //  sub  management
  SUBMANAGER: apiUrl + submanagement,
  SUBMANAGER_ID: apiUrl + submanagement + bymanagementid,
  POST: apiUrl + post,
  POST_SEARCH: apiUrl + post + 'search',
};
