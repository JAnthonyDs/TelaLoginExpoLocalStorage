import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [users,setUsers] = useState([]);

  async function login(){
    const search = users.filter(users => users.email === email && users.senha === senha);

    if (search.length === 0) {
      Alert.alert("Login", "Usuário não encontrado");
      return;
    }

    Alert.alert('Login','Logado com sucesso')

  }

  async function cadastro(){

    const search = users.filter(users => users.email === email)

    if(search.length !== 0){
      Alert.alert('Cadastro','Email já cadastrado')
      return
    }

    let user = {
      'email': email,
      'senha':senha
    }

    setUsers([...users, user])

    Alert.alert('Cadastro','Cadastrado com sucesso')

  }

  useEffect(() => {
    async function carregaDados() {
      const logins = await AsyncStorage.getItem("user");

      if (logins) {
        setUsers(JSON.parse(logins));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("user", JSON.stringify(users));
    }
    salvaDados();
  }, [users]);


  function deletar(){
    setUsers([])
    setSenha('')
    setEmail('')
    Alert.alert('Deletar','Todos os usuários deletados com sucesso.')
  }



  return (
    <View style={styles.container}>
      
      <TextInput 
        placeholder="Digite seu email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput 
        placeholder="Digite sua senha"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCadastro}
        onPress={cadastro}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.buttonCadastro}
        onPress={() => deletar()}
      >
        <Text style={styles.buttonText}>Deletar todos os usuários</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    marginTop: 5,
    width: 300,
    padding:10,
    height:50,
    fontSize: 16,
    backgroundColor:'#DCDCDC',
    fontWeight:'bold',
    borderRadius:3,

  },
  button:{
    width:300,
    height:42,
    backgroundColor:'#6A5ACD',
    marginTop: 10,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff'
  },
  buttonCadastro:{
    width:300,
    height:42,
    backgroundColor:'#483D8B',
    marginTop: 10,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  }
});
