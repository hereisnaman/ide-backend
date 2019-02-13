const {exec} = require('child_process');
const request = require('request-promise');
const models = require('../models');
const secrets = require('../config/config.json')[
  process.env.NODE_ENV || 'development'
];

module.exports = {
  ping: async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorised');
    } else {
      if (!req.user.wakatime_api_key) {
        res
          .status(400)
          .send(
            'Wakatime not integrated. Visit https://account.codingblocks.com/ to add wakatime api key to your profile.',
          );
        return;
      }

      if (!req.body.file_path) {
        res.status(400).send('file_path requried.');
        return;
      }

      res.status(202).send('Accepted');

      exec(
        `wakatime --entity ${req.body.file_path} --key ${
          req.user.wakatime_api_key
        } --language ${
          req.body.language
        } --project "Coding Blocks IDE" --plugin cbide --category coding --write --entity-type domain`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(error);
          }
        },
      );
    }
  },
};
