import {text} from 'd3-request';
import {docPages, examplePages} from '../constants/pages';
export function loadContent() {
  return (dispatch, getState) => {
    docPages.forEach(loadDoc(dispatch, getState));
    examplePages.forEach(loadDoc(dispatch, getState));
  };
}

function loadDoc(dispatch, getState) {
  return documentationSection => {
    documentationSection.children.forEach(docPage => {
      const filename = docPage.content.markdown;
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
