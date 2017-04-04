import {text} from 'd3-request';

export function loadSinglePage(content) {
  return (dispatch, getState) => {
    const filename = content.markdown;
    if (!filename) {
      return;
    }
    const contents = getState();
    if (contents.markdownPages.get(filename)) {
      // already loaded
      return;
    }
    dispatch(loadContentStart(filename));
    text(filename, (error, response) => {
      dispatch(loadContentSuccess(filename, error ? error.target.response : response));
    });
  };
}

function loadContentStart(name) {
  return loadContentSuccess(name, '');
}

function loadContentSuccess(name, content) {
  const payload = {};
  payload[name] = content;
  return {type: 'LOAD_CONTENT', payload};
}
