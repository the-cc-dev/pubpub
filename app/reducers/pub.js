import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_PUB_DATA_LOAD,
	GET_PUB_DATA_SUCCESS,
	GET_PUB_DATA_FAIL,
} from 'containers/Pub/actions';

import {
	POST_CONTRIBUTOR_LOAD,
	POST_CONTRIBUTOR_SUCCESS,
	POST_CONTRIBUTOR_FAIL,
	PUT_CONTRIBUTOR_LOAD,
	PUT_CONTRIBUTOR_SUCCESS,
	PUT_CONTRIBUTOR_FAIL,
	DELETE_CONTRIBUTOR_LOAD,
	DELETE_CONTRIBUTOR_SUCCESS,
	DELETE_CONTRIBUTOR_FAIL,
} from 'containers/Pub/actionsContributors';

import {
	POST_VERSION_LOAD,
	POST_VERSION_SUCCESS,
	POST_VERSION_FAIL,
	PUT_VERSION_LOAD,
	PUT_VERSION_SUCCESS,
	PUT_VERSION_FAIL,
} from 'containers/Pub/actionsVersions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	loading: false,
	error: undefined,
	contributorsLoading: false,
	contributorsError: undefined,
	versionsLoading: false,
	versionsError: undefined,
	pub: {},
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_PUB_DATA_LOAD:
		return state.merge({
			loading: true,
			error: false,
			pub: {},
		});	
	case GET_PUB_DATA_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			pub: action.result
		});
	case GET_PUB_DATA_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
			pub: null,
		});
	case POST_CONTRIBUTOR_LOAD:
		return state.merge({
			contributorsLoading: true,
			contributorsError: false,
		});	
	case POST_CONTRIBUTOR_SUCCESS:
		return state.merge({
			contributorsLoading: false,
			contributorsError: undefined,
		})
		.mergeIn(
			['pub', 'contributors'], 
			state.getIn(['pub', 'contributors']).unshift(ensureImmutable(action.result))
		);
	case POST_CONTRIBUTOR_FAIL:
		return state.merge({
			contributorsLoading: false,
			contributorsError: action.error,
		});
	case PUT_CONTRIBUTOR_LOAD:
		return state.merge({
			contributorsLoading: true,
			contributorsError: false,
		});	
	case PUT_CONTRIBUTOR_SUCCESS:
		return state.merge({
			contributorsLoading: false,
			contributorsError: undefined,
		})
		.mergeIn(
			['pub', 'contributors'], 
			state.getIn(['pub', 'contributors']).map((contributor)=> {
				if (contributor.get('id') === action.contributorId) {
					return contributor.set('isAuthor', action.isAuthor);
				}
				return contributor;
			})
		);
	case PUT_CONTRIBUTOR_FAIL:
		return state.merge({
			contributorsLoading: false,
			contributorsError: action.error,
		});

	case DELETE_CONTRIBUTOR_LOAD:
		return state.merge({
			contributorsLoading: true,
			contributorsError: false,
		});	
	case DELETE_CONTRIBUTOR_SUCCESS:
		return state.merge({
			contributorsLoading: false,
			contributorsError: undefined,
		})
		.setIn(
			['pub', 'contributors'], 
			state.getIn(['pub', 'contributors']).filter((contributor)=> {
				return contributor.get('id') !== action.deletedContributorId;
			})
		);
	case DELETE_CONTRIBUTOR_FAIL:
		return state.merge({
			contributorsLoading: false,
			contributorsError: action.error,
		});

	case POST_VERSION_LOAD:
		return state.merge({
			versionsLoading: true,
			versionsError: false,
		});	
	case POST_VERSION_SUCCESS:
		return state.merge({
			versionsLoading: false,
			versionsError: undefined,
		})
		.mergeIn(
			['pub', 'versions'], 
			state.getIn(['pub', 'versions']).push(ensureImmutable(action.result))
		);
	case POST_VERSION_FAIL:
		return state.merge({
			versionsLoading: false,
			versionsError: action.error,
		});

	default:
		return ensureImmutable(state);
	}
}