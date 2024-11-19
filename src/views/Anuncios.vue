<template>
    <div>
        <h1>Lista de Anuncios</h1>

        <p>Nome do produto</p>
        <input type='text' v-model='anuncio.nomeProduto' required>
        <p>Descrição</p>
        <p><input type='text' v-model='anuncio.descricao' /></p>
        <p>Preço</p>
        <p><input type='number' v-model='anuncio.preco' required /></p>
        <p>Peso</p>
        <p><input type='number' v-model='anuncio.peso' /></p>
        <button @click='cadastrarAnuncio(anuncio.nomeProduto, anuncio.descricao, anuncio.preco, anuncio.peso)'>Inserir
            novo anúncio</button>

        <p>Buscar por data e preço</p>
        <p>Data</p>
        <p><input type='datetime-local' v-model='anuncio.dataHoraCadastro' /></p>
        <p>Preço</p>
        <p><input type='number' v-model='anuncio.preco' /></p>
        <button @click='buscarAnuncio(anuncio.dataHoraCadastro, anuncio.preco)'>Buscar</button>

        <div v-if="ancStore.anuncios.length > 1">
            <table>
                <thead>
                    <th>ID</th>
                    <th>Nome do produto</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Peso</th>
                    <th>Situação</th>
                </thead>
                <tbody>
                    <tr v-for="anuncio in ancStore.anuncios" :key="anuncio.id">
                        <td>{{ anuncio.id }}</td>
                        <td>{{ anuncio.nomeProduto }}</td>
                        <td>{{ anuncio.descricao }}</td>
                        <td>{{ anuncio.preco }}</td>
                        <td>{{ anuncio.peso }}</td>
                        <td v-if="anuncio.descricao == null || anuncio.descricao == ''">Pendente</td>
                        <td v-else>{{ anuncio.descricao }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else>Nenhum anúncio foi encontrado para os critérios fornecidos.</p>
    </div>
</template>

<script setup lang="ts">
import { anuncioStore } from '@/stores/anuncio';
import { onMounted, ref } from 'vue';

const ancStore = anuncioStore()
const anuncio = ref({ nomeProduto: "", descricao: "", preco: 0.0, peso: 0.0, dataHoraCadastro: "" });

async function cadastrarAnuncio(nomeProduto: string, descricao: string, preco: GLfloat, peso: GLfloat) {
    if (nomeProduto === '' && preco <= 0) {
        alert("Nome do produto e Preço são obrigatórios.")
    }

    if (nomeProduto === '') {
        alert("Nome do produto é obrigatório.")
    }

    if (preco <= 0) {
        alert("Preço é obrigatório.")
    }

    if (nomeProduto !== '' && preco > 0) {
        await ancStore.adicionarAnuncio(nomeProduto, descricao, preco, peso)
        anuncio.value = { nomeProduto: "", descricao: "", preco: 0.0, peso: 0.0, dataHoraCadastro: "" };
    }
}

async function buscarAnuncio(dataHoraCadastro: string, preco: GLfloat) {
    await ancStore.buscarPorDataHoraPreco(dataHoraCadastro, preco);

    // if (ancStore.anuncios.length < 1) {
    //     alert("Nenhum anúncio foi encontrado para os critérios fornecidos.");
    // }
}

onMounted(() => {
    ancStore.buscarAnuncios();
})
</script>