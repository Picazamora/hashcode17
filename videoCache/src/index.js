var fs = require('fs');

var nameFile = null;
nameFile = process.argv[3];

if(nameFile != null){
	nameFile = process.env.NFILE;
}else{
	nameFile = 'kittens.in'; //Name File
}
//const nameFile = require('nameFile');

console.log('Inicio');
var archivo = fs.readFileSync(nameFile, 'utf-8');
var matrix = [];
var conf = [];
var videos = [];
var endpoints = [];
var latencies = [];
var requests = [];
var cacheServers = [];
endpoints = latencies;


	//Objects
	function video(i,e){
		this.id = i;
		this.size = e;
	}

	function endpoint(i,l,ec) {
		this.id = i;
		this.latencyServer = l;//1000ms
		this.endPoint_cache = ec; // lista de caches
	}

	function endpoint_cache(c,l) {
		this.cacheServer = c;
		this.latencyEndCache = l;
	}

	function cacheServer(i,b,c){
				this.Id = i, 
				this.listVideo = b, //list Video
				this.capacity = c
		}

	function request(a, b, c){
				this.nRequest = a, 
				this.endpoint = b, //List of EndPoints
				this.video = c //list Video
		}


	//console.log(archivo.slice(0, c+2));
	matrix = archivo.split("\n");



	conf = matrix[0].split(" ");
	//matrix.forEach(function(element, index, array){
	matrix[1].split(" ").forEach(function(e, i){
		if(i >0){
		videos[parseInt(i)] = new video(parseInt(i), parseInt(e));
		}
	});
	//Linea 3
	var linea = 2;
	for (i = 0; i < conf[1]; i++) { 
    	var maEp = matrix[linea].split(" ");
    	var tempLatency = [];
    	for(j = 0; j < maEp[1]; j++){
    		linea++;
    		var endpointTemp = matrix[linea].split(" ");
    		tempLatency[parseInt(endpointTemp[0])] = parseInt(endpointTemp[1]);
    	}
    	latencies[parseInt(i)] = new endpoint(parseInt(i), parseInt(maEp[0]), tempLatency);
    	linea++;
    }

	for (i = 0; i < conf[2]; i++) { 
    	var maEp = matrix[linea].split(" ");
    	linea++;
    	var reqTemp = matrix[linea].split(" ");

    	requests.push(new request(parseInt(reqTemp[2]), parseInt(reqTemp[1]), parseInt(reqTemp[0])));
    }

    for (i = 0; i < conf[3]; i++) {
    	cacheServers[parseInt(i)] = new cacheServer(parseInt(i), [], parseInt(conf[4]));
    }

/*console.log(conf);
console.log(videos);
console.log(enpoints);
console.log(latencies);
console.log(requests);
console.log(cacheServers);*/


function Solution () {
	this.servers = [];
	this.puntuacion = 0;	
}

function organiza(requests,sList,bestSolution,actualSolution){

	console.log(requests);
	if(requests.length == 0){

		bestSolution = isBetterSolution(bestSolution,actualSolution); 
	} else {
		var r = requests[0];
		if(requests.length == 0){
			requests = [];
		}else {
			requests.shift();
		}
		var video = videos[r.video];
		var endpoint = endpoints[r.endpoint];
		var servers = dameServersPosibles(r,video,sList,endpoint);
		console.log(servers);
		var puntuacion;
		if(servers.length > 0){
			servers.forEach(function(s){
					insertVideo(s,video);
					puntuacion = damePuntuacion(r,endpoint,s.id);
					actualSolution.puntuacion += puntuacion;
					actualSolution.servers.add(s);
					organiza(requests,sList,bestSolution,actualSolution);
					actualSolution.puntuacion -= puntuacion;
					actualSolution.servers.remove(actualSolution.servers.length-1);
			});
		} else {
			organiza(request,sList,bestSolution,actualSolution);
		}
	}
}



function dameServersPosibles(request,video,sList,endpoint){

	var servidores = [];
	sList.forEach(function(s,index){
		if(estaConectado(endpoint,index) && entraVideo(video, s)){
			servidores.add(s);
		}
	});

<<<<<<< HEAD
	return servidores;
}


function estaConectado(endpoint, serverId){

	return endpoint != undefined && endpoint.endPoint_cache[serverId] != null;
}

function entraVideo(video,server){
	server.capacity >= video.size;
}

function inserVideo(server,video){
	server.listVideo.add(video.Id);
	server.capacity -= video.size;
}

function removeLastVideo(server,video){
	server.listVideo.remove(server.listVideo.length-1);
	server.capacity += video.size;
}
=======
	//console.log(archivo.slice(0, c+2));
	matrix = archivo.split("\n");
>>>>>>> origin/master

function damePuntacion(request,endpoint,serverId){
	return request.nRequest *(endpoint.latencyServer - endpoint.endPoint_cache[serverId]);
}


var bestSolution = new Solution();
var actualSolution = new Solution();

organiza(requests,cacheServers, bestSolution,actualSolution);

console.log(bestSolution);
