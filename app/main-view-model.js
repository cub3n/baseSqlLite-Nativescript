const Observable = require("tns-core-modules/data/observable").Observable;
const Sqlite = require("nativescript-sqlite");


function createViewModel(database) {
    const viewModel = new Observable();
    viewModel.carName = "";
    viewModel.carDescription = "";
    var mostrarBase = [];
    viewModel.mostrarBase = [];
    viewModel.sbText = "";
    viewModel.nombreBusqueda = "";
    viewModel.descripcionBusqueda= "";
    

    viewModel.insert = function() {
        database.execSQL("INSERT INTO cars (carName, carDescription) VALUES (?, ?)", [this.carName, this.carDescription]).then(id => {
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }
    viewModel.select = function() {
        database.all("SELECT * FROM cars").then(rows => {
            for(let row in rows) {
                mostrarBase.push({"name":rows[row][1], "description":rows[row][2]});  
            }
            console.log(mostrarBase);
            viewModel.set("mostrarBase", mostrarBase);
            return viewModel;
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
    
    return viewModel;
}

exports.createViewModel = createViewModel;


