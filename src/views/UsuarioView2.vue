<template>
    <div>
        <!-- <p>{{ usuario.nome }}</p>
        <p>{{ usuario.senha }}</p>
        <p><input type="text" v-model="usuario.nome" /></p>
        <p><input type="text" :value="usuario.senha" @input="senhaMudou"/></p>
        <p v-if="usuario.senha.length <= 5">Senha curta</p>
        <p v-else>Senha OK</p>
        <button @click="addUsuario">Adicionar</button> -->
        <table>
            <thead>
                <th>ID</th>
                <th>Nome</th>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nome }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Axios from 'axios';

// Axios.defaults.baseURL = "http://localhost:8080/"

const usuarios = ref()

async function GETUsuarios() {
    try {
        const response = await Axios.get("http://localhost:8080/usuario/allUsers")
        usuarios.value = response.data
    } catch (erro) {
        console.log(erro)
    }
}

onMounted(() => {
    GETUsuarios()
})

</script>