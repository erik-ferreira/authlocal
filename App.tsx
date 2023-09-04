import { useEffect, useState } from "react"
import { Alert, Button, Text, View } from "react-native"
import * as LocalAuthentication from "expo-local-authentication"

import { styles } from "./styles"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    // console.log(compatible)

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    const typesNamed = types.map(
      (type) => LocalAuthentication.AuthenticationType[type]
    )
    // console.log(typesNamed)
  }

  async function handleAuthentication() {
    const isBiometryEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!isBiometryEnrolled) {
      return Alert.alert(
        "Login",
        "Nenhuma biometria encontrada. Cadastre no dispositivo"
      )
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com biometria",
      fallbackLabel: "Biometria não reconhecida",
    })

    setIsAuthenticated(auth.success)
  }

  useEffect(() => {
    verifyAvailableAuthentication()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticated ? "Sim" : "Não"}</Text>

      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  )
}
