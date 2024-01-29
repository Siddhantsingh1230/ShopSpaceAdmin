export const graphRenderConstraints = {
  _id: {
    disabled: true,
  },
  title: {
    disabled: true,
  },
  description:{
    disabled : true,
  },
  category: {
    disabled: true,
  },
  subCategory: {
    disabled: true,
  },
  brand: {
    disabled: true,
  },
  price: {
    disabled: false,
  },
  rating: {
    disabled: false,
  },
  stock: {
    disabled: false,
  },
  discountPercentage: {
    disabled: false,
  },
  viewCount: {
    disabled: false,
  },
  createdAt: {
    disabled: true,
  },
  action: {
    disabled: true,
  },
};

export const graphRenderConstraintsOrders = {
  _id: {
    disabled: true,
  },
  checkoutEmail: {
    disabled: true,
  },
  billingAddress:{
    disabled : true,
  },
  billingState: {
    disabled: false,
  },
  billingZip: {
    disabled: true,
  },
  paymentMethod: {
    disabled: false,
  },
  placedOn: {
    disabled: true,
  },
  deliveredOn: {
    disabled: true,
  },
  totalAmount: {
    disabled: false,
  },
  status: {
    disabled: false,
  },
  userId: {
    disabled: true,
  },
};
