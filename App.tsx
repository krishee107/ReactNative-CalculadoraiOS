import { SafeAreaView, StatusBar } from "react-native"
import { CalculadoraScreen } from "./src/screens/CalculadoraScreen"
import { styles } from "./src/theme/appTheme"

const App = () => {
  return (
    <SafeAreaView style={styles.fondo}>
      {/* Dar color a la status bar*/}
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
      <CalculadoraScreen />
    </SafeAreaView>
  )
}

export default App
