import { 
    SEARCH,
  } from '../actions/actiontypes';

export function search(value) {
    return { type: SEARCH, value };
  }
