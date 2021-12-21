const db = require('../db')
const database = db.memoryDb(db.data)


exports.get = async (req, res, next) => {
    let candidates = {}
    await database(async query => {
        candidates = await query.read('candidate')
            .catch(err => {
                throw new Error("Not found");
            });
    })

    if (Object.keys(candidates).length === 0) {
        return res.status(400).send("Not found")
    }

    return res.status(200).send(candidates)
};

exports.getById = async (req, res, next) => {

    const id = req.params.id;
    let candidates = {}
    await database(async query => {
        candidates = await query.read('candidate', { id: id })
            .catch(err => {
                throw new Error("Not found");
            });
    })

    if (Object.keys(candidates).length === 0) {
        return res.status(400).send("Not found")
    }

    return res.status(200).send(candidates)
};

exports.getBySkills = async (req, res, next) => {
    const skills = req.params.skills.split(',');
    let candidates = {}
    await database(async query => {
        candidates = await query.read('candidate', { skills: skills })
            .catch(err => {
                throw new Error("Not found");
            });
    })

    if (Object.keys(candidates).length === 0) {
        return res.status(400).send("Not found")
    }

    return res.status(200).send(candidates)
};

exports.post = async (req, res, next) => {
    let candidates = req.body
    let save = false;

    await database(async query => {
        save = await query.create('candidate', candidates)
            .catch(err => {
                throw new Error("Uncreated");
            });
    })
    console.log(save);
    if (!save) {
        return res.status(400).send("Candidates have not been created.")
    }

    return res.status(200).send("SUCESS");
}