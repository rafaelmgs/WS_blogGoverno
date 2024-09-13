/*
* Objetivo
* titulo: Fundo Amazônia: Dinamarca anuncia doação de R$ 110 milhões
* linkimg: https://www.gov.br/pt-br/noticias/meio-ambiente-e-clima/2023/08/fundo-amazonia-dinamarca-anuncia-doacao-de-r-110-milhoes/fundo-amazonia.jpeg/@@images/0792e4c3-52e7-46de-9506-bffb986537ae.jpeg
* datapublicacao: 30/08/2023 15h08
* texto: O governo da Dinamarca anunciou a doação de 150 milhões de coroas dinamarquesas...
*/

const axios = require('axios');
const cheerio = require('cheerio');

//const urlfilha = 'https://www.gov.br/pt-br/noticias/meio-ambiente-e-clima/2023/08/fundo-amazonia-dinamarca-anuncia-doacao-de-r-110-milhoes';
const urlfilha = 'https://www.gov.br/pt-br/noticias/servicos-para-o-cidadao/ultimos-dias-de-inscricao-para-atividades-da-semana-de-inovacao-2023';

axios.get(urlfilha).then(resp=>{
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);
    const titulo = $('h1').text();
    const linkimg = $('img').attr('src');
    const datapublicacao = $('.documentPublished .value').text();  // Ou $('span[class="value"]').text();
    const texto = $('div[property="rnews:articleBody"]').text();

    const dados = {titulo, linkimg, datapublicacao, texto};

    console.log(dados);
})