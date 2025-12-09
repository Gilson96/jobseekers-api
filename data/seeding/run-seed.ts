import db from "../connection.js"
import { data } from "../index.js"
import { seed } from "./seed.js"

const runSeed = () => {
    return seed(data).then(() => db.end())
}

runSeed();