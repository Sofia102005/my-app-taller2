import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

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
        
        // Validar rango 0 a 5
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

            <Button title="Agregar Nota" onPress={agregarNota} color="#b32c2c" />

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
                <View style={{ marginBottom: 10 }}>
                    <Button title="Borrar Todo" onPress={borrarTodo} color="#f027b3" />
                </View>
                <Button title="Salir" onPress={() => router.replace('/login')} color="black" />
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({
    Container: {   
        flex: 1,
        padding: 20, 
        alignItems: 'center',
        backgroundColor: '#c0a010',
    },
    titulo: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#b32c2c',
        borderRadius: 14,
        padding: 10,
        height: 50,
        width: '100%',
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18
    },
    promedioTexto: {
        color: 'white',
        fontSize: 20,
        marginVertical: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    itemNota: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        marginVertical: 4,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#b32c2c',
        width: '100%'
    },
    footer: {
        width: '100%',
        marginTop: 10,
        paddingBottom: 20
    }
});

export default PerfilScreen;