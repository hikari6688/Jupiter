const { resolve } = require('path');
const Mock = require('mockjs');
const glob = require('glob');
const MOCK_ROOT = '/mock';
let mockData = {};
glob.sync(resolve(__dirname, './', '**/!(index).js')).forEach(file => {
  for (const [path, target] of Object.entries(require(file))) {
    let [method = 'GET', url = '/'] = path.split('|');
    method = method.toUpperCase().trim();
    url = url.toLowerCase().trim().replace(/^\//, '');
    let keyStr = `${method} ${MOCK_ROOT}/${url}`;
    mockData[keyStr] = (req, res) => {
      let body =req.body;
      let query = req.query;
      const mockTarget = typeof target !== 'function' ? target : target({ body, query });
      let data = Mock.mock(mockTarget);
      return res.json(data);
    };
  }
});
module.exports = mockData;