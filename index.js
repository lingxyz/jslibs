request = require('request');

module.exports = function() {
    return function proxy(req, res) {
        require('./getIp')(function(ip) {
            // 根据外网 ip 切换调用开发、测试环境api
            var config = require('./config.json');
            // 转发逻辑
            agent = req.get('User-Agent');
            options = {
                'url': config[(ip == '112.64.124.86' ? 'dev' : 'test')] + req.baseUrl + req.path,
                'method': req.method,
                'qs': req.query,
                'gzip': true,
                'headers': {
                    'User-Agent': agent,
                    'X-Forwarded-For': req.ip
                }
            }

            if (req.is('json')) {
                options.json = true;
                options.body = req.body;
            } else if (req.is('urlencoded')) {
                options.form = req.body
            }
            console.info(options.method, options.url)
            console.dir(options.method == 'GET' ? req.query : req.body)
            console.log('\n')

            request(options).pipe(res);
        })
    };
};