/*
LAURA HELENA CABRA ACELA
201820775
EJERCICIO 2 JS
*/

/*
Se importan los module necesarios
*/
const http = require('http');
const axios = require('axios');
const fs = require('fs');

/*
Se traen los datos del link de proveedores utilizando axios y se escribe el html utilizando los datos obtenidos con ayuda de fs
*/
async function getDatafromProveedores() {
    //Se llama a la url y se guardan los datos del JSON en la constante resp
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    //Se empieza a crear el html con los datos, se hace línea por línea y se guarda como un archivo llamado proveedores.html
    var stream = fs.createWriteStream("proveedores.html");
    stream.once('open', function (fd) {
        stream.write('<meta charset="UTF-8"/>\n');
        stream.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"></link>\n');
        stream.write(' <h1>Listado de proveedores</h1>\n');
        stream.write('<table class="table table-striped"> \n');
        stream.write('<thead>\n');
        stream.write(' <tr>\n');
        stream.write('    <th scope="col">ID</th>\n');
        stream.write('   <th scope="col">Nombre de la compañía</th>\n');
        stream.write('    <th scope="col">Nombre de contacto</th>\n');
        stream.write('  </tr>\n');
        stream.write('</thead>\n');
        stream.write('<tbody>\n');
        //Se recorre el JSON y se empiezan a agregar los datos en el html en forma de tabla
        for (i of resp.data) {
            stream.write('  <tr>\n');
            stream.write('    <th scope="row">' + i.idproveedor + '</th>\n');
            stream.write('    <td>' + i.nombrecompania + '</td>\n');
            stream.write('    <td>' + i.nombrecontacto + '</td>\n');
            stream.write('  </tr>\n');
        }
        stream.write('</tbody>\n');
        stream.write('</table>\n');
        stream.end();
    });

}

/*
Se traen los datos del link de clientes utilizando axios y se escribe el html utilizando los datos obtenidos con ayuda de fs
*/
async function getDatafromClientes() {
    //Se llama a la url y se guardan los datos del JSON en la constante resp
    const resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    //Se empieza a crear el html con los datos, se hace línea por línea y se guarda como un archivo llamado clientes.html
    var stream = fs.createWriteStream("clientes.html");
    stream.once('open', function (fd) {
        stream.write('<meta charset="UTF-8"/>\n');
        stream.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"></link>\n');
        stream.write(' <h1>Listado de clientes</h1>\n');
        stream.write('<table class="table table-striped"> \n');
        stream.write('<thead>\n');
        stream.write(' <tr>\n');
        stream.write('    <th scope="col">ID</th>\n');
        stream.write('   <th scope="col">Nombre de la compañía</th>\n');
        stream.write('    <th scope="col">Nombre de contacto</th>\n');
        stream.write('  </tr>\n');
        stream.write('</thead>\n');
        stream.write('<tbody>\n');
        //Se recorre el JSON y se empiezan a agregar los datos en el html en forma de tabla
        for (i of resp.data) {
            stream.write('  <tr>\n');
            stream.write('    <th scope="row">' + i.idCliente + '</th>\n');
            stream.write('    <td>' + i.NombreCompania + '</td>\n');
            stream.write('    <td>' + i.NombreContacto + '</td>\n');
            stream.write('  </tr>\n');
        }
        stream.write('</tbody>\n');
        stream.write('</table>\n');
        stream.end();
    });
    return true;
}
/*
Se crean los html antes para que al llamarlo por primera vez ya este la información
*/
getDatafromProveedores();
getDatafromClientes();
/*
Se crea el servidor con ayuda del module http, se verifica si la petición es sobre los proveedores o sobre los clientes y se muestra según corresponda el html
*/
http.createServer(async function (req, res) {
    console.log('req', req.url);
    //Se verifica si lo que se quiere son los proveedores
    if(req.url=='/proveedores.html' || req.url=='/api/proveedores' || req.url=='/api/proveedores.html'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        //Se lee el archivo html que se crea en la función getDatafromProveedores() y se muestra en el servidor
        fs.readFile('proveedores.html', 'utf8', (err, data) => {
            proveedores = data;
            res.end(proveedores);
        });
    }
    //Se verifica si lo que se quiere son los clientes
    if(req.url=='/clientes.html' || req.url=='/api/clientes' || req.url=='/api/clientes.html'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        //Se lee el archivo html que se crea en la función getDatafromClientes() y se muestra en el servidor
        fs.readFile('clientes.html', 'utf8', (err, data) => {
            clientes = data;
            res.end(clientes);
        });
    }

     

}).listen(8081);
