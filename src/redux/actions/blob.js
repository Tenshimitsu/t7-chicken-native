// Initial In-App Stub Data
import initialData from '../../util/initialData.json';
import * as AsyncStorageUtil from '../../util/asyncStorageUtil.js';

// BLOB Types
export const BLOB_SET_INITIAL_DATA = 'BLOB_SET_INITIAL_DATA';
export const BLOB_UPDATE_DATA = 'BLOB_UPDATE_DATA';
export const BLOB_FETCH_SUCCESS = 'BLOB_FETCH_SUCCESS';
export const BLOB_FETCH_ERROR = 'BLOB_FETCH_ERROR';

const CHAR_DATA_API = "http://bdickason.com:3001/api/framedata";
const CHAR_METADATA_API = "http://bdickason.com:3001/api/metadata"
const DATA_VER_API = "";
/**
 *  @method: checkDataVersion
 *  Will get the current version of data, and compare it to local
 *  Will return if version matches or not
 */
const checkIfDataOutdated = (localTimeStamp) => {
  return fetch(CHAR_METADATA_API)
    .then((response) => {
      return response.json()
    }).then((json) => {
      return localTimeStamp !== json.alisa.last_updated;
    })
    .catch((error) => {
      console.log(error);
      return true;
    });
};

const dataFetchSuccess = (response) => {
  AsyncStorageUtil.storeAppData(response);
	return {
    type: BLOB_FETCH_SUCCESS,
    payload: response,
  };
};

const dataFetchError = (err, fallbackData) => {
  return {
    type: BLOB_FETCH_ERROR,
    error: err,
    fallbackData
  };
};

const fetchDataFromAPI = (fallbackData) => {
  return dispatch => {
    fetch(CHAR_DATA_API)
      .then((response) => {
        console.log(response);
        return response.json()
      })
      .then((json) => {
        dispatch(dataFetchSuccess(json));
      })
      .catch((error) => {
        console.log('this gets run')
        dispatch(dataFetchError(error, fallbackData));
      });
  };
};

const setInitialData = (payload) => {
  return {
    type: BLOB_SET_INITIAL_DATA,
    payload
  };
};

export const fetchInitialAppData = () => {
  // Will need to check if LocalStorage data exists (if not, use in-app stub data)
  // reach ver endpoint and check version number
  // if version doesn't match, make call to retrieve new data
  // set data in state
  // AsyncStorageUtil.clearAppData()
  let appData = initialData.data;
  const timeStamp = initialData.timestamp;
  return dispatch => {
    AsyncStorageUtil.fetchAppData()
    .then((storedData) => {
      appData = storedData;
      appData = storedData || appData;
      //check if data is out of date by hitting version endpoint
      checkIfDataOutdated(timeStamp).then((outDated) => {
        console.log('out dated', outDated);
        if (outDated === true) {
          return dispatch(fetchDataFromAPI(appData));
        } else {
          return dispatch(setInitialData(appData));
        }
      });
      if (appData) {
        dispatch(setInitialData(appData));
      } else {
        dispatch(fetchDataFromAPI(appData));
      }
    })
    .catch((err) => dispatch(fetchDataFromAPI(appData)) );
  }
};
