import realm from 'realm';

const imageSchema = {
    name: 'image',
    primaryKey: 'id',
    properties: {
        id: 'int',
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
        realm.open({
            schema: [imageSchema, settingsSchema]
        })
    );
}

const insertOnDatabase = (branchName, dataObject) => {
    //let schema = branchName === 'image' ? imageSchema : settingsSchema; 

    return (
        realm.write(() => {
            realm.create(branchName, dataObject);
        })
    );
}

const deleteOnDatabase = (branchName, dataObject) => {
    return (
        realm.write(() => {
            const data = realm.create(branchName, dataObject);
            realm.delete(data);
        })
    );
}

const fetchOnDatabase = (branchName) => {
    const result = realm.objects(branchName);
    return result;
}

export {
    openDatabase,
    insertOnDatabase,
    fetchOnDatabase,
    deleteOnDatabase
}