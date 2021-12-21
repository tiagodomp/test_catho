const fs = require('fs')
const os = require('os')
const pick = require('lodash.pick')
const find = require('lodash.find')
const filter = require('lodash.filter')
const reject = require('lodash.reject')

exports.data = {
    "candidate": [{
        "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
        "name": "Jimmy Coder",
        "skills": ["javascript", "es6", "nodejs", "express"]
    },
    {
        "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547b",
        "name": "John Coder",
        "skills": ["javascript", "es6", "nodejs", "express"]
    },
    {
        "id": "person1",
        "name": "Amy Fish",
        "skills": ["go", "elixir", "erlang"]
    }]
}

exports.memoryDb = (data = {}) => {
    const database = async queryFn => {
        const query = {}
        const path = os.tmpdir() + '/' + 'db.json';

        const createOrLoadData = () => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, JSON.stringify(data))
            }

            if (fs.existsSync(path)) {
                data = require(path)
            }
        }

        const commit = async () => {
            await fs.writeFile(path, JSON.stringify(data), (err) => {
                if (err) throw err;
                console.log('DB commited');
            });
        }

        query.create = async (tableName, item) => {
            try {
                createOrLoadData();
                // Make the table if it doesn't exist
                data[tableName] = data[tableName] || []
                data[tableName].push(...item)

                await commit();
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        query.read = (tableName, where, fields = []) => {
            createOrLoadData();
            const results = filter(data[tableName], where)
            if (fields.length) {
                return Promise.resolve(results.map(result => pick(result, fields)))
            } else {
                return Promise.resolve(results)
            }
        }

        query.update = async (tableName, where, nextItem) => {
            try {
                createOrLoadData();
                const previousItem = find(data[tableName], where)
                const previousItemIndex = data[tableName].indexOf(previousItem)
                const updatedItem = {
                    ...previousItem,
                    ...nextItem,
                    updatedAt: new Date()
                }

                data[tableName] = [
                    ...data[tableName].slice(0, previousItemIndex),
                    updatedItem,
                    ...data[tableName].slice(previousItemIndex)
                ]

                await commit();
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        query.remove = async (tableName, where) => {
            try {
                createOrLoadData();
                data[tableName] = reject(data[tableName], where)
                await commit()
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        try {
            await queryFn(query)
        } catch (error) {
            console.error(error.message)
        }

        return Promise.resolve()
    }

    return database
}