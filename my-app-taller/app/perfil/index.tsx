import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';

type TItemNota = {
    texto: string,
    valor: string
}

const ItemNota = (props: TItemNota) => {
    return (
        <View style={estilos.itemNota}>
            <Text style={{ fontWeight: 'bold', color: '#5d4037' }}>{props.texto} {props.valor}</Text>
        </View>
    );
}

const PerfilScreen = () => {
    const [nota, setNota] = useState<string>(''); 
    const [listaNotas, setListaNotas] = useState<string[]>([]);
    const [promedio, setPromedio] = useState<number>(0);
    const router = useRouter();

    const agregarNota = () => {
        Keyboard.dismiss(); // Ayuda a que el Alert sea visible de inmediato
        const valorNum = parseFloat(nota);

        if (isNaN(valorNum) || nota.trim() === "") {
            Alert.alert("Error", "Ingrese un número válido");
            return;
        }
        
        if (valorNum < 0 || valorNum > 5) {
            Alert.alert("Error", "La nota debe estar entre 0 y 5");
            return;
        }

        const nuevaNotaStr = valorNum.toFixed(2);
        const nuevaLista = [...listaNotas, nuevaNotaStr];
        setListaNotas(nuevaLista);

        const suma = nuevaLista.reduce((acc, n) => acc + parseFloat(n), 0);
        setPromedio(suma / nuevaLista.length);
        setNota(''); 
    };

    const borrarTodo = () => {
        setListaNotas([]);
        setPromedio(0);
        setNota('');
    };

    return (
        <View style={estilos.Container}>
            <Text style={estilos.titulo}>Panel de Notas</Text>
            
            <TextInput 
                style={estilos.input}
                placeholder="Nota (0.00 - 5.00)"
                keyboardType="numeric"
                value={nota}
                onChangeText={setNota}
            />

            {/* Botón con color fuerte (Rojo Intenso) */}
            <View style={estilos.buttonContainer}>
                <Button title="Agregar Nota" onPress={agregarNota} color="#D81B60" />
            </View>

            <Text style={estilos.promedioTexto}>
                Promedio Actual: {promedio.toFixed(2)}
            </Text>

            <FlatList 
                style={{ width: '100%', flex: 1 }}
                data={listaNotas}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <ItemNota texto={`Nota ${index + 1}:`} valor={item} />
                )}
            />

            <View style={estilos.footer}>
                <View style={{ marginBottom: 12 }}>
                    {/* Botón con color fuerte (Violeta/Fucsia) */}
                    <Button title="Borrar Todo" onPress={borrarTodo} color="#8E24AA" />
                </View>
                {/* Botón con color fuerte (Negro o Azul muy oscuro) */}
                <Button title="Salir" onPress={() => router.replace('/login')} color="#212121" />
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    Container: {   
        flex: 1,
        padding: 20, 
        alignItems: 'center',
        backgroundColor: '#FCE4EC', // Rosa pálido de fondo
    },
    titulo: {
        fontSize: 24,
        color: '#880E4F', // Rosa muy oscuro para contraste
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#F06292',
        borderRadius: 12,
        padding: 10,
        height: 55,
        width: '100%',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        color: '#880E4F'
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden', // Necesario para bordes redondeados en Android con Button
        marginBottom: 10
    },
    promedioTexto: {
        color: '#AD1457',
        fontSize: 22,
        marginVertical: 20,
        fontWeight: 'bold',
    },
    itemNota: {
        backgroundColor: '#FFF1F3',
        padding: 15,
        marginVertical: 6,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#F06292',
        width: '100%',
        elevation: 2, // Sombra ligera en Android
    },
    footer: {
        width: '100%',
        marginTop: 15,
        paddingBottom: 30
    }
});

export default PerfilScreen;