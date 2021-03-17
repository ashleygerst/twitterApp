import React, { Component } from 'react';
import { debounce } from 'lodash';

class Twitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      eachResult: [],
      resultsPerPage: 5,
      filterHashtag: '',
      loading: true,
      noResults: false
    };
    this.debounceHandleFetch = debounce(this.debounceHandleFetch.bind(this), 500)
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const renderHashTagButtons = (hashtag, index) => {
      return (
        <button
          className='hashtag'
          onClick={() => {
            this.setState({
              filterHashtag: hashtag
            })
          }}
          key={hashtag + index}>
          {`#${hashtag}`}
        </button>
      )
    }
    const { eachResult, resultsPerPage } = this.state;
    const indexOfLastResult = resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = eachResult.filter(result => {
      return !this.state.filterHashtag || (result.hashtag.findIndex(tag => tag === this.state.filterHashtag) > -1)
    }).slice(indexOfFirstResult, indexOfLastResult)
    const renderResults = currentResults.map(item => {
      const http = 'http';
      const httpIndex = item.tweet.lastIndexOf(http);
      const slicedTweet = item.tweet.slice(0, httpIndex)
      return (
        <div key={item.id} id='tweetContainer' className='tweetContainer'>
          <img id='image' src={item.image} />
          <div className='textContainer'>
            <div className='author'>{`@${item.author}`}</div>
            <div className='tweet'>{slicedTweet}</div>
            <a className='link' href={item.url}>{item.url}</a>
            <div className='hashtags'>
              {item.hashtag.map(renderHashTagButtons)}
            </div>
          </div>
        </div>
      )
    });

    const hashtags = []
    currentResults.forEach(result => {
      result.hashtag.map(tag => {
        hashtags.push(tag);
      })
    })
    const renderHashtagSelector = hashtags.map(renderHashTagButtons);

    return (
      <>
        <div className='pageContainer'>
          <div className='contentContainer'>
            <div className='header'>
              <div className='twitterHeader'>Tweet Feed</div>
              <form onSubmit={this.handleSubmit}>
                <input
                  id='search'
                  placeholder={'Search by keyword'}
                  type='text'
                  value={this.state.query}
                  onChange={this.handleSubmit}
                />
              </form>
            </div>
            {this.state.query && this.state.eachResult.length > 0 ? (
              <>
                <div className='resultContainer'>
                  <div className='resultInfo'>Displaying results for <strong>{this.state.query}</strong> ({!this.state.filterHashtag ? eachResult.length : currentResults.length})</div>
                  {renderResults}
                  {this.state.resultsPerPage < 15 && !this.state.filterHashtag ?
                    <button id='button' onClick={this.handleClick}>Load More</button>
                    : null}
                </div>
                {hashtags.length > 0 &&
                  <div className='hashtagContainer'>
                    <div className='hashtagHeader'>Filter by hashtag</div>
                    {renderHashtagSelector}
                  </div>
                }
              </>
            ) : this.state.noResults ? (
              <>
                <div className='noResultContainer'>
                  <div className='noResults'>Sorry!
                    <br />We didn't find any tweets that contain your search.
                    <br />Please try again.
                  </div>
                  <img id='magoo' src='../images/magoo.png' />
                </div>
              </>
            ) :
                null
            }
          </div>
        </div>
      </>
    );
  }

  handleResults = (results) => {
    if (results.statuses.length > 0) {
      const resultArray = [];
      (results.statuses || []).forEach(searchResult => {
        const url = searchResult.entities.urls.map(url => url.url);
        const author = searchResult.user.screen_name;
        const tweet = searchResult.text;
        const image = searchResult.user.profile_image_url;
        const hashtag = searchResult.entities.hashtags.map(hash => hash.text)
        const id = searchResult.id;
        const eachResult = {
          url,
          author,
          tweet,
          image,
          hashtag,
          id
        }
        resultArray.push(eachResult);
      });
      this.setState({
        eachResult: resultArray,
        noResults: false
      })
    } else {
      this.setState({
        noResults: true
      })
    }
  }

  debounceHandleFetch = () => {
    if (this.state.query.length > 0) {
      this.props.fetchSearchResults(this.state.query).then((results) => {
        this.handleResults(results)
      })
    }
  }

  handleSubmit = (event) => {
    this.handleChange();
    this.setState({
      filterHashtag: '',
      resultsPerPage: 5
    })
    event.preventDefault();
    if (!!this.props.fetchSearchResults) {
      this.debounceHandleFetch(event)
    }
  }

  handleClick = () => {
    this.setState({
      resultsPerPage: this.state.resultsPerPage + 5
    })
  }

  handleChange = () => {
    this.setState({
      query: event.target.value,
      eachResult: []
    });
  }
}
export default Twitter
