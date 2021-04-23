//Pegando elementos do documento e os colocando em variaveis(Em ordem)

let Formas = document.getElementsByClassName('Formas');


let Tabuleiro = document.getElementById('Tabuleiro');


let Quadrantes = document.getElementsByClassName('Quadrantes');


let Vencedor = document.getElementById('Vencedor');


let Deno = document.getElementById('Deno');


//Definindo arrays que serão preenchidos(Em ordem)

let Colocados = [];


let XColocados = [];


let OColocados = [];


//Definindo o conjunto de posições vitoriosas

let ConjuntoVenc = [
                    {N1: '0', N2: '1', N3: '2'},
                    {N1: '3', N2: '4', N3: '5'},
                    {N1: '6', N2: '7', N3: '8'},

                    {N1: '0', N2: '3', N3: '6'},
                    {N1: '1', N2: '4', N3: '7'},
                    {N1: '2', N2: '5', N3: '8'},

                    {N1: '0', N2: '4', N3: '8'},
                    {N1: '2', N2: '4', N3: '6'},

                    {N1: '0', N2: '1', N3: '3'},
                    {N1: '1', N2: '2', N3: '5'},
                    {N1: '5', N2: '7', N3: '8'},
                    {N1: '3', N2: '6', N3: '7'},];

            
//Definindo uma variavel que informa a forma default

let FormaPri = 'o';


//Adicionando gatilhos para eventos nos elemntos(Em ordem)

window.addEventListener('resize', ReConfig);


Deno.addEventListener('click', Resetar);


for(let ca = 0; ca < Formas.length; ca++)
{
    Formas[ca].addEventListener('click', DefinirPri)
}


for(let ca = 0; ca < Quadrantes.length; ca++)
{
    Quadrantes[ca].addEventListener('click', ClickEmQuad);
    Quadrantes[ca].addEventListener('mouseover', DesQuad);
    Quadrantes[ca].addEventListener('mouseout', DisQuad);
}


//Função responsavel por variar o layout dependendo do tamanho da tela

function ReConfig()
{
    if(window.outerWidth <= 1000)
    {
        document.getElementsByTagName('body')[0].style.display = 'block';

        Tabuleiro.style.width = '100%';
        Tabuleiro.style.height = Tabuleiro.clientWidth + 'px';
        
        document.getElementById('FormaIni').style.display = 'inline-block';

        for(let In = 0; In < Formas.length; In++)
        {
            Formas[In].style.width = '30%';
            Formas[In].style.display = 'block';
            Formas[In].style.margin = 'auto';
            Formas[In].style.marginBottom = '40px';
        }

        Deno.style.margin = 'auto';

        Deno.style.width = '500px';
        Deno.style.height = '100px';

        Deno.style.marginTop = '50px';
        Deno.style.fontSize = '55px'

        Vencedor.style.fontSize = '50px';

        Vencedor.style.marginTop = '65px';

        document.getElementById('Titulo').style.fontSize = '80px';

        document.getElementById('Titulo').style.marginBottom = '50px';

        document.getElementById('Esquerda').style.width = '100%';
    }

    if(window.outerWidth <= 700)
    {
        Deno.style.width = '300px';
        Deno.style.height = '80px';
    }
}

//Execução inicial da função para ao carregar a pagina, aplicar o layout adequado

ReConfig();


//Função responsavel por estilizar a forma do primeiro jogador

function Marcação()
{
    let AtualEle = document.getElementById(FormaPri)
    let pai = AtualEle.parentNode;

    for(let In = 0; In < pai.children.length; In++)
    {
        if(pai.children[In].id != FormaPri)
        {
            pai.children[In].style.boxShadow = 'none';
        }
        else
        {
            AtualEle.style.boxShadow = '0px 0px 0px 5px white, 0px 0px 0px 10px rgb(255, 183, 48)';
        }
    }
}

//Execução inicial da função para ao carregar a pagina marcar a forma default

Marcação();

//Função que define qual é o primeiro jogador

function DefinirPri()
{
    FormaPri = this.id;
    Marcação();
}


//Funções de estilização dos quadrantes do tabuleiro

function DesQuad()
{
    this.style.boxShadow = '0px 0px 8px 4px rgba(255, 0, 0, 0.815)';
    this.style.transform = 'scale(1.1)';
    this.style.zIndex = '2';
    this.style.backgroundImage = 'url(Assets/'+ FormaPri + '.png)';
}

function DisQuad()
{
    this.style.boxShadow = 'none';
    this.style.transform = 'scale(1)';
    this.style.zIndex = '1';
    this.style.backgroundImage = 'none';
}


//Função que desencadeia tudo necessario para registrar a jogada e estiliza o quadrante clicado

