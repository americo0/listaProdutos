class Produto{

    constructor(){
        this.id = 1;
        this.arrayProduto = [];
        this.editID = null;

    }

    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto)){
            if (this.editID == null){
                this.adicionar(produto);
            }else{
                this.atualizar(this.editID, produto)
            }
        }


        this.listaTabela()
        this.cancelar()
    }

    listaTabela(){

        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProduto.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProduto[i].id
            td_produto.innerText = this.arrayProduto[i].nomeProduto
            td_valor.innerText = this.arrayProduto[i].nomePreco

            let imgEdit = document.createElement('img')
            imgEdit.src = 'Imagens/editar.png'
            imgEdit.setAttribute('onclick', 'produto.preparaEditAcao('+JSON.stringify(this.arrayProduto[i])+')')

            let imgLixo = document.createElement('img')
            imgLixo.src = 'Imagens/lixeira-de-reciclagem.png'
            imgLixo.setAttribute('onclick', 'produto.deletar('+ this.arrayProduto[i].id +')')

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgLixo)

        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProduto.push(produto)
        this.id++
    }
    atualizar(id, produto){
        for(let i = 0; i < this.arrayProduto.length; i++){
            if(this.arrayProduto[i].id == id){
                this.arrayProduto[i].nomeProduto = produto.nomeProduto
                this.arrayProduto[i].nomePreco = produto.nomePreco
            }
        }
    }

    preparaEditAcao(dados){
        this.editID = dados.id;

        document.getElementById('Produto').value = dados.nomeProduto
        document.getElementById('Preco').value = dados.nomePreco

        document.getElementById('btn1').innerText = 'Atualizar'
    }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('Produto').value;
        produto.nomePreco = document.getElementById('Preco').value;

        return produto;
    }
    
    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto === '') {
            msg += '-informe o nome do produto \n'
        }

        if(produto.nomePreco === '') {
            msg += '-informe o preço do produto \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }

        return true
    }

    cancelar(){
        document.getElementById('Produto').value = '';
        document.getElementById('Preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar'
        this.editID = null
    }

    deletar(id){
        let tbody = document.getElementById('tbody')
        if(confirm('deseja realmente deletar o produto do id' + id)){
            for(let i = 0; i < this.arrayProduto.length; i++){
                if(this.arrayProduto[i].id == id ){
                    this.arrayProduto.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
            console.log(this.arrayProduto)
        }
       
    }
}

var produto = new Produto();