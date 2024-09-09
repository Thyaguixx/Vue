<template>
    <div>
        <p>{{ usuario.nome }}</p>
        <p>{{ usuario.senha }}</p>
        <p><input type="text" v-model="usuario.nome" /></p>
        <p><input type="text" :value="usuario.senha" @input="senhaMudou"/></p>
        <p v-if="usuario.senha.length <= 5">Senha curta</p>
        <p v-else>Senha OK</p>
        <button @click="addUsuario">Adicionar</button>
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
import { ref } from 'vue';

const usuario = ref({ id: 1, nome: 'teste', senha: '12345678' });
const id = ref(3);

const usuarios = ref([{ id: 1, nome: 'thy', senha: '1234' }, { id: 2, nome: 'carlin', senha: '123' }]);

function senhaMudou(event: any) {
    usuario.value.senha = event.target.value
}

function addUsuario() {
    usuarios.value.push(usuario.value)
    usuario.value = {id: id.value++, nome: '', senha: ''}
}
</script>