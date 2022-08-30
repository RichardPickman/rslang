import express from 'express';

export interface TypedRequest extends express.Request {
  userId?: string;
  tokenId?: string;
}

export interface TypedResponse extends express.Response {}

export interface TypedError {
  status: number;
  message: string;
  stack?: string;
}

export interface UserWordsBody {
  difficulty: string;
  optional: Record<string, unknown>;
}
