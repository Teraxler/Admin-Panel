import {
  NAME,
  FAMILY,
  USERNAME,
  EMAIL,
  PHONE,
  BIRTHDAY,
  PASSWORD,
  ALL,
} from "../actions/customer";

const customerReducer = (customer, action) => {
  const { type, payload } = action;

  switch (type) {
    case NAME: {
      return { ...customer, name: payload };
    }
    case FAMILY: {
      return { ...customer, family: payload };
    }
    case USERNAME: {
      return { ...customer, username: payload };
    }
    case EMAIL: {
      return { ...customer, email: payload };
    }
    case PHONE: {
      return { ...customer, phone: payload };
    }
    case BIRTHDAY: {
      return { ...customer, birthday: payload };
    }
    case PASSWORD: {
      return { ...customer, password: payload };
    }
    case ALL: {
      return payload;
    }
    default: {
      return customer;
    }
  }
};

export default customerReducer;
