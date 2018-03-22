var express = require('express');
var router = express.Router();
const discoveryOrigin = require("../libs/kumuluz/modules/discovery/index");
const discovery = requireDefault(discoveryOrigin);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({sporocilo: "Pozdravljen svet!"});
});

router.get("/config", async function(req, res, next) {
  const resp = await discovery.default.discoverService({
    value: "vprasanja-service",
    version: "1.0.0",
    environment: "dev",
    accessType: "DIRECT"
  });
  res.json({url: resp});
});

module.exports = router;

function requireDefault(module) {
	if (module && module.__esModule) {
		return module;
	} else {
		return {default: module};
	}
}
