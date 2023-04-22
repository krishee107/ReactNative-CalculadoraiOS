import { Text, View } from "react-native"
import { styles } from "../theme/appTheme"
import { BotonCalc } from "../components/BotonCalc"
import { useRef, useState } from "react"

enum Operadores {
    suma, resta, multiplicar, dividir
}

export const CalculadoraScreen = () => {
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

    return (
        <View style={styles.calculadoraContainer}>
            {
                numeroAnterior !=='0' &&
                    (<Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>)
            }
            <Text
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {numero}
            </Text>

            <View style={styles.fila}>
                <BotonCalc texto="C" color="#9b9b9b" accion={limpiar} />
                <BotonCalc texto="+/-" color="#9b9b9b" accion={positivoNegativo} />
                <BotonCalc texto="del" color="#9b9b9b" accion={btnDelete} />
                <BotonCalc texto="/" color="#ff9427" accion={btnDividir} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="7" accion={armarNumero} />
                <BotonCalc texto="8" accion={armarNumero} />
                <BotonCalc texto="9" accion={armarNumero} />
                <BotonCalc texto="x" color="#ff9427" accion={btnMultiplicar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="4" accion={armarNumero} />
                <BotonCalc texto="5" accion={armarNumero} />
                <BotonCalc texto="6" accion={armarNumero} />
                <BotonCalc texto="-" color="#ff9427" accion={btnRestar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="1" accion={armarNumero} />
                <BotonCalc texto="2" accion={armarNumero} />
                <BotonCalc texto="3" accion={armarNumero} />
                <BotonCalc texto="+" color="#ff9427" accion={btnSumar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="0" ancho={true} accion={armarNumero} />
                <BotonCalc texto="." accion={armarNumero} />
                <BotonCalc texto="=" color="#ff9427" accion={calcular} />
            </View>
        </View>
    )
}
