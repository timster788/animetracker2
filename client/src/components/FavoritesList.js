import React, { Component } from 'react';
import axios from 'axios';
import FavoritesListItem from './FavoritesListItem';
//=====================================================================================================================================
export default class FavoritesList extends Component {
  constructor() {
    super();
    this.state = {
      dbData: null
    };
    this.renderFavoritesList = this.renderFavoritesList.bind(this);
  }
  //=====================================================================================================================================
  componentDidMount() {
    axios
      .get('/favorites')
      .then(res => {
        this.setState({
          dbData: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //=====================================================================================================================================
  renderFavoritesList() {
    if (this.state.dbData) {
      return this.state.dbData.map(manganime => {
        return <FavoritesListItem key={manganime.id} data={manganime} />;
      });
    } else {
      return <div>Your list is empty</div>;
    }
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="FavoritesList">
        {/* <div id="edit-favorite"><Link to={`/edit/${props.movies.id}`} moves={props.movies}>Edit</Link></div> */}
        <div id="favorite-header">My Favorites</div>
        {this.renderFavoritesList()}
      </div>
    );
  }
}
//=====================================================================================================================================
