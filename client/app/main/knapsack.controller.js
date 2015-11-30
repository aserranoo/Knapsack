'use strict';
(function() {
   
    function KnapsackController($scope, $http) {
        var ws = this;
        ws.volumenChecked = [{
            volumen: 108000,
            check: true
        }, {
            volumen: 791200,
            check: false
        }, {
            volumen: 1240800,
            check: false
        }, {
            volumen: 604800,
            check: false
        }, {
            volumen: 456000,
            check: false
        }];
        ws.objetos = [{
            Descripcion: 'Platos Desechables',
            Altura: 25,
            Largo: 20,
            Ancho: 15,
            Volumen: 7500,
            Beneficio: 15,
            Ruta: 'objeto2.jpg',
            MenorA: 10,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja Incaible',
            Altura: 5,
            Largo: 2,
            Ancho: 7,
            Volumen: 70,
            Beneficio: 2,
            Ruta: 'objeto3.jpg',
            MenorA: 200,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Servilletas',
            Altura: 19,
            Largo: 12,
            Ancho: 14,
            Volumen: 3192,
            Beneficio: 2,
            Ruta: 'objeto4.jpg',
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Papel Aluminio',
            Altura: 5,
            Largo: 6,
            Ancho: 6,
            Volumen: 350,
            Beneficio: 2,
            Ruta: 'objeto5.jpg',
            MenorA: 4,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Cáfe Mocha',
            Altura: 15,
            Largo: 9,
            Ancho: 12,
            Volumen: 1620,
            Beneficio: 5,
            Ruta: 'objeto16.jpg',
            MenorA: 8,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Jugo',
            Altura: 12,
            Largo: 4,
            Ancho: 5,
            Volumen: 240,
            Beneficio: 2,
            Ruta: 'objeto21.jpg',
            MenorA: 20,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Galletas Canela',
            Altura: 21,
            Largo: 4,
            Ancho: 14,
            Volumen: 1176,
            Beneficio: 9,
            Ruta: 'objeto11.jpg',
            MenorA: 10,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Leche Silk',
            Altura: 19,
            Largo: 6,
            Ancho: 9,
            Volumen: 1026,
            Beneficio: 18,
            Ruta: 'objeto10.jpg',
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Galletes Principe',
            Altura: 16,
            Largo: 6,
            Ancho: 22,
            Volumen: 2112,
            Beneficio: 21,
            Ruta: 'objeto9.jpg',
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Galletas Saldas',
            Altura: 14,
            Largo: 11,
            Ancho: 28,
            Volumen: 4312,
            Beneficio: 28,
            Ruta: 'objeto12.jpg',
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Te de Limon',
            Altura: 8,
            Largo: 8,
            Ancho: 17,
            Volumen: 1088,
            Beneficio: 5,
            Ruta: 'objeto14.jpg',
            MenorA: 2,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Te de manzanilla',
            Altura: 8,
            Largo: 8,
            Ancho: 14,
            Volumen: 896,
            Beneficio: 4,
            Ruta: 'objeto15.jpg',
            MenorA: 9,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Jabon Sote',
            Altura: 6,
            Largo: 3,
            Ancho: 13,
            Volumen: 234,
            Beneficio: 2,
            Ruta: 'objeto22.jpg',
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Paquete de serillos',
            Altura: 7,
            Largo: 5,
            Ancho: 10,
            Volumen: 350,
            Beneficio: 3,
            Ruta: 'objeto17.jpg',
            MenorA: 8,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Toallas Sanitarias',
            Altura: 8,
            Largo: 8,
            Ancho: 15,
            Volumen: 960,
            Beneficio: 3,
            Ruta: 'objeto18.jpg',
            MenorA: 2,
            MayorA: 1,
            Checked: true
        }];

        ws.solutions = [];
        ws.volumenRestante = 0;
        ws.beneficioTotal = 0;
        ws.volumenUtilizado = 0;
        ws.optimizarEspacio = optimizarEspacio;
        ws.checkVol = checkVol;
        ws.obtenerVol = obtenerVol;
        ws.obtenerSolucionInicial = obtenerSolucionInicial;
        ws.validarObjetos = validarObjetos;

        ws.sumaVolumenMinima = 0;
        ws.sumaVolumenMaxima = 0;
        ws.sumaVolumenMinimaInicial = 0;
        ws.vol = 0;
        ws.calcularVolumenMinimoInicial = calcularVolumenMinimoInicial();

        function calcularVolumenMinimoInicial() {
            _.forEach(ws.objetos, function(value, key) {
                if (value.Checked) {
                    ws.sumaVolumenMinimaInicial += (value.Volumen * value.MayorA);
                }
            });
            console.log(ws.sumaVolumenMinimaInicial);
        }

        function validarObjetos(index) {
            var vol = 0;
            _.forEach(ws.volumenChecked, function(value, key) {
                if (value.check) {
                    vol = value.volumen;
                }
            });
            if (ws.objetos[index].MenorA < ws.objetos[index].MayorA) {
                alert('Se sobrepaso el valor maximo no puede ser menor al valor minimo');
                $('#optimizarBoton').addClass('disabled');
            } else if (ws.objetos[index].MenorA === undefined || ws.objetos[index].MayorA === undefined) {
                alert('Se tiene que especificar un minimo y un mayo de producto');
                $('#optimizarBoton').addClass('disabled');
            } else if (ws.objetos[index].MayorA * ws.objetos[index].Volumen > vol) {
                alert('Se sobrepaso el Volumen total del estante');
                ws.objetos[index].MayorA -= ws.objetos[index].MayorA + 1;
                $('#optimizarBoton').addClass('disabled');
            } else {
                $('#optimizarBoton').removeClass('disabled');
            }

            // if(ws.objetos[index].MayorA * ws.objetos[index].Volumen > ws.volumenRestante){
            //     $('#optimizarBoton').addClass('disabled')                
            //     alert('Se sobrepaso el Volumen total del estante')
            // }else{                
            //     $('#optimizarBoton').removeClass('disabled')
            // }        
            // var volumenSumado = 0;
            // var cantidadAnterior = 0;            
            // volumenSumado = ws.objetos[index].Volumen * ws.objetos[index].MayorA;                   
            // if (ws.objetos[index].Checked && cantidadAnterior > ws.objetos[index].MayorA) {                
            //     ws.sumaVolumenMinimaInicial += volumenSumado - (ws.objetos[index].Volumen * (ws.objetos[index].MayorA -1))
            //     cantidadAnterior = ws.objetos[index].MayorA -1 
            // } else {
            //     ws.sumaVolumenMinimaInicial -= volumenSumado - (ws.objetos[index].Volumen * (ws.objetos[index].MayorA -1))      
            //     cantidadAnterior = ws.objetos[index].MayorA -1
            // }
            // console.log(cantidadAnterior)
            // console.log(ws.sumaVolumenMinimaInicial)
        }

        function checkVol(index) {
            _.forEach(ws.volumenChecked, function(value, key) {
                if (key === index) {
                    ws.volumenChecked[key].check = true;
                } else {
                    ws.volumenChecked[key].check = false;
                }
            });
            ws.volumenRestante = ws.volumenChecked[index].volumen;
        }

        function obtenerVol() {
            var vol = 0;
            _.forEach(ws.volumenChecked, function(value, key) {
                if (value.check) {
                    ws.volumenRestante = value.volumen;
                    vol = ws.volumenRestante;
                }
            });
            return vol;
        }

        function obtenerSolucionInicial(objetos) {
            _.forEach(objetos, function(value, key) {
                if (value.MayorA * value.Volumen > ws.volumenRestante || value.MenorA * value.Volumen > ws.volumenRestante) {
                    alert('La suma de volumenes es mayor a la capacidad');
                    return false;
                }
                if (value.Checked) {
                    ws.solutions.push({
                        Descripcion: value.Descripcion,
                        Cantidad: value.MayorA,
                        CantidadMax: value.MenorA - 1,
                        Volumen: value.Volumen,
                        Beneficio: value.Beneficio
                    });
                }
            });
            _.forEach(ws.solutions, function(value, key) {
                ws.beneficioTotal += (value.Cantidad * value.Beneficio);
                ws.volumenRestante -= (value.Cantidad * value.Volumen);
            });
            return ws.solutions;
        }

        function optimizarEspacio() {
            var solucionBeta = {};
            var vol = 0;
            var tmpVol = 0;
            var ben = 0;
            ws.solutions = [];
            ws.solucionFinal = [];
            ws.beneficioTotal = 0;
            ws.volumenRestante = 0;
            ws.volumenUtilizado = 0;
            obtenerVol();
            var iteraciones = [];
            solucionBeta = obtenerSolucionInicial(ws.objetos);
            _.forEach(solucionBeta, function(value, key) {
                while (value.Cantidad * value.Volumen <= ws.volumenRestante && value.Cantidad <= value.CantidadMax) {
                    // ben += solucionBeta[key].Beneficio;
                    // solucionBeta[key].Cantidad += 1;
                    // vol += solucionBeta[key].Volumen;
                    // ws.beneficioTotal += (solucionBeta[key].Beneficio * solucionBeta[key].Cantidad);
                    // ws.volumenRestante -= (solucionBeta[key].Volumen * solucionBeta[key].Cantidad);
                    // iteraciones.push(value)
                    ben = ben + solucionBeta[key].Beneficio;
                    if (ben >= ws.beneficioTotal) {
                        solucionBeta[key].Cantidad += 1;
                        vol = vol + solucionBeta[key].Volumen;
                        ws.beneficioTotal = ws.beneficioTotal + solucionBeta[key].Beneficio;
                        ws.volumenRestante = ws.volumenRestante - solucionBeta[key].Volumen;
                        iteraciones.push(value);
                    }
                }
            });
            _.forEach(ws.solutions, function(value, key) {
                ws.solucionFinal.push({
                    Objeto: value.Descripcion,
                    Cantidad: value.Cantidad
                });
            });
            ws.volumenUtilizado = vol;
            console.log(ws.solucionFinal);
            console.log(iteraciones);
            console.log(ws.solutions, vol, ws.volumenRestante, ws.beneficioTotal);
        }
    }
     angular.module('knapsackApp').controller('KnapsackController', KnapsackController);

})();
