const deployments = {};

deployments['1'] = {};
deployments['1'].main = {};
deployments['1'].main.CoreProxy = require('./1-main/CoreProxy');
deployments['1'].main.AccountProxy = require('./1-main/AccountProxy');
deployments['1'].main.USDProxy = require('./1-main/USDProxy');
deployments['1'].main.OracleManagerProxy = require('./1-main/OracleManagerProxy');
deployments['1'].main.SNXToken = require('./1-main/SNXToken');

deployments['10'] = {};
deployments['10'].main = {};
deployments['10'].main.CoreProxy = require('./10-main/CoreProxy');
deployments['10'].main.AccountProxy = require('./10-main/AccountProxy');
deployments['10'].main.USDProxy = require('./10-main/USDProxy');
deployments['10'].main.OracleManagerProxy = require('./10-main/OracleManagerProxy');
deployments['10'].main.SpotMarketProxy = require('./10-main/SpotMarketProxy');
deployments['10'].main.SNXToken = require('./10-main/SNXToken');

deployments['11155111'] = {};
deployments['11155111'].main = {};
deployments['11155111'].main.CoreProxy = require('./11155111-main/CoreProxy');
deployments['11155111'].main.AccountProxy = require('./11155111-main/AccountProxy');
deployments['11155111'].main.USDProxy = require('./11155111-main/USDProxy');
deployments['11155111'].main.OracleManagerProxy = require('./11155111-main/OracleManagerProxy');

deployments['420'] = {};
deployments['420'].main = {};
deployments['420'].main.CoreProxy = require('./420-main/CoreProxy');
deployments['420'].main.AccountProxy = require('./420-main/AccountProxy');
deployments['420'].main.USDProxy = require('./420-main/USDProxy');
deployments['420'].main.OracleManagerProxy = require('./420-main/OracleManagerProxy');
deployments['420'].main.TrustedMulticallForwarder = require('./420-main/TrustedMulticallForwarder');
deployments['420'].main.SpotMarketProxy = require('./420-main/SpotMarketProxy');
deployments['420'].main.PerpsMarketProxy = require('./420-main/PerpsMarketProxy');
deployments['420'].main.PerpsAccountProxy = require('./420-main/PerpsAccountProxy');
deployments['420'].main.SNXToken = require('./420-main/SNXToken');

deployments['5'] = {};
deployments['5'].main = {};
deployments['5'].main.CoreProxy = require('./5-main/CoreProxy');
deployments['5'].main.AccountProxy = require('./5-main/AccountProxy');
deployments['5'].main.USDProxy = require('./5-main/USDProxy');
deployments['5'].main.OracleManagerProxy = require('./5-main/OracleManagerProxy');
deployments['5'].main.SNXToken = require('./5-main/SNXToken');

deployments['8453'] = {};
deployments['8453'].andromeda = {};
deployments['8453'].andromeda.CoreProxy = require('./8453-andromeda/CoreProxy');
deployments['8453'].andromeda.AccountProxy = require('./8453-andromeda/AccountProxy');
deployments['8453'].andromeda.USDProxy = require('./8453-andromeda/USDProxy');
deployments['8453'].andromeda.OracleManagerProxy = require('./8453-andromeda/OracleManagerProxy');
deployments[
  '8453'
].andromeda.TrustedMulticallForwarder = require('./8453-andromeda/TrustedMulticallForwarder');
deployments['8453'].andromeda.SpotMarketProxy = require('./8453-andromeda/SpotMarketProxy');
deployments['8453'].andromeda.PerpsMarketProxy = require('./8453-andromeda/PerpsMarketProxy');
deployments['8453'].andromeda.PerpsAccountProxy = require('./8453-andromeda/PerpsAccountProxy');
deployments['8453'].andromeda.USDCToken = require('./8453-andromeda/USDCToken');
deployments['8453'].andromeda.SNXToken = require('./8453-andromeda/SNXToken');
deployments['8453'].andromeda.SynthUSDCToken = require('./8453-andromeda/SynthUSDCToken');

deployments['84531'] = {};
deployments['84531'].andromeda = {};
deployments['84531'].andromeda.CoreProxy = require('./84531-andromeda/CoreProxy');
deployments['84531'].andromeda.AccountProxy = require('./84531-andromeda/AccountProxy');
deployments['84531'].andromeda.USDProxy = require('./84531-andromeda/USDProxy');
deployments['84531'].andromeda.OracleManagerProxy = require('./84531-andromeda/OracleManagerProxy');
deployments[
  '84531'
].andromeda.TrustedMulticallForwarder = require('./84531-andromeda/TrustedMulticallForwarder');
deployments['84531'].andromeda.SpotMarketProxy = require('./84531-andromeda/SpotMarketProxy');
deployments['84531'].andromeda.PerpsMarketProxy = require('./84531-andromeda/PerpsMarketProxy');
deployments['84531'].andromeda.PerpsAccountProxy = require('./84531-andromeda/PerpsAccountProxy');
deployments[
  '84531'
].andromeda.FakeCollateralfUSDC = require('./84531-andromeda/FakeCollateralfUSDC');
deployments['84531'].andromeda.SynthUSDCToken = require('./84531-andromeda/SynthUSDCToken');

deployments['84532'] = {};
deployments['84532'].andromeda = {};
deployments['84532'].andromeda.CoreProxy = require('./84532-andromeda/CoreProxy');
deployments['84532'].andromeda.AccountProxy = require('./84532-andromeda/AccountProxy');
deployments['84532'].andromeda.USDProxy = require('./84532-andromeda/USDProxy');
deployments['84532'].andromeda.OracleManagerProxy = require('./84532-andromeda/OracleManagerProxy');
deployments[
  '84532'
].andromeda.TrustedMulticallForwarder = require('./84532-andromeda/TrustedMulticallForwarder');
deployments['84532'].andromeda.SpotMarketProxy = require('./84532-andromeda/SpotMarketProxy');
deployments['84532'].andromeda.PerpsMarketProxy = require('./84532-andromeda/PerpsMarketProxy');
deployments['84532'].andromeda.PerpsAccountProxy = require('./84532-andromeda/PerpsAccountProxy');
deployments[
  '84532'
].andromeda.FakeCollateralfUSDC = require('./84532-andromeda/FakeCollateralfUSDC');
deployments['84532'].andromeda.SynthUSDCToken = require('./84532-andromeda/SynthUSDCToken');
deployments.AllErrors = require('./AllErrors');
exports.deployments = deployments;
