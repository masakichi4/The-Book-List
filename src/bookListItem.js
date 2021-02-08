import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unsaveBook, saveBook } from './reducers';

import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

class BookListItem extends React.Component {
  constructor(props) {
    super(props);

  }

  handleClick = (e) => {
    e.preventDefault();
    const {book} = this.props;

    this.props.handleExpand(book)
  }

  handleSaveToggle = (e) => {
    e.preventDefault();
    const {book} = this.props;

    const saved = this.props.savedTitles.includes(book.title);
    if (saved) {
      this.props.unsaveBook(book);
    } else {
      this.props.saveBook(book);
    }
  }


  render() {
    const {book, detail, savedTitles} = this.props;
    const {tag} = this.state;
    const saved = savedTitles.includes(book.title);

    return (      
      <ListItem 
        button
        alignItems="flex-start" 
        divider
        key={book.title}
        id='item'
      >
        <ListItemText
          primary = {book.title}
          secondary = {book.author}
          onClick={this.handleClick}
        />          
        <IconButton onClick={this.handleSaveToggle}>
          {saved? <BookmarkIcon id='save_button' style={{color: 'green'}}/>:<BookmarkBorderIcon id='save_button' />}
        </IconButton> 
        
      </ListItem>  

    );
  } 
}

BookListItem.propTypes = {
  detail: PropTypes.bool,
  book: PropTypes.object,
  handleExpand: PropTypes.func,
};

const mapStateToProps = state => ({
  savedTitles: state.savedTitles,
});

const mapDispatchToProps = dispatch => ({
  saveBook: book => dispatch(saveBook(book)),
  unsaveBook: book => dispatch(unsaveBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookListItem);
