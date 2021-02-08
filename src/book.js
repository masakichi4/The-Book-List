import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unsaveBook, saveBook, tagBook, untagBook } from './reducers';

import Chip from '@material-ui/core/Chip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';


import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddIcon from '@material-ui/icons/Add';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: ''
    }
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

  handleTagDelete = (tag) => {
    const {book} = this.props;

    this.props.untagBook({book, tag});
  }

  onTagChange = (e) => {
    this.setState({tag:e.target.value});
  }

  onTagClear = (e) => {
    this.setState({tag: ''});
  } 

  onTagSubmit = (e) => {
    e.preventDefault();
    const {book} = this.props;
    const {tag} = this.state;

    this.props.tagBook({book, tag});
    this.setState({tag: ''});
  }

  render() {
    const {book, detail, savedTitles} = this.props;
    const {tag} = this.state;
    const saved = savedTitles.includes(book.title);

    return (
      <div>
      {detail? 
        <DialogContent
        style={{width: '22vw'}}>
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='stretch'
          >
            <Typography gutterBottom variant='h6'>{book.title}</Typography>
            
          </Grid>
          <Typography gutterBottom style={{color: 'gray', fontStyle: 'italic'}}>&nbsp;{book.author}</Typography>

          {book.isbns && book.isbns.map((isbn, i) => {
            return (
              <Typography 
              gutterBottom 
              key={i}
              style={{fontStyle: 'italic'}}>
                ISBN: {book.isbns[i]['isbn10']}, {book.isbns[i]['isbn13']}
              </Typography>
            )
          })}
          <Typography gutterBottom >{book.description}</Typography>

          <DialogActions>
            {saved && book.tags && 
              book.tags.map(t => {
                return (
                  <Chip
                    key={t}
                    id={t}
                    variant="outlined"
                    size="medium"
                    label={<Tooltip title={t}><div>{t}</div></Tooltip>}
                    onDelete={() => {this.handleTagDelete(t)}}
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: '18vw'
                        }}
                  />
                  )
              })              
            }
            {saved && (!book.tags || book.tags.length < 3)&& 
              <Chip
                variant="outlined"
                size="medium"
                icon={<AddIcon />}
                label={
                    <form 
                    onSubmit={this.onTagSubmit}>
                      <InputBase 
                      placeholder='Add up to three tags'
                      value={tag} 
                      onChange={this.onTagChange}/>
                  </form>
                  }
                onDelete={this.onTagClear}
              />
            }
            <IconButton onClick={this.handleSaveToggle}>
              {saved? <BookmarkIcon id='save_button' style={{color: 'green'}}/>:<BookmarkBorderIcon id='save_button' />}
            </IconButton>
          </DialogActions>

        </DialogContent>
        : 
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
      }   
      </div> 
    );
  } 
}

Book.propTypes = {
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
  tagBook: payload => dispatch(tagBook(payload)),
  untagBook: payload => dispatch(untagBook(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
