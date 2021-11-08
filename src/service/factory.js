import Humps from 'humps';
import axios from 'axios';
import _ from 'underscore';
import queryString from 'query-string';

let dispatcher = null;

export const makeHttpClient = ({
  baseUrl,
  csrfToken,
  withCredentials = false,
  dispatcher: dispatcherFromContext,
}) => {
  if (!dispatcher && dispatcherFromContext) {
    dispatcher = dispatcherFromContext;
  }
  const handleStatus = (ajaxObject) =>
    ajaxObject.then((response) => {
      if (dispatcher) {
        dispatcher({
          type: 'BROADCAST_API_STATUS',
          response,
        });
      }
      return response;
    });
  const client = axios.create({
    baseURL: baseUrl,
    withCredentials,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    transformResponse: [JSON.parse, Humps.camelizeKeys],
    transformRequest: [Humps.decamelizeKeys, JSON.stringify],
    paramsSerializer: function (params) {
      return queryString.stringify(
        _.omit(Humps.decamelizeKeys(params), (value) => {
          if (_.isNumber(value)) {
            return false;
          }
          return _.isEmpty(value);
        }),
        {
          arrayFormat: 'bracket',
        },
      );
    },
  });

  const extracter = ({ data }) => data;

  const getJSON = (url, data = {}, options = {}) =>
    handleStatus(
      client.get(url, {
        ...options,
        params: data,
      }),
    ).then(extracter);

  const postJSON = (url, data = {}, options = {}) =>
    handleStatus(client.post(url, data, options)).then(extracter);
  const putJSON = (url, data = {}, options = {}) =>
    handleStatus(client.put(url, data, options)).then(extracter);
  const deleteJSON = (url, { id }, options = {}) =>
    handleStatus(client.delete(url, { ...options, params: { id } })).then(
      extracter,
    );

  return {
    getJSON,
    postJSON,
    putJSON,
    deleteJSON,
  };
};
