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
          onDone: [
          { 
            target: 'successful.withData', 
            actions: ['setResults'],
            cond:'hasData' },
          { 
            target: 'successful.withoutData', 
            actions: ['setResults']
          },
          ],
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
        },
        states:{
          withData: {},
          withoutData: {}
        }
      }
    }
  },
  {
    actions: {
      setResults: assign((ctx, event) => ({
        results: event.data
      })),
      setMessage: assign((ctx, event) => ({
        message: event.data
      }))
    },
    guards:{
      hasData: (ctx, event) =>{
        console.log(event)
        return event.data && event.data.length > 0
      }
    }
  }
);