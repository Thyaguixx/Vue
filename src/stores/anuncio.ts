import { ref } from 'vue'
import { defineStore } from 'pinia'
import Axios from 'axios'

export const anuncioStore = defineStore('anuncio', () => {
    const anuncios = ref();
    const erro = ref<string>();

    async function buscarAnuncios() {
        try {
            const response = await Axios.get("http://localhost:8080/anuncio")
            anuncios.value = response.data
            erro.value = ''
        } catch (error) {
            erro.value = (error as Error).message;
        }
    }
    
    async function buscarPorDataHoraPreco(dataHora: string, preco: GLfloat) {
        try {
            const response = await Axios.get(`http://localhost:8080/anuncio/buscaPreco/${dataHora}/${preco}`)
            anuncios.value = response.data
            erro.value = ''
        } catch (error) {
            erro.value = (error as Error).message;
        }
    }

    async function adicionarAnuncio(nomeProduto: string, descricao: string, preco: GLfloat, peso: GLfloat) {
        try {
            await Axios.post("http://localhost:8080/anuncio", { nomeProduto: nomeProduto, descricao: descricao, preco: preco, peso: peso, dataHoraCadastro: new Date().toISOString() });
            buscarAnuncios();
            erro.value = '';
        }
        catch (ex) {
            erro.value = (ex as Error).message;
        }
    }

    return { anuncios, erro, buscarAnuncios, adicionarAnuncio, buscarPorDataHoraPreco }
})