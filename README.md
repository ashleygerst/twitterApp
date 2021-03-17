
### Prerequisites
* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.

### To run
* Fork and clone the project:

```
git clone https://github.com/ReactJSResources/react-webpack-babel.git
```

* Then install the dependencies:

```
npm install
npm rebuild node-sass
```

* Run development server:

```
npm run dev
```

Open the web browser to `http://localhost:8080/`

### To test
1. Type in search bar

**Expected Results**
- if the search is valid, user will see popular results in English for their search term in .5 seconds
- if the API does not return result for user's query, user will see a "no results" message
- user will see message "Displaying results for" search term + number of search results
- user can click Load More to view more than 5 results, Load More will not display if no there are no additional results 
- user can click on a hashtag in tweet or hashtag container to filter search term by hashtag
- user can click on tweet url to be navigated to the tweet
