import { ObjectId } from 'mongodb';
import mongoClient from '../mongodb';

const collection = mongoClient.db().collection('urls');

export default {
    getData: async (page = 1, pageSize = 10) => {
        try {
            const skip = (page - 1) * pageSize;
            const result = await collection.find()
                .skip(skip)
                .limit(pageSize)
                .toArray();

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting data!');
        }
    },
    getEntry: async (short, user_meta) => {
        try {
            const result = await collection.findOne({ short });
            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when getting data!');
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
            throw new Error('Error when creating data!');
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
            throw new Error('Error when editing data!');
        }
    },
    deleteData: async (id) => {
        try {
            const result = await collection.deleteOne(
                { _id: new ObjectId(id) });

            return result;
        } catch (e) {
            console.error(e);
            throw new Error('Error when deleting data!');
        }
    },
}
