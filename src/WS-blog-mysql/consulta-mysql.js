const mysql = require('mysql2');

//const titulo = 'Digital do Bolsa Atleta está em 100% das medalhas brasileiras no Mundial de natação paralímpica';
const titulo = 'sa8as7as7 jj21ashjsahashjasjasjsaj!'

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'admin',
    password:'456123',
    database:'blog'
});

const consulta = (msg)=>{
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query('select * from `noticias` where `titulo` = ?', msg, function(error, result, fields){
            let countresult = result.length
            if(countresult==0){
                console.log('TITULO NÃO CADASTRADO!');
            }
            else{
                console.log('Titulo cadastrado!')
            }
            if(error) throw error;
        });
    })
};
consulta(titulo);