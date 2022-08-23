import express from 'express';

export interface TypedRequest extends express.Request {
  userId?: string;
  tokenId?: string;
}

export interface TypedResponse extends express.Response {}

export interface TypedError extends Error {
  code: number;
  status: number;
  path: string;
}
