const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL || 'https://reqres.in/api';

/**
 * Creates a record via the API to simulate persisting/validating the employee
 * created through the UI. Returns the API's representation of the record.
 */
async function createEmployeeViaApi({ firstName, lastName, employeeId }) {
  const response = await axios.post(`${API_BASE_URL}/users`, {
    name: `${firstName} ${lastName}`,
    job: employeeId,
  });
  return response.data;
}

/**
 * Fetches a record via the API to cross-check against what the UI displays.
 */
async function getEmployeeViaApi(id) {
  const response = await axios.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
}

/**
 * Deletes a record via the API, mirroring the UI deletion step.
 * Returns the HTTP status code (ReqRes returns 204 with no body).
 */
async function deleteEmployeeViaApi(id) {
  const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
  return response.status;
}

module.exports = { createEmployeeViaApi, getEmployeeViaApi, deleteEmployeeViaApi };