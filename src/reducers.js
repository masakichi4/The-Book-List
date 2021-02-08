import { createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
	// searchResults: [{title: "Book 1", author: "Anon", description: "An example book for testing"},
	// {title: "Book 2", author: "Anon", description: "A long long long long long long long long long long long long long long long\
	// long long long long long long long long long long long long long long long long long long long long long long long description"}],
	savedBooks: {},
	savedTitles: [],
	searchResults: [],
	loading: 'idle',
}

export const saveBook = createAction('book/saveBook');
export const unsaveBook = createAction('book/unsaveBook');
export const clearSearch = createAction('book/clearSearch');
export const tagBook = createAction('book/tagBook');
export const untagBook = createAction('book/untagBook');
export const searchComplete = createAction('book/searchComplete');
export const searchPending = createAction('book/searchPending');


export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(unsaveBook, (state, action) => {

      const book = action.payload;

      if (state.savedBooks[book.title]) {
      	state.savedTitles = state.savedTitles.filter(b=>b !== book.title);
        delete state.savedBooks[book.title];
      }

    })
    .addCase(saveBook, (state, action) => {

      const book = action.payload;

      if (!state.savedBooks[book.title]) {
      	state.savedTitles.push(book.title);
      	state.savedBooks[book.title] = book;
      }

    })
    .addCase(clearSearch, (state, action) => {

    	state.searchResults = [];
    
    })
    .addCase(tagBook, (state, action) => {
    
      const {book, tag} = action.payload;

      state.savedBooks = Object.keys(state.savedBooks).map( key => {
			if (state.savedBooks[key].title === book.title) {
				if (!state.savedBooks[key].tags) {
					state.savedBooks[key].tags = [];
				} 
				if (state.savedBooks[key].tags.length <= 3 && !state.savedBooks[key].tags.includes(tag)) {
					state.savedBooks[key].tags.push(tag);
				}
			}
			return state.savedBooks[key];
		})
    
    })
    .addCase(untagBook, (state, action) => {
    
      const {book, tag} = action.payload;
      state.savedBooks = Object.keys(state.savedBooks).map( key => {
					if (state.savedBooks[key].title === book.title) {
						state.savedBooks[key].tags = state.savedBooks[key].tags.filter(t => t !== tag);
					}
					return state.savedBooks[key];
				})
    
    })
    .addCase(searchComplete, (state, action) => {

    	if (state.loading === 'pending') {
    		state.searchResults = action.payload;
	        state.loading = 'idle';
	    }
    
    })
    .addCase(searchPending, (state, action) => {

    	if (state.loading === 'idle') {
	        state.loading = 'pending';
	      }
    
    })
    .addDefaultCase((state, action) => {})
})

export const submitSearch = (title) => {
	
	return async (dispatch, getState) => {
		
		try {
	      dispatch(searchPending());

	      // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	      const history = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';

	      const api_key = process.env.REACT_APP_NYTIMES_API;

	      let historyResults = await axios.get(history, {params: {title, 'api-key': api_key}});

	      dispatch(searchComplete(historyResults.data.results));
	    } catch(error) {
	      if ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && error.response) {
	        return error.response;
	      }
	    }
	}
  }


