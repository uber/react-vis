import React, {Component} from 'react';

import TableOfContents from './table-of-contents';
import {docPages} from '../constants/pages';

import {injectExamplesIntoHtml, convertMarkdownToReact} from './utils';
import {Link} from 'react-router';

class Search extends Component {

  render() {
    const {searchWorker, searchResults, searchLoaded} = this.props;
    return (
      <div className="f fg">
        <TableOfContents pages={docPages} parentRoute={'/documentation'}/>
        <div className="search-page f fg fcol">
          <div className="search-header f fg">
            {searchLoaded ? <input
              className="search-bar f fg"
              onChange={(val) => {
                searchWorker.postMessage({
                  actionType: 'search',
                  searchString: val.target.value
                });
              }}
              placeholder="SEARCH DOCS"
              /> : 'LOADING'}
          </div>
          <div className="markdown">
            {(searchResults || []).map((result, index) => {
              return (
                <Link className="search-preview f fg fcol" key={index} to={result.link.slice(1)}>
                  <div className="search-result-title">{result.name}</div>
                  {injectExamplesIntoHtml(convertMarkdownToReact(result.text), true)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

}
Search.defaultProps = {
  searchResults: []
};

export default Search;
