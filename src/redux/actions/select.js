// Action Types
export const SELECT_UPDATE_SEARCH = 'SELECT_UPDATE_SEARCH';
export const SELECT_UPDATE_CHARACTERS = 'SELECT_UPDATE_CHARACTERS';

/*  method: formatData
 *  @param: rawData [object]
 *  @return formattedData [array]
 *  Will convert object with each 'character' as properties to an array of characters
 *  NEED TO DECIDE ON WHAT IS BEST WAY TO HANDLE THE DATA
 */
const formatRawData = (rawData) => {
  const characterData = Object.keys(rawData)
    .map((char) => Object.assign({}, {name: char}, rawData[char]));
  return characterData;
};

/**
 *  method: filterCharacters
 *  @param: searchQuery [string]
 *  @return: characters [array]
 *  take in search query and return array of characters that match
 */
const searchCharacters = (searchQuery) => {
  searchQuery = searchQuery.trim();
  return (dispatch, getState) => {
    const currentState = getState();
    const allCharacters = currentState.blob.characterData;
    const filteredCharacters = allCharacter.filter((char) => char.includes(searchQuery))

    return Promise.all([
      dispatch(updateSearchFilter(searchQuery)),
      dispatch(updateCharacters(filterCharacters))
    ]);
  }
};

const updateCharacters = (characters) => {
  return {
    type: SELECT_UPDATE_CHARACTERS,
    characters
  };
};

// keep track of search query used for filtering characters
const updateSearchFilter = (searchQuery) => {
  return {
    type: SELECT_UPDATE_SEARCH,
    search: searchQuery
  }
};

/**
 *  Initial Character Data Fetch for Select Screen
 */
export const fetchCharacters = () => {
  return (dispatch, getState) => {
    const currentState = getState();
    const charactersList = formatRawData(currentState.blob.characterData);
    return dispatch(updateCharacters(charactersList));
  };
};
