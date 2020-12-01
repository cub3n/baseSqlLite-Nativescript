const createViewModel = require("./main-view-model").createViewModel;
const Sqlite = require("nativescript-sqlite");


function onNavigatingTo(args) {
    var page = args.object;
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, carName TEXT, carDescription TEXT)").then(id => {
            
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
    
}


exports.onNavigatingTo = onNavigatingTo;
