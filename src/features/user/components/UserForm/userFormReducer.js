export const NAME = "NAME";
export const FAMILY = "FAMILY";
export const USERNAME = "USERNAME";
export const EMAIL = "EMAIL";
export const PHONE = "PHONE";
export const BIRTHDAY = "BIRTHDAY";
export const PASSWORD = "PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";
export const ALL = "ALL";

const userReducer = (user, action) => {
  const { type, payload } = action;

  switch (type) {
    case NAME: {
      return { ...user, name: payload };
    }
    case FAMILY: {
      return { ...user, family: payload };
    }
    case USERNAME: {
      return { ...user, username: payload };
    }
    case EMAIL: {
      return { ...user, email: payload };
    }
    case PHONE: {
      return { ...user, phone: payload };
    }
    case BIRTHDAY: {
      return { ...user, birthday: payload };
    }
    case PASSWORD: {
      return { ...user, password: payload };
    }
    case NEW_PASSWORD: {
      return { ...user, newPassword: payload };
    }
    case ALL: {
      return payload;
    }
    default: {
      return user;
    }
  }
};

export default userReducer;
