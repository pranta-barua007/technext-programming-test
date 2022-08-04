import { CallEffect, PutEffect, ForkEffect, AllEffect } from "redux-saga/effects"
import { ResponseGenerator } from "../requests/call-api"

export interface GeneratorFunction extends Generator<CallEffect<ResponseGenerator> | PutEffect<{
    payload: any
    type: string
}>, void, ResponseGenerator> { }

export interface GeneratorCallerFunction extends Generator<ForkEffect<never>, void, unknown> { }

export interface GeneratorRunnerFunction extends Generator<AllEffect<CallEffect<void>>, void, unknown> { }

export interface RootSaga extends Generator<AllEffect<ForkEffect<void>>, void, unknown> { }