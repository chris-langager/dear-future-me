import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const messagesRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        sendAt: z.date(),
        subject: z.string(),
        body: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: { ...input, sent: false },
      });
    }),
});
