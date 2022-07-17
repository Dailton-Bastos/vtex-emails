const { writeFileSync } = require('fs');

const files = require('./files');

const { MainAccountName, AccountName, Cnpj, Id } = require('./account');

files.forEach((data) => {
  const { _accountInfo } = data;

  _accountInfo.MainAccountName = MainAccountName;
  _accountInfo.AccountName = AccountName;
  _accountInfo.Cnpj = Cnpj;
  _accountInfo.Id = Id;

  const path = `./src/data/vtex/${data.id}.json`;

  try {
    writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('Write file error', error);
  }
});
