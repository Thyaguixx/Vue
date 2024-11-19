import { ref } from 'vue'
import { defineStore } from 'pinia'
import Axios from 'axios'

export const vocabuloStore = defineStore('vocabulo', () => {
    const vocabulos = ref();
    const erro = ref<string>();

    async function buscarVocabulos() {
        try {
            const response = await Axios.get("http://localhost:8080/vocabulo")
            vocabulos.value = response.data
            erro.value = ''
        } catch (error) {
            erro.value = (error as Error).message;
        }
    }

    async function adicionarVocabulo(termo: string, significado: string, versao: Number) {
        try {
            await Axios.post("http://localhost:8080/vocabulo", { termo: termo, significado: significado, versao: versao, dataHoraCadastro: new Date().toISOString() });
            buscarVocabulos();
            erro.value = '';
        }
        catch (ex) {
            erro.value = (ex as Error).message;
        }
    }

    return { vocabulos, erro, buscarVocabulos, adicionarVocabulo }
})