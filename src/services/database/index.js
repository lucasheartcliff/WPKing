const Realm = require('realm');
import { image, settings } from './schema';

const openDatabase = () =>
  Realm.open({
    path: 'wpkconfig.v5',
    schema: [image, settings],
  }).then(realm => realm);

const insertOnDatabase = async (branchName, dataObject) => {
  const realm = await openDatabase();
  return await realm.write(() => {
    realm.create(branchName, dataObject);
  });
};

const updateOnDatabase = async (branchName, node, newValue) => {
  const realm = await openDatabase();
  return await realm.write(() => {
    realm.create(branchName, { node: { ...newValue } }, 'modified');
    realm.objects(branchName);
  });
};

const deleteOnDatabase = async (branchName, key) => {
  const realm = await openDatabase();
  return await realm.write(() => {
    const data = realm.objects(branchName).filtered(`id == ${key}`);
    realm.delete(data);
  });
};

const deleteAllOnDatabase = async branchName => {
  const realm = await openDatabase();
  return await realm.write(() => {
    const data = realm.objects(branchName);
    realm.delete(data);
  });
};

const fetchOnDatabase = async branchName => {
  const realm = await openDatabase();
  const result = await realm.objects(branchName);
  return result;
};

export {
  insertOnDatabase,
  updateOnDatabase,
  fetchOnDatabase,
  deleteOnDatabase,
  deleteAllOnDatabase,
};
