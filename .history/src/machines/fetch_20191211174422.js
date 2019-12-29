import React from 'react'
import {Machine} from 'xstate'

export const  fetchMachine = Machine({
    id:'fetch',
    initial: 'idle',
    context: {
        results: undefined,
        message: undefined
    },
    states:{
        idle: {
            on: {
                FETCH: 'pending'
            }
        },
        pending:{
            entry: ['fetcData'],
            on:{
                RESOLVE: {target:'successful', actions:['setResults']},
                REJECT: {target:'failed', actions:['setMessage']},
            }
        },
        failed:{
            on:{
                FETCH: 'pending'
            }
        },
        successful:{
            on:{
                FETCH: 'pending'
            }
        }
    },
    {

    actions: {
        setResults: assign((ctx, event) => ({
            results: event.results
        })),
        setMessage: assign((ctx, event)=> ({
         message: event.message
        }))
     }
    })