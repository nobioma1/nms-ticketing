import { Ticket } from '../tickets';
import { generateID } from '../../test/helpers/generate-id';

describe('Ticket Model', () => {
  it('implements optimistic concurrency control', async (done) => {
    // create ticket
    const ticket = Ticket.build({
      title: 'parte',
      price: 5,
      userId: generateID(),
    });
    await ticket.save();

    // fetch ticket twice
    const ticketI = await Ticket.findById(ticket.id);
    const ticketII = await Ticket.findById(ticket.id);

    // make changes to the ticket
    ticketI!.set({ price: 10 });
    ticketII!.set({ price: 3 });

    // save the first ticket
    await ticketI!.save();

    // save the second ticket and expect an error because version order
    try {
      await ticketII!.save();
    } catch (error) {
      return done();
    }

    throw new Error('optimistic concurrency control failed');
  });

  it('increments version number on multiple saves', async () => {
    // create ticket
    const ticket = Ticket.build({
      title: 'parte',
      price: 5,
      userId: generateID(),
    });
    await ticket.save();
    expect(ticket.version).toBe(0);

    await ticket.save();
    expect(ticket.version).toBe(1);

    await ticket.save();
    expect(ticket.version).toBe(2);
  });
});
