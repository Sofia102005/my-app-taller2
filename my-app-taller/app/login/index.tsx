import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginScreen = () => {
    const [clave, setClave] = useState<string>(''); 
    const router = useRouter();

    const CLAVE_CORRECTA = "1234";

    const intentarEntrar = () => {
        if (clave === "") {
            Alert.alert("Error", "Debes ingresar un valor numérico");
            return;
        }

        if (clave === CLAVE_CORRECTA) {
            router.replace("/perfil");
        } else {
            Alert.alert("Advertencia", "Contraseña inválida");
            setClave(''); 
        }
    };

    const manejarCambioTexto = (valor: string) => {
        const soloNumeros = valor.replace(/[^0-9]/g, '');
        setClave(soloNumeros);
    };

    return (
        <View style={estilos.Container}>
            
            <Text style={estilos.titulo}>Clave de Acceso</Text>
            
            <TextInput 
                style={estilos.input}
                placeholder="0000"
                placeholderTextColor="#F06292"
                keyboardType="numeric"
                secureTextEntry={true}
                value={clave}
                onChangeText={manejarCambioTexto}
            />

            <View style={estilos.botonContenedor}>
                <Button 
                    title="Ingresar" 
                    onPress={intentarEntrar} 
                    color="#D81B60" 
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
        backgroundColor: '#FCE4EC',
    },
    titulo: {
        fontSize: 28, 
        color: '#880E4F', 
        fontWeight: 'bold',
        marginBottom: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    },
    input: {
        backgroundColor: 'white',
        width: '80%', 
        height: 60,
        textAlign: 'center',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#F06292',
        fontSize: 22,
        color: '#880E4F',
        marginBottom: 30,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    botonContenedor: {
        width: '80%',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
    }
});

export default LoginScreen;