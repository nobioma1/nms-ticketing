import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ticketAttrs {
  title: string;
  price: number;
  userId: string;
}

// interface to describe properties of a user model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: ticketAttrs): TicketDoc;
}

// interface that describes the properties of a
// User Document
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
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
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// rename __v to version
ticketSchema.set('versionKey', 'version');

// update the version property if Doc is updated
ticketSchema.plugin(updateIfCurrentPlugin);

// Adding some type checking for creating a new user
ticketSchema.statics.build = (attrs: ticketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
