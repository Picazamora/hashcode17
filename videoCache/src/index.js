var fs = require('fs');

var nameFile = null;
nameFile = process.argv[3];

if(nameFile != null){
	nameFile = process.env.NFILE;
}else{
	nameFile = 'examples/kittens.in';
}
//const nameFile = require('nameFile');

console.log('Inicio');
var archivo = fs.readFileSync(nameFile, 'utf-8');
var matrix = [];
var conf = [];
var matrixValue = [];

	//console.log(archivo.slice(0, c+2));
	matrix = archivo.split("\n");

	matrix.forEach(function(element, index, array){
		if(index == 0){
			conf = element.split(" ");
		}else{
			if(element != ''){
				tmpValue = [];
				row = element.split(" ");			
				for(i = 0; i< row[0].length; i++){
					//console.log(row[0][i]);
					tmpValue.push(row[0][i]);
				}				
				matrixValue[index-1] = tmpValue;
			}
		}
	});
		
	console.log(conf);
	console.log(matrixValue);