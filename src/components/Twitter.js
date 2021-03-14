import React, { Component, useState } from 'react';

const eachResult = []
class Twitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'science',
      eachResult,
      resultsPerPage: 5
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSearchResults(this.state.query);
    this.handleResults();
  }
  render() {
    const { eachResult, resultsPerPage } = this.state;
    const indexOfLastResult = resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = eachResult.slice(indexOfFirstResult, indexOfLastResult);
    const renderResults = currentResults.map(item => {
      return (
        <div id='tweetContainer' className='tweetContainer'>
          <img id='image' src={item.image} />
          <div className='textContainer'>
            <div className='author' key={item.id}>{`@${item.author}`}</div>
            <div className='tweet' key={item.id}>{item.tweet}</div>
          </div>
          <a href={item.url} />
        </div>
      )
    });

    return (
      <>
        <div className='twitterHeader'>Tweet Feed</div>
        <div className='pageContainer'>
          <div className='container'>
            <form onSubmit={this.handleSubmit}>
              <input
                id='search'
                placeholder={'Search by keyword'}
                type='text'
                value={this.state.query}
                onChange={this.handleChange}
              />
            </form>
            <br />
            <div className='resultContainer'>
              {renderResults}
              <button id='button' onClick={this.handleClick}>Load More</button>
            </div>
          </div>
          <div className='hashtagContainer'>
            <div className='hashtagHeader'>Filter by hashtag</div>
          </div>
        </div>
      </>
    );
  }

  handleResults = () => {
    const result = this.props.results
    result.statuses?.forEach(searchResult => {
      const url = searchResult.user.url;
      const author = searchResult.user.screen_name;
      const tweet = searchResult.text;
      const image = searchResult.user.profile_image_url;
      const eachResult = {
        url,
        author,
        tweet,
        image
      }
      const resultArray = this.state.eachResult
      resultArray.push(eachResult);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.fetchSearchResults) {
      this.props.fetchSearchResults(this.state.query)
    }
    this.handleResults();
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
