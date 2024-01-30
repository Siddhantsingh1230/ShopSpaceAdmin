export const graphRenderConstraints = {
  _id: {
    disabled: true,
    categorical:false,
  },
  title: {
    disabled: true,
    categorical:false,
  },
  description:{
    disabled : true,
    categorical:false,
  },
  category: {
    disabled: false,
    categorical:true,
  },
  subCategory: {
    disabled: false,
    categorical:true,
  },
  brand: {
    disabled: false,
    categorical:true,
  },
  price: {
    disabled: false,
    categorical:false,
  },
  rating: {
    disabled: false,
    categorical:false,
  },
  stock: {
    disabled: false,
    categorical:false,
  },
  discountPercentage: {
    disabled: false,
    categorical:false,
  },
  viewCount: {
    disabled: false,
    categorical:false,
  },
  createdAt: {
    disabled: true,
    categorical:false,
  },
  action: {
    disabled: true,
    categorical:false,
  },
};

export const graphRenderConstraintsOrders = {
  _id: {
    disabled: true,
    categorical:false,
  },
  checkoutEmail: {
    disabled: true,
    categorical:false,
  },
  billingAddress:{
    disabled : true,
    categorical:false,
  },
  billingState: {
    disabled: false,
    categorical:true,
  },
  billingZip: {
    disabled: false,
    categorical:true,
  },
  paymentMethod: {
    disabled: false,
    categorical:true,
  },
  placedOn: {
    disabled: false,
    categorical:true,
  },
  deliveredOn: {
    disabled: true,
    categorical:false,
  },
  totalAmount: {
    disabled: false,
    categorical:false,
  },
  status: {
    disabled: false,
    categorical:true,
  },
  userId: {
    disabled: true,
    categorical:false,
  },
  action:{
    disabled: true,
    categorical:false,
  }
};
