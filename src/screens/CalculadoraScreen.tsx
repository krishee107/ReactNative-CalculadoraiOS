import { Text, View } from "react-native"
import { styles } from "../theme/appTheme"
import { BotonCalc } from "../components/BotonCalc"
import { useState } from "react"

export const CalculadoraScreen = () => {
    const [numero, setNumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');

    const limpiar = () => {
        setNumero('0');
    }
    const armarNumero = (numeroTexto: string) => {

        setNumero(numero + numeroTexto)
    }
    const positivoNegativo = () => {
        if (numero.includes("-")) {
            setNumero(numero.replace('-', ''));
        }
        else {
            setNumero('-' + numero)
        }
    }

    return (
        <View style={styles.calculadoraContainer}>
            <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
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
                <BotonCalc texto="del" color="#9b9b9b" accion={limpiar} />
                <BotonCalc texto="/" color="#ff9427" accion={limpiar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="7" accion={armarNumero} />
                <BotonCalc texto="8" accion={armarNumero} />
                <BotonCalc texto="9" accion={armarNumero} />
                <BotonCalc texto="x" color="#ff9427" accion={limpiar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="4" accion={armarNumero} />
                <BotonCalc texto="5" accion={armarNumero} />
                <BotonCalc texto="6" accion={armarNumero} />
                <BotonCalc texto="-" color="#ff9427" accion={limpiar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="1" accion={armarNumero} />
                <BotonCalc texto="2" accion={armarNumero} />
                <BotonCalc texto="3" accion={armarNumero} />
                <BotonCalc texto="+" color="#ff9427" accion={limpiar} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="0" ancho={true} accion={armarNumero} />
                <BotonCalc texto="." accion={armarNumero} />
                <BotonCalc texto="=" color="#ff9427" accion={limpiar} />
            </View>
        </View>
    )
}
