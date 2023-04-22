import { useState, useRef } from 'react';


enum Operadores {
    suma, resta, multiplicar, dividir
}
export const useCalculadora = () => {
        const [numero, setNumero] = useState('0');
        const [numeroAnterior, setNumeroAnterior] = useState('0');
        const ultimaOperacion = useRef<Operadores>();

        const limpiar = () => {
            setNumero('0');
            setNumeroAnterior('0');
        }
        const armarNumero = (numeroTexto: string) => {
            //No aceptar dos puntos
            if (numero.includes('.') && numeroTexto === '.') return;
            if (numero.startsWith('0') || numero.startsWith('-0')) {
                //Punto decimal
                if (numeroTexto === '.') {
                    setNumero(numero + numeroTexto);
                }
                //Evaluar si es otro cero y hay un punto
                else if (numeroTexto === '0' && numero.includes('.')) {
                    setNumero(numero + numeroTexto)
                }
                //Evaluar si es diferente de cero y no tiene punto
                else if (numeroTexto !== '0' && !numero.includes('.')) {
                    setNumero(numeroTexto);
                }
                //Evitar 0000.0
                else if (numeroTexto === '0' && !numero.includes('.')) {
                    setNumero(numero);
                }
            }
            else
                setNumero(numero + numeroTexto)
        }

        const btnDelete = () => {
            let negativo = '';
            let numeroTemp = numero;
            if (numero.includes("-")) {
                negativo = '-';
                numeroTemp = numero.substring(1);
            }
            if (numeroTemp.length > 1) {
                setNumero(negativo + numeroTemp.slice(0, -1));
            } else {
                setNumero('0')
            }
        }

        const positivoNegativo = () => {
            if (numero.includes("-")) {
                setNumero(numero.replace('-', ''));
            }
            else {
                setNumero('-' + numero)
            }
        }

    const cambiaNumPorAnterior = () =>{
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0, -1))
        }else{
            setNumeroAnterior(numero);
        }
        setNumero('0');
    }

    const btnDividir = () =>{
        cambiaNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
        
    }
    const btnMultiplicar = () =>{
        cambiaNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
        
    }
    const btnSumar = () =>{
        cambiaNumPorAnterior();
        ultimaOperacion.current = Operadores.suma;
        
    }
    const btnRestar = () =>{
        cambiaNumPorAnterior();
        ultimaOperacion.current = Operadores.resta;
        
    }

    const calcular = () =>{
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.suma:
                setNumero(`${num1+num2}`);
                break;
            case Operadores.resta:
                setNumero(`${num2-num1}`);
                break;  
            case Operadores.multiplicar:
                setNumero(`${num1*num2}`);
                break;  
            case Operadores.dividir:
                setNumero(`${num2/num1}`);
                break;
        }
        
        setNumeroAnterior('0');
    }

    return {
        limpiar,
        calcular,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        cambiaNumPorAnterior,
        positivoNegativo,
        armarNumero,
        numero,
        numeroAnterior,
        ultimaOperacion
    }
}


