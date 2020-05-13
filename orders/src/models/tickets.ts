import mongoose from 'mongoose';

import { Order, OrderStatus } from './order';

interface ticketAttrs {
  title: string;
  price: number;
}

// interface to describe properties of a user model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: ticketAttrs): TicketDoc;
}

// interface that describes the properties of a
// User Document
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved: () => Promise<boolean>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Adding some type checking for creating a new user
ticketSchema.statics.build = (attrs: ticketAttrs) => {
  return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
