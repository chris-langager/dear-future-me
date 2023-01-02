import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { trpc } from '../utils/trpc';
import { useCallback, useState } from 'react';
import { create } from 'domain';

type Status = 'writing' | 'sending' | 'sent';

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [status, setStatus] = useState<Status>('writing');

  const createMessage = trpc.messages.create.useMutation({
    onMutate: () => {
      setStatus('sending');
    },
    onSettled: () => {
      setStatus('sent');
    },
  });

  return (
    <>
      <Head>
        <title>Dear Future Me</title>
        <meta name="description" content="Send messages to your future self" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="m-4">
          <h1 className="text-lg font-bold">Dear Furture Me</h1>
        </div>
        {status != 'sent' ? (
          <form className="w-4/5 max-w-2xl">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-1 text-gray-700  shadow focus:outline-none"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="email"
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-1 text-gray-700  shadow focus:outline-none"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="subject"
              >
                Body
              </label>
              <textarea
                className="monospaced focus:shadow-outline h-96 w-full appearance-none rounded border py-2 px-1 text-gray-700  shadow focus:outline-none"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  createMessage.mutate({
                    email,
                    sendAt: new Date(),
                    subject,
                    body,
                  });
                }}
              >
                Send
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div>Message sent.</div>
            <a
              href="#!"
              className="mb-4 text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                setSubject('');
                setBody('');
                setStatus('writing');
              }}
            >
              Write another?
            </a>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
