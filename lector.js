function loadLector(){
	document.addEventListener("DOMContentLoaded", () => {
		var sound = new Audio("barcode.wav");
		const $resultados = document.querySelector("#resultado");
		Quagga.init({
			inputStream: {
				constraints: {
				width: 1080,
				height: 720,
			//	width: 640,
			//	height:480,
				facing: "environment"
				},
				name: "Live",
				type: "LiveStream",
				target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
			},
			locator: {
				patchSize: "medium",
				halfSample: true
			  },
			  numOfWorkers: 4,
			  locate: true,
			decoder: {
				readers: ["upc_reader", "ean_8_reader", "ean_reader"]
				// readers: ["upc_reader"]
			}
		}, function (err) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Iniciado correctamente");
			Quagga.start();
		});
	
		Quagga.onDetected((data) => {
			$resultados.textContent = data.codeResult.code;

			//const datos = data.codeResult.code;
			// const result = datos.indexOf(0,0);       
	
			// if(datos.indexOf(0)===0){
			// 	// alert("0 esta adelante")
			// 	  const str = data.codeResult.code;
			// 		const newStr = str.slice(1)
			// 		document.getElementById("resultado").value="";
			// 		document.getElementById("resultado").value=newStr;
			// }else{
			// 	document.getElementById("resultado").value="";
			// 	document.getElementById("resultado").value=data.codeResult.code;
			// }


			document.getElementById("resultado").value = data.codeResult.code;
			sound.play();	
			// setTimeout(clickear, 500);
			// function clickear(){
			// 	document.getElementById("btnc").click();
			// }
			// Imprimimos todo el data para que puedas depurar
			// console.log(data);
			// alert(data.codeResult.code);
			
		});
	
		Quagga.onProcessed(function (result) {
			var drawingCtx = Quagga.canvas.ctx.overlay,
				drawingCanvas = Quagga.canvas.dom.overlay;
	
			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
					result.boxes.filter(function (box) {
						return box !== result.box;
					}).forEach(function (box) {
						Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
					});
				}
	
				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
				}
	
				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
				}
			}
		});
	});
}
