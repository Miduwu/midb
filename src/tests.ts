import { Database } from "./main";

const db = new Database({
    tables: ['Users']
})

db.on('ready', (db) => {
    console.log('Started')
});

db.start();

(async() => {
    db.set('devs', 'Y le dije "osea" `wey` jaja \'ubicate\' xd.$.').then(async() => {
    db.delete('devss').then(() => {
        db.set('Blas', { noob: true }, 'Users').then(async() => {
            console.log((await db.get('devs')))
            console.log((await db.get('Blas', 'Users')))
        })
    })
    console.log(`${(await db.ping())} MS`)
})
})()