const axios = require('axios');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const urlpai = 'https://www.gov.br/pt-br/noticias';

const file = './noticias.json';

function gravadados(dt){
    jsonfile.writeFile(file, dt, {flag: 'a'})
        .then(res=>{
            console.log('Dados gravados!')
        })
        .catch(error => console.error(error));
};


function extraidados(link) {
    axios.get(link).then(resp => {
        const dadoshtml = resp.data;
        const $ = cheerio.load(dadoshtml);

        const titulo = $('h1').text();
        const linkimg = $('img').attr('src');
        const datapublicacao = $('.documentPublished .value').text();  // Ou $('span[class="value"]').text();
        const texto = $('div[property="rnews:articleBody"]').text();

        const dados = { titulo, linkimg, datapublicacao, texto };

        //console.log(dados);
        gravadados(dados);
    });
}

const links = axios.get(urlpai).then(resp => {
    const dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);

    const dados = [];
    $('a[class="summary url"]').each((i, e) => {
        const link = $(e).attr('href');
        //console.log(link)
        dados.push(link);
    });
    return dados
});

async function main() {
    const lnks = await links
    lnks.map((i, e) => {
        extraidados(i);
    })
};

main();