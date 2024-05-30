import { ObjectId } from 'mongodb';
import mongoClient from '../mongodb';

const collection = mongoClient.db().collection('entry');

export default {
    getData: async () => {
        try {
            const result = await collection.find().toArray();
            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting all entries!');
        }
    },
    createData: async (data) => {
        try {
            const created_at = Date.now();
            const result = await collection.insertOne({
                ...data,
                created_at,
            });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when creating entry!');
        }
    },
    editData: async (id, data) => {
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when editing entry!');
        }
    },
    deleteData: async (id) => {
        try {
            const result = await collection.deleteOne(
                { _id: new ObjectId(id) });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when deleting entry!');
        }
    },
}
