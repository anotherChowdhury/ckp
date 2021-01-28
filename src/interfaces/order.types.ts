export type item = {
  itemId: number
  foodName: string
  price: number
  quantity: number
}

export type responseStructure = {
  orderId: number
  customerName: string
  customerPhone: string
  customerAddress: string
  items: item[]
  total: number
}

export type allOrderServiceStructure = {
  orderid: number
  customername: string
  customerphone: string
  customeraddress: string
  foodname: string
  price: number
  quantity: number
  total: number
  itemid: number
}
