import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

import { Order, OrderStatus } from './order';

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

// interface to describe properties of a user model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(params: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

// interface that describes the properties of a
// User Document
export interface TicketDoc extends mongoose.Document {
  isReserved: () => Promise<boolean>;
  price: number;
  title: string;
  version: number;
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

// rename __v to version
ticketSchema.set('versionKey', 'version');

// update the version property if Doc is updated
ticketSchema.plugin(updateIfCurrentPlugin);

// Adding some type checking for creating a new user
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

// find event by the id of the doc and version
ticketSchema.statics.findByEvent = (params: {
  id: string;
  version: number;
}) => {
  return Ticket.findOne({
    _id: params.id,
    version: params.version - 1,
  });
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
