import axios from 'axios';

// AXIOS CONFIG OPTIONS
axios.defaults.timeout = 15000;
// END OF CONFIG

const http = axios;
const httpCtor = function({ http }) {
  function get() {
    return http.get
  };

  function post() {
    return http.post
  }

  return {
    get,
    post
  }
}

export default httpCtor({ http });