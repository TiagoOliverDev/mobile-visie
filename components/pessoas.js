import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import ModalEdit from './ModalEditar'; 

export default function Pessoas() {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [pessoaParaEditar, setPessoaParaEditar] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
          .then((response) => {
            setData(response.data.peoples); 
          })
          .catch((error) => {
            console.error('Erro na solicitação à API:', error);
          });
    }, []);
   

  const handleExcluir = (nome) => {
    // Lógica para excluir a entrada com o nome fornecido
    console.log(`Excluir: ${nome}`);
  };

  const handleEditar = (id) => {
    setPessoaParaEditar(id);
    setModalVisible(true);
  };

  const handleVerMais = (nome) => {
    // Lógica para exibir mais detalhes sobre a entrada com o nome fornecido
    console.log(`Ver mais: ${nome}`);
  };

  const formatDataAdmissaoEnascimento = (date) => {
    const originalDate = new Date(date);
    originalDate.setMinutes(originalDate.getMinutes() + originalDate.getTimezoneOffset()); 
    const formattedDate = originalDate.toLocaleDateString('pt-BR');
    return formattedDate;
  }

  const formatFirstName = (fullName) => {
    return fullName.split(' ')[0]; 
  }


  return (
       <View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Nome</Text>
        <Text style={styles.headerCell}>Data Admissão</Text>
        <Text style={styles.headerCell}>Ações</Text>
      </View>
      {data.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.cell}>{formatFirstName(item.nome)}</Text>
          <Text style={styles.cell}>{formatDataAdmissaoEnascimento(item.data_admissao)}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleExcluir(item.nome)}
            >
              <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEditar(item.id)}
            >
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleVerMais(item.nome)}
            >
              <Text style={styles.actionText}>Ver</Text>
            </TouchableOpacity>
          </View>
          {/* Modal de edição */}
          <ModalEdit
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              setPessoaParaEditar(null);
            }}
            onSave={(data) => {
              // Lógica para salvar os dados editados
              // data contém os dados editados
              setModalVisible(false);
            }}
            id={pessoaParaEditar}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    padding: 5, 
  },
  actionText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
