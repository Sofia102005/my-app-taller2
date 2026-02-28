import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginScreen = () => {
    const [clave, setClave] = useState<string>(''); 
    const router = useRouter();

    // Clave de acceso para las pruebas del equipo
    const CLAVE_CORRECTA = "1234";

    const intentarEntrar = () => {
        // Validamos que el input sea numérico y no esté vacío
        if (clave === "" || !/^\d+$/.test(clave)) {
            Alert.alert("Error", "Debes ingresar un valor numérico");
            return;
        }

        // Si la clave es correcta, mandamos al usuario al perfil
        if (clave === CLAVE_CORRECTA) {
            router.replace("/perfil");
        } else {
            // Si falla, avisamos y limpiamos el campo para el siguiente intento
            Alert.alert("Advertencia", "Contraseña inválida");
            setClave(''); 
        }
    };

    return (
        <View style={estilos.Container}>
            
            <Text style={estilos.titulo}>Clave de Acceso</Text>
            
            <TextInput 
                style={estilos.input}
                placeholder="0000"
                keyboardType="numeric"
                secureTextEntry={true} // Ocultamos caracteres por seguridad
                value={clave}
                onChangeText={(valor) => setClave(valor)}
            />

            <View style={estilos.botonContenedor}>
                <Button 
                    title="Ingresar" 
                    onPress={intentarEntrar} 
                    color="#b32c2c" // Color granate para el botón principal
                />
            </View>

        </View>
    );
}

const estilos = StyleSheet.create({
    Container: {   
        flex: 1,
        padding: 16, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0a010', // Fondo color oro
    },
    titulo: {
        fontSize: 24, 
        color: 'white', 
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        backgroundColor: 'white',
        width: '80%', 
        height: 50,
        textAlign: 'center',
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#b32c2c', // Borde granate a juego
        fontSize: 18,
        marginBottom: 20
    },
    botonContenedor: {
        width: '80%',
        borderRadius: 14,
        overflow: 'hidden' 
    }
});

export default LoginScreen;