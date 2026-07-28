export const NAME = "NAME";
export const PRICE = "PRCIE";
export const COVER = "COVER";
export const COVER_FILE = "COVER_FILE";
export const CATEGORY_ID = "CATEGORY_ID";
export const INVENTORY = "INVENTORY";
export const DESCRIPTION = "DESCRIPTION";
export const ALL = "ALL";

const productReducer = (product, action) => {
  const { type, payload } = action;

  switch (type) {
    case NAME: {
      return {
        ...product,
        name: payload,
      };
    }
    case PRICE: {
      return {
        ...product,
        price: payload,
      };
    }
    case COVER: {
      return {
        ...product,
        cover: payload,
        isCoverBlob: true,
      };
    }
    case COVER_FILE: {
      return {
        ...product,
        coverFile: payload,
      };
    }
    case CATEGORY_ID: {
      return {
        ...product,
        categoryId: payload,
      };
    }
    case INVENTORY: {
      return {
        ...product,
        inventory: payload,
      };
    }
    case DESCRIPTION: {
      return {
        ...product,
        description: payload,
      };
    }
    case ALL: {
      return payload;
    }
    default: {
      return product;
    }
  }
};

export default productReducer;
