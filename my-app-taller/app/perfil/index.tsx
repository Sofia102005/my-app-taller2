import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';

type TItemNota = {
    texto: string,
    valor: string
};

const ItemNota = ({ texto, valor }: TItemNota) => {
    return (
        <View style={estilos.itemNota}>
            <Text style={{ fontWeight: 'bold' }}>
                {texto} {valor}
            </Text>
        </View>
    );
};

const PerfilScreen = () => {
    const [nota, setNota] = useState<string>(''); 
    const [listaNotas, setListaNotas] = useState<string[]>([]);
    const [promedio, setPromedio] = useState<number>(0);
    const router = useRouter();

    // No permite más de 2 decimales mientras escribe
    const handleChangeNota = (valor: string) => {
        const regex = /^\d*(\.\d{0,2})?$/;
        if (regex.test(valor)) {
            setNota(valor);
        }
    };

    const agregarNota = () => {
        const valorNum = parseFloat(nota);

        // Validar campo vacío o no numérico
        if (isNaN(valorNum) || nota.trim() === "") {
            Alert.alert("Error", "Ingrese un número válido");
            return;
        }
        
        if (valorNum < 0 || valorNum > 5) {
            Alert.alert("Error", "La nota debe estar entre 0 y 5");
            return;
        }

        const nuevaLista = [...listaNotas, nota];
        setListaNotas(nuevaLista);

        // Calcular promedio
        let suma = 0;
        nuevaLista.forEach((n) => {
            suma += parseFloat(n);
        });

        const nuevoPromedio = suma / nuevaLista.length;
        setPromedio(nuevoPromedio);

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
                onChangeText={handleChangeNota}
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
                    
                    <Button title="Borrar Todo" onPress={borrarTodo} color="#8E24AA" />
                </View>

                <Button title="Salir" onPress={() => router.replace('/login')} color="#212121" />

            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    Container: {   
        flex: 1,
        padding: 20, 
        alignItems: 'center',
        backgroundColor: '#FCE4EC', 
    },
    titulo: {
        fontSize: 24,
        color: '#880E4F',
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
        overflow: 'hidden', 
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