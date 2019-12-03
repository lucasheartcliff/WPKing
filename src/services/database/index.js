const Realm = require('realm');

const imageSchema = {
    name: 'image',
    properties: {
        uri: 'string'
    }
}

const settingsSchema = {
    name: 'settings',
    properties: {
        flux: 'string',
        timeToChange: 'int' //Time in 'ms'
    }
}

const openDatabase = () => {
    return (
        Realm.open({
            path:'database',
            schema: [imageSchema, settingsSchema]
        }).then(realm=>realm)
    );
}

const insertOnDatabase = (realm, branchName, dataObject) => {
    //let schema = branchName === 'image' ? imageSchema : settingsSchema; 
    return (
        realm.write(() => {
            realm.create(branchName, dataObject);
        })
    );
}

const deleteOnDatabase = (realm, branchName, dataObject) => {
    return (
        realm.write(() => {
            const data = realm.create(branchName, dataObject);
            realm.delete(data);
        })
    );
}

const deleteAllOnDatabase = (realm, branchName) => {
    return (
        realm.write(() => {
            const data = realm.objects(branchName);
            realm.delete(data);
        })
    );
}

const fetchOnDatabase = (realm, branchName) => {
    const result = realm.objects(branchName);
    return result;
}

export {
    openDatabase,
    insertOnDatabase,
    fetchOnDatabase,
    deleteOnDatabase,
    deleteAllOnDatabase
}