import React, { Component } from 'react';
// import SingleAnimeSearchResult from "./SingleAnimeSearchResult";
import SingleMangaSearchResult from './SingleMangaSearchResult';
import { Link } from 'react-router-dom';
//=====================================================================================================================================
export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
      title: this.props.title,
      seriesType: this.props.seriesType,
      offset: 0,
      page: 1
    };
  }
  //=====================================================================================================================================
  renderResults() {
    let divId = 1;
    console.log(this.state);
    return this.state.results.data.map(manganime => {
      let bg = {
        backgroundImage: `url(${manganime.attributes.posterImage.original})`
      };
      let singleAnime = {
        pathname: `/${manganime.type}/${manganime.id}`,
        searchResult: true,
        url: this.props.url
      };
      return (
        <Link
          to={singleAnime}
          key={manganime.id}
          className="SearchResultItem"
          id={`manganime${divId++}`}
          style={bg}
        >
          {/* onClick={() => this.handleClick(manganime.type, manganime.id)}> */}
          <span className="title">
            {manganime.attributes.titles.en_us
              ? manganime.attributes.titles.en_us
              : ''}
            {!manganime.attributes.titles.en_us &&
            manganime.attributes.titles.en
              ? manganime.attributes.titles.en
              : ''}
            {!manganime.attributes.titles.en &&
            manganime.attributes.titles.en_jp
              ? manganime.attributes.titles.en_jp
              : ''}
            {!manganime.attributes.titles.en_jp &&
            manganime.attributes.titles.ja_jp
              ? manganime.attributes.titles.ja_jp
              : ''}
            {manganime.attributes.titles.en_cn
              ? manganime.attributes.titles.en_cn
              : ''}
            {!manganime.attributes.titles.en_cn &&
            manganime.attributes.titles.zh_cn
              ? manganime.attributes.titles.zh_cn
              : ''}
            {manganime.attributes.titles.en_kr
              ? manganime.attributes.titles.en_kr
              : ''}
            {!manganime.attributes.titles.en_kr &&
            manganime.attributes.titles.ko_kr
              ? manganime.attributes.titles.ko_kr
              : ''}
          </span>
        </Link>
      );
    });
  }
  //=====================================================================================================================================
  renderResultsNext() {
    let divId = 1;
    console.log(this.state);
    return this.state.resultsNext.map(manganime => {
      let bg = {
        backgroundImage:
          'url(' + manganime.attributes.posterImage.original + ')'
      };
      let singleAnime = {
        pathname: `/${manganime.type}/${manganime.id}`,
        searchResult: true
      };
      return (
        <Link
          to={singleAnime}
          key={manganime.id}
          className="SearchResultItem"
          id={`manganime${divId++}`}
          style={bg}
        >
          {/* onClick={() => this.handleClick(manganime.type, manganime.id)}> */}
          <span className="title">
            {manganime.attributes.titles.en_us
              ? manganime.attributes.titles.en_us
              : ''}
            {!manganime.attributes.titles.en_us &&
            manganime.attributes.titles.en
              ? manganime.attributes.titles.en
              : ''}
            {!manganime.attributes.titles.en &&
            manganime.attributes.titles.en_jp
              ? manganime.attributes.titles.en_jp
              : ''}
            {!manganime.attributes.titles.en_jp &&
            manganime.attributes.titles.ja_jp
              ? manganime.attributes.titles.ja_jp
              : ''}
            {manganime.attributes.titles.en_cn
              ? manganime.attributes.titles.en_cn
              : ''}
            {!manganime.attributes.titles.en_cn &&
            manganime.attributes.titles.zh_cn
              ? manganime.attributes.titles.zh_cn
              : ''}
            {manganime.attributes.titles.en_kr
              ? manganime.attributes.titles.en_kr
              : ''}
            {!manganime.attributes.titles.en_kr &&
            manganime.attributes.titles.ko_kr
              ? manganime.attributes.titles.ko_kr
              : ''}
          </span>
        </Link>
      );
    });
  }
  //=====================================================================================================================================
  // handleClick(type, id) {
  //   fetch(`https://kitsu.io/api/edge/${type}/${id}`)
  //   .then(data => data.json())
  //   .then(data => {
  //     if (type === "anime") {
  //       this.setState({
  //         results: false,
  //         resultsNext: false,
  //         anime: data
  //       })
  //     } else if (type === "manga") {
  //       this.setState({
  //         results: false,
  //         resultsNext: false,
  //         manga: data
  //       })
  //     }
  //   })
  // }
  //=====================================================================================================================================
  nextPage() {
    let offsetIncrement = this.state.offset + 20;
    let pageNumber = this.state.page + 1;
    fetch(
      `https://kitsu.io/api/edge/${this.state.seriesType}?filter%5Btext%5D=${
        this.state.title
      }&page%5Blimit%5D=20&page%5Boffset%5D=${offsetIncrement}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          nextPage: true,
          resultsNext: data.data,
          results: false,
          offset: offsetIncrement,
          page: pageNumber
        });
      });
  }
  //=====================================================================================================================================
  prevPage() {
    if (this.state.offset > 1) {
      let offsetDecrement = this.state.offset - 20;
      let pageNumber = this.state.page - 1;
      fetch(
        `https://kitsu.io/api/edge/${this.state.seriesType}?filter%5Btext%5D=${
          this.state.title
        }&page%5Blimit%5D=20&page%5Boffset%5D=${offsetDecrement}`
      )
        .then(data => data.json())
        .then(data => {
          this.setState({
            nextPage: true,
            resultsNext: data.data,
            offset: offsetDecrement,
            page: pageNumber
          });
        });
    }
  }
  //=====================================================================================================================================
  render() {
    return (
      <div className="SearchResults">
        <div />
        {this.state.results || this.state.resultsNext ? (
          <input
            id="previous"
            className="button"
            type="button"
            onClick={() => this.prevPage()}
            value="Previous"
          />
        ) : (
          ''
        )}
        {this.state.results || this.state.resultsNext ? (
          <div id="offset">Page: {this.state.page}</div>
        ) : (
          ''
        )}
        {this.state.results || this.state.resultsNext ? (
          <input
            id="next"
            className="button"
            type="button"
            onClick={() => this.nextPage()}
            value="Next"
          />
        ) : (
          ''
        )}
        <div />
        {this.state.results ? this.renderResults() : ''}
        {this.state.resultsNext ? this.renderResultsNext() : ''}
        {/* {this.state.anime ? <SingleAnimeSearchResult anime={this.state.anime} /> : ""} */}
        {this.state.manga ? (
          <SingleMangaSearchResult manga={this.state.manga} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
//=====================================================================================================================================