function ClickEmQuad()
{
    for(let In = 0; In < Formas.length; In++)
    {
        Formas[In].removeEventListener('click', DefinirPri);
        Formas[In].style.cursor = 'default';
    }

    this.removeEventListener('click', ClickEmQuad);
    this.removeEventListener('mouseover', DesQuad);
    this.removeEventListener('mouseout', DisQuad);

    this.setAttribute('Colocado', 'Sim');

    Registrar();

    this.setAttribute('Processado', 'Sim');


    this.style.boxShadow = 'none';
    this.style.transform = 'scale(1)';
    this.style.zIndex = '1';

    this.style.backgroundImage = 'url(Assets/'+ FormaPri + '.png)';
    this.style.backgroundBlendMode = 'normal';
    this.style.cursor = 'default';


    if(FormaPri == 'x')
    {
        FormaPri = 'o';
    }
    else
    {
        FormaPri = 'x';
    }
}

//Função que registra a jogada

function Registrar()
{
    let XSplit = [];
    let OSplit = [];
    

    for(let In = 0; In < Quadrantes.length; In++)
    {
        if(Quadrantes[In].attributes.Colocado && !Quadrantes[In].attributes.Processado)
        {
            Colocados.push({Index: In, Forma: FormaPri});
        }
    }

    for(let In = 0; In < Colocados.length; In++)
    {
        if(Colocados[In].Forma == 'x' && !Quadrantes[Colocados[In].Index].attributes.Separado)
        {
            XColocados.push(Colocados[In]);
            Quadrantes[Colocados[In].Index].setAttribute('Separado', 'Sim');
        }
        else
        {
            if(!Quadrantes[Colocados[In].Index].attributes.Separado)
            {
                OColocados.push(Colocados[In]);
                Quadrantes[Colocados[In].Index].setAttribute('Separado', 'Sim');
            }
        }
    }


    if(XColocados[0])
    {
        XSplit = XColocados.reduce(Reduzir, '');
        XSplit = XSplit.split("");
    }

    if(OColocados[0])
    {
        OSplit = OColocados.reduce(Reduzir, '');
        OSplit = OSplit.split("");
    }
    
    for(let ca = 0; ca < ConjuntoVenc.length; ca++)
    {
        let ap = [];


        if(FormaPri == 'x')
        {
            for(let cb = 0; cb < XSplit.length; cb++)
            {
                if(XSplit[cb] == ConjuntoVenc[ca].N1 || XSplit[cb] == ConjuntoVenc[ca].N2 || XSplit[cb] == ConjuntoVenc[ca].N3)
                {
                    ap.push(XSplit[cb]);
                }
            }
        }
        else
        {
            for(let cb = 0; cb < OSplit.length; cb++)
            {
                if(OSplit[cb] == ConjuntoVenc[ca].N1 || OSplit[cb] == ConjuntoVenc[ca].N2 || OSplit[cb] == ConjuntoVenc[ca].N3)
                {
                    ap.push(OSplit[cb]);
                }
            }
        }


        if(ap.length >= 3)
        {
            for(let cc = 0; cc < Quadrantes.length; cc++)
            {
                Quadrantes[cc].removeEventListener('click', ClickEmQuad);
                Quadrantes[cc].removeEventListener('mouseout', DisQuad);
                Quadrantes[cc].removeEventListener('mouseover', DesQuad);
                Tabuleiro.style.cursor = 'default';
            }


            if(FormaPri == 'o')
            {
                Vencedor.innerText = 'O circulo ganhou';
            }
            else
            {
                Vencedor.innerText = 'O X ganhou';
            }


            for(let In = 0; In < ap.length; In++)
            {
                Quadrantes[ap[In]].style.backgroundColor = 'rgb(113, 255, 47)';
                Quadrantes[ap[In]].style.filter = 'saturate(1.8)';
            }

            if(window.outerWidth <= 1000)
            {
                Vencedor.style.display = 'block';
                Deno.style.display = 'block';
            }
            else
            {
                Vencedor.style.display = 'inline-block';
                Deno.style.display = 'inline-block';
            }
            break;
        }
    }
    
}


//Função utilizada no reduce para reduzir os arrays com os indeces das jogadas

function Reduzir(ConjuntoPosi, ai)
{
    return ConjuntoPosi + '' + ai.Index;
}


//Função que recomeça o jogo

function Resetar()
{
    for(let ca = 0; ca < Formas.length; ca++)
    {
        Formas[ca].addEventListener('click', DefinirPri);
        Formas[ca].style.cursor = 'pointer';
    }

    for(let ca = 0; ca < Quadrantes.length; ca++)
    {
        Quadrantes[ca].addEventListener('click', ClickEmQuad);
        Quadrantes[ca].addEventListener('mouseover', DesQuad);
        Quadrantes[ca].addEventListener('mouseout', DisQuad);

        Quadrantes[ca].style.backgroundColor = 'rgb(228, 225, 211)';
        Quadrantes[ca].style.backgroundImage = 'none';
        Quadrantes[ca].style.cursor = 'pointer';
        Quadrantes[ca].style.backgroundBlendMode = 'soft-light';


        Quadrantes[ca].removeAttribute('colocado');
        Quadrantes[ca].removeAttribute('processado');
        Quadrantes[ca].removeAttribute('separado');
    }

    Colocados = [];
    XColocados = [];
    OColocados = [];

    Deno.style.display = 'none';
    Vencedor.style.display = 'none';

    Marcação();
}