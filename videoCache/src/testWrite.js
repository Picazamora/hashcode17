

var writeMatrix = require('./writeMatrix');

var Solution = {
    puntuacion : 50,
    servers : [{
        Id:0,
        listVideo:[2,3]
    },{
        Id:1,
        listVideo:[1,4]
    } ,{
          Id:3,
          listVideo:[1,4,8,9]
    }]
}
writeMatrix.printSol(Solution);