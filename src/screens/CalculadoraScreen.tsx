import { Text, View } from "react-native"
import { styles } from "../theme/appTheme"
import { BotonCalc } from "../components/BotonCalc"

export const CalculadoraScreen = () => {
    return (
        <View style={styles.calculadoraContainer}>
            <Text style={styles.resultadoPequeno}>1,500.00</Text>
            <Text style={styles.resultado}>1,500.00</Text>

            <View style={styles.fila}>
                <BotonCalc texto="C" color="#9b9b9b" />
                <BotonCalc texto="+/-" color="#9b9b9b" />
                <BotonCalc texto="del" color="#9b9b9b" />
                <BotonCalc texto="/" color="#ff9427" />
            </View>
        </View>
    )
}
