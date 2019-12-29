import React from 'react'
import {Machine, assign} from 'xstate'

export const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      results: [],
      message: ''
    },
    states: {
      idle: {
        on: {
          FETCH: 'pending'
        }
      },
      pending: {
        invoke: {
          src: 'fetchData',
          onDone: { target: 'successful', actions: ['setResults'] },
          onError: { target: 'failed', actions: ['setMessage'] }
        }
      },
      failed: {
        on: {
          FETCH: 'pending'
        }
      },
      successful: {
        on: {
          FETCH: 'pending'
        }
      }
    }
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => ({
        results: event.data
      })),
      setMessage: assign((ctx, event: any) => ({
        message: event.data
      }))
    }
  }
);