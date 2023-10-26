import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import axios from 'axios';

const ModalEdit = ({ visible, onClose, onSave, id }) => {
    const [editData, setEditData] = useState({ nome: '', rg: '', cpf: '' });

    useEffect(() => {
      if (id) {
        // Fazendo uma solicitação à API para carregar os dados da pessoa com base no ID
        axios.get(`http://127.0.0.1:5000/edit/${id}`)
          .then((response) => {
            const data = response.data.editpeople;
            // Atualiza o estado com os dados carregados
            setEditData({ nome: data[1], rg: data[2], cpf: data[3] });
          })
          .catch((error) => {
            console.error('Erro ao carregar os dados:', error);
          });
      }
    }, [id]);

    console.log('teste', editData)
  

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
            <Text>Atualizar dados de registro</Text>
            <Text>Nome</Text>
            <TextInput
                value={editData.nome}
                onChangeText={(text) => setEditData({ ...editData, nome: text })}
            />
            <Text>RG</Text>
            <TextInput
                value={editData.rg}
                onChangeText={(text) => setEditData({ ...editData, rg: text })}
            />
            <Text>CPF</Text>
            <TextInput
                value={editData.cpf}
                onChangeText={(text) => setEditData({ ...editData, cpf: text })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Button title="Salvar" onPress={() => onSave(editData)} />
            <Button title="Cancelar" onPress={onClose} />
            </View>
        </View>
        </View>
    </Modal>
  );
};

export default ModalEdit;
