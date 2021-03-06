import Immutable from 'seamless-immutable'
import makeReducer from '../../lib/store'
import {
  FETCH_CATEGORY_EVENTS_SUCCEEDED,
  FETCH_CATEGORY_EVENTS_FAILED,
  FETCH_EVENT_SUCCEEDED,
  FETCH_EVENT_FAILED,
  SIGN_UP_FOR_EVENT_SUCCEEDED,
  SIGN_UP_FOR_EVENT_FAILED,
  GIVE_UP_EVENT_SUCCEEDED,
  GIVE_UP_EVENT_FAILED,
  HANDLE_EVENT_ERROR,
  GET_MAP_EVENTS_SUCCEEDED,
  CREATE_NEW_EVENT_SUCEEDED,
  CREATE_NEW_EVENT_FAILED,
  CLEAR_NEW_EVENT_FLAG,
  UPDATE_EVENT_SUCCEEDED,
  UPDATE_EVENT_FAILED,
  CLEAR_UPDATE_EVENT_FLAG,
  UPDATE_LOADED_EVENT,
  LOAD_SEARCH_EVENTS_FAILED,
  LOAD_SEARCH_EVENTS_SUCCEEDED,
  LOAD_EVENT_PARTICIPANTS_SUCCEEDED,
  LOAD_EVENT_PARTICIPANTS_FAILED,
  LOAD_POPULAR_EVENTS_SUCCEEDED,
} from './constants'

const initialState = Immutable({
  byCategory: null,
  byId: null,
  map: null,
  newEvent: null,
  updateEvent: null,
  search: null,
  popular: null,
})

const handlers = {
  [FETCH_CATEGORY_EVENTS_SUCCEEDED]: (state, { categoryId, events }) => state.setIn(['byCategory', categoryId], events),
  [FETCH_CATEGORY_EVENTS_FAILED]: (state, { categoryId, error }) => state.setIn(['byCategory', categoryId, 'error'], error),

  [FETCH_EVENT_SUCCEEDED]: (state, { id, event }) => state.setIn(['byId', id], event),
  [FETCH_EVENT_FAILED]: (state, { id, error }) => state.setIn(['byId', id, 'error'], error),

  [SIGN_UP_FOR_EVENT_SUCCEEDED]: (state, { id }) => state.setIn(['byId', id, 'signed'], true),
  [SIGN_UP_FOR_EVENT_FAILED]: (state, { id, error }) => state.setIn(['byId', id, 'error'], error),

  [GIVE_UP_EVENT_SUCCEEDED]: (state, { id }) => state.setIn(['byId', id, 'signed'], false),
  [GIVE_UP_EVENT_FAILED]: (state, { id, error }) => state.setIn(['byId', id, 'error'], error),

  [GET_MAP_EVENTS_SUCCEEDED]: (state, { events }) => state.set('map', events),

  [CREATE_NEW_EVENT_SUCEEDED]: (state, { id }) => state.set('newEvent', id),
  [CREATE_NEW_EVENT_FAILED]: (state, { error }) => state.setIn(['newEvent', 'error'], error),
  [CLEAR_NEW_EVENT_FLAG]: state => state.set('newEvent', null),

  [UPDATE_EVENT_SUCCEEDED]: (state, { id }) => state.set('updateEvent', id),
  [UPDATE_EVENT_FAILED]: (state, { error }) => state.setIn(['updateEvent', 'error'], error),
  [CLEAR_UPDATE_EVENT_FLAG]: state => state.set('updateEvent', null),
  [UPDATE_LOADED_EVENT]: (state, { id, event }) => state.setIn(['byId', id], ({
    ...state.getIn(['byId', id]),
    ...event,
    address: null,
  })),

  [HANDLE_EVENT_ERROR]: (state, { id }) => state.setIn(['byId', id, 'error'], undefined),

  [LOAD_SEARCH_EVENTS_SUCCEEDED]: (state, { events }) => state.set('search', events),
  [LOAD_SEARCH_EVENTS_FAILED]: (state, { error }) => state.setIn(['search', 'error'], error),

  [LOAD_EVENT_PARTICIPANTS_SUCCEEDED]: (state, { id, participants }) => state.setIn(['byId', id, 'participants'], participants),
  [LOAD_EVENT_PARTICIPANTS_FAILED]: (state, { id, error }) => state.setIn(['byId', id, 'participants', 'error'], error),

  [LOAD_POPULAR_EVENTS_SUCCEEDED]: (state, { events }) => state.set('popular', events),
  [LOAD_EVENT_PARTICIPANTS_FAILED]: (state, { error }) => state.set('popular', { error }),
}

export default makeReducer(handlers, initialState)
