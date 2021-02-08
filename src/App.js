import React from 'react';
import { connect } from 'react-redux';
// import { clearSearch } from './actions';
import {submitSearch, clearSearch} from './reducers';
import './App.css';
import Book from './book';

import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
  card: {
    width: '100%',
    maxHeight: '60vh',
    overflowY: 'scroll',
  },
  savedContainer: {
    position: 'absolute',
    top: '25vh',
    paddingLeft: '5vw',
    zIndex: -1
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      query: '',
      expanded: null,
      submitted: false,
    }
  }

  clearSearch = (e) => {
    e.preventDefault();
    this.setState({query: '', submitted: false});
    this.props.clearSearch();
  }

  onSearchTextChange = (e) => {
    e.preventDefault();
    const query = e.currentTarget.value;

    this.setState({query});
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const {query} = this.state;
    if (query && query.length > 0) {
      this.props.submitSearch(query);
    }

    this.setState({submitted: true})
  }


  handleExpand = (result) => {
    this.setState({expanded: result})
  }

  handleDialogClose = () => {
    this.setState({expanded: null})
  }

  render() {
    const {classes} = this.props
    const { searchResults, savedBooks, savedTitles, loading } = this.props
    const {query, expanded, submitted} = this.state;


    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{padding: '5vw'}}
      > 
        <form onSubmit={this.handleSearchSubmit}
        style={{width: 'inherit'}}>
          <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center">
            <Grid
            item
            xs={10}>
            <TextField 
            value={query}
            placeholder="Search Book Titles..."
            onChange={this.onSearchTextChange}
            fullWidth
            InputProps={{
              endAdornment: 
              <InputAdornment position="end">
                <IconButton onClick={this.clearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            }}
            />
            </Grid>
            <Grid
            item>
            <Button type="submit" variant="outlined">
              Search
            </Button>
            </Grid>
          </Grid>
        
        
        </form>
        {submitted && 
          <Card className={classes.card}>
            <List >
              {searchResults.length === 0 && 
                <ListItem>
                  <ListItemText
                    primary={loading === 'idle'? 'No results to show':'Searching...'}
                    />
                </ListItem>
              }
              {searchResults && searchResults.map((item, i) => {
                return (
                  <Book 
                    key = {i} 
                    book = {item}
                    handleExpand = {this.handleExpand}
                  />)
              })}  
            </List>
          </Card>
        }
        
        <Grid
        item
        xs={10}
        container
        direction='column'
        justify='center'
        alignItems='flex-start'
        className={classes.savedContainer}
        >
          <Typography variant='h5' gutterBottom >
            Saved: {savedTitles.length}
          </Typography>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
          >
          {savedBooks && Object.keys(savedBooks).map((key, i) => {
            return (
              <Card
              style={{margin: '0.2vh 0.2vw'}}
              key={i}
              >
                <Book
                detail={true}
                book = {savedBooks[key]}
                />
              </Card>)
          })}
          </Grid>
        </Grid>

        {Boolean(expanded) && 
          <Dialog
            open={Boolean(expanded)}
            onClose={this.handleDialogClose}
          >
            <Book
              detail={true}
              key={expanded.title}
              book = {expanded}
              />
          </Dialog>
        }
      </Grid>
    );
  }
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  savedBooks: state.savedBooks,
  savedTitles: state.savedTitles,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  submitSearch: bookTitle => dispatch(submitSearch(bookTitle)),
  clearSearch: () => dispatch(clearSearch()),
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
