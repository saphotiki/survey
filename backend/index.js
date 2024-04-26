
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Database from 'better-sqlite3';
const db = new Database('db.sqlite');
db.pragma('journal_mode = WAL');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


(async () => {
     db.exec(`CREATE TABLE IF NOT EXISTS participant (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        email text UNIQUE, 
        dob date,
        phone text, 
        favourite_food text,
        watch_movies text,
        listen_radio text,
        eat_out text,
        watch_tv text,
        CONSTRAINT email_unique UNIQUE (email)
        )`,);  
})()



app.get("/survey",async (req,res)=>{
    let total =  getTotal();
    let databack = {
            total,
            averageAge:getAverageAge(),
            oldest:getOldest(),
            youngest:getYoungest(),
            percentagePizza:(getLikes('pizza')/total) * 100 ,
            percentagePasta:(getLikes('pasta')/total) * 100,
            percentagePapAndWors:(getLikes('PapAndWors')/total) * 100,
            watchMovies:getMode("watch_movies"),
            listenRadio:getMode("listen_radio"),
            eatOut:getMode("eat_out"),
            watchTV:getMode("watch_tv")
    }
    console.log(getMode("watch_movies"))
    // let databack = {
    //     total,
    //     averageAge:getAverageAge(),
    //     oldest:getOldest(),
    //     youngest:getYoungest(),
    //     percentagePizza:(getPizzaLike()/total) * 100 ,
    //     percentagePasta:(getPasta()/total) * 100,
    //     percentagePapAndWors:(getPapAndWors()/total) * 100,
    //     watchMovies:getWatchMovies(),
    //     listenRadio:getRadio(),
    //     eatOut:getEatOut(),
    //     watchTV:getWatchTv()
    // }
    res.status(200).json(databack)
});

function getMode(q){
    var sql = `SELECT ${q}, COUNT(${q}) AS count
    FROM participant
    GROUP BY ${q}
    ORDER BY count DESC
    LIMIT 1`;
    var mode;
    try{
        const modeStmt = db.prepare(sql);
        const modeResult = modeStmt.get();
        mode = modeResult[q];
    }
    catch(e){
        return "";
    }
    return mode;
}

function getLikes(food){
    var sql = `SELECT COUNT(*) FROM participant WHERE favourite_food='${food}'`;
    var total;
    try{
        const countStmt = db.prepare(sql);
        const countResult = countStmt.get();
        total = countResult['COUNT(*)'];
    }
    catch(e){
        return 0 ;
    }
    return total;
}

function getYoungest(){
    var sql = `SELECT * FROM participant ORDER BY dob DESC LIMIT 1`;
    var oldest;
    try{
        const oldestStmt = db.prepare(sql);
        const oldestResult = oldestStmt.get();
        oldest = oldestResult;
    }
    catch(e){
        console.log(e);
        return "" ;
    }
    return oldest;
}


function getOldest(){
    var sql = `SELECT * FROM participant ORDER BY dob LIMIT 1`;
    var oldest;
    try{
        const oldestStmt = db.prepare(sql);
        const oldestResult = oldestStmt.get();
        oldest = oldestResult;
    }
    catch(e){
        console.log(e);
        return "" ;
    }
    return oldest;
}

function getAverageAge(){
    var sql = `SELECT AVG(strftime('%Y', 'now') - strftime('%Y', dob)) AS average_age
    FROM participant`;
    var average;
    try{
        const avgStmt = db.prepare(sql);
        const avgResult = avgStmt.get();
        average =  avgResult.average_age;
    }
    catch(e){
        console.log(e);
        return 0 ;
    }
    return average;
}

function getTotal(){
    var sql = 'SELECT COUNT(*) FROM participant';
    var total;
    try{
        const countStmt = db.prepare(sql);
        const countResult = countStmt.get();
        total = countResult['COUNT(*)'];
    }
    catch(e){
        return 0 ;
    }
    return total;
}

app.post("/survey",(req,res)=>{
    var sql ='INSERT INTO participant (name, email, dob, phone, favourite_food, watch_movies, listen_radio, eat_out, watch_tv) VALUES (?,?,?,?,?,?,?,?,?)'
    var params =[req.body.personalForm.name, 
        req.body.personalForm.email, 
        req.body.personalForm.dob,
        req.body.personalForm.phone,
        req.body.favoriteFood,
        req.body.questions.watch_movies,
        req.body.questions.listen_radio,
        req.body.questions.eat_out,
        req.body.questions.watch_tv
        ];
        try{
        var stmp = db.prepare(sql);
        stmp.run(params);
        }catch(e){
            console.log(e);
            return res.status(400)
        }
        return res.status(201)
})

app.listen(4000);