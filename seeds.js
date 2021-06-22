const mongoose = require('mongoose');

const Agent = require('./models/agent')

mongoose.connect('mongodb+srv://soli123:soli123@vlrhub.dnq1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo Connection Open")
})
.catch(err => {
    console.error('Mongo Connection Error')
    console.error(err)
})

const seedLineups = [
    {
        name: 'Viper',
        map: 'Icebox',
        url: "https://youtu.be/7k7K-FCfAaw?t=31",
        landing: 'B Default'
    },
    {
        name: 'Viper',
        map: 'Icebox',
        url: 'https://youtu.be/7k7K-FCfAaw?t=8',
        landing: 'A Default'
    }
]

Agent.insertMany(seedLineups)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.error(e)
})