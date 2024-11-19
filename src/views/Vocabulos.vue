<template>
    <div>
        <h1>Lista de Vocábulos</h1>
        
        <p>Termo</p>
        <input type='text' v-model='vocabulo.termo' required>
        <p>Significado</p>
        <p><input type='text' v-model='vocabulo.significado' required/></p>
        <p>Versão</p>
        <p><input type='number' v-model='vocabulo.versao'/></p>
        <button @click='vocStore.adicionarVocabulo(vocabulo.termo, vocabulo.significado, vocabulo.versao)'>Adicionar</button>

        <table>
            <thead>
                <th>ID</th>
                <th>Termo</th>
                <th>Significado</th>
                <th>Versão</th>
                <th>Situação</th>
            </thead>
            <tbody>
                <tr v-for="vocabulo in vocStore.vocabulos" :key="vocabulo.id">
                    <td>{{ vocabulo.id }}</td>
                    <td>{{ vocabulo.termo }}</td>
                    <td>{{ vocabulo.significado }}</td>
                    <td>{{ vocabulo.versao }}</td>
                    <td v-if="vocabulo.dataHoraDesativacao == null">Ativo</td>
                    <td v-else>Desativado</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { vocabuloStore } from '@/stores/vocabulo';
import { onMounted, ref } from 'vue';

const vocStore = vocabuloStore();
const vocabulo = ref({termo: "", significado: "", versao: 1, dataHoraDesativacao: ""});

onMounted(() => {
    vocStore.buscarVocabulos();
})
</script>