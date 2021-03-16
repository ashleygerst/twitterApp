import React, { Component } from 'react';
import Twitter from './Twitter';

class Datasource extends Component {
  fetchSearchResults = (payload) => {
    const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAI4OHgEAAAAAlbk0HSIAqcc3havrrU9j2NeAQ34%3DzJmzwHuQerd8JJ2TeuHfqwKgBt6bK4tk93w3ocBB2vPuKMF3cG';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${bearerToken}`);
    headers.append('Origin', 'http://localhost:8080');
    const uri = `https://still-ridge-78216.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${payload}&result_type=popular&lang=en`;
    let req = new Request(uri, {
      mode: 'cors',
      method: 'GET',
      headers: headers
    })
    return fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Bad Request');
        }
      })
      .catch(() => {
        console.log('ERROR')
      })
  }
  render() {
    return (
      <Twitter
        fetchSearchResults={this.fetchSearchResults}
      />
    )
  }
}

export default Datasource