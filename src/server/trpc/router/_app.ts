import { router } from '../trpc';
import { messagesRouter } from './messages';

export const appRouter = router({
  messages: messagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
