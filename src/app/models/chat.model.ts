export interface IChat {
  _id?: string;
  // un cliente id
  buyer?: string;
  //   una prop id
  property?: string;
  // ciudad de la propiedad para filtrar a los gnerentes
  city?: string;
  timestamp?: Date;
  //   mensajes
  messages?: [
    {
      content?: string;
      createAt?: string;
      // quien lo hizo
      uid?: string;
      readBy?: string[];
      _id?: string;
    }
  ];
}
export interface IMessage {
  content?: string;
  createAt?: any;
  // quien lo hizo
  uid?: string;
  readBy?: string[];
  _id?: string;
  typeOfUser?:
    | 'administrator'
    | 'buyer'
    | 'seller'
    | 'adviser'
    | 'management'
    | 'maker'
    | 'office';
}
