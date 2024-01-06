export interface Produto {
    id: number,
    nome: string,
    descricao: string,
    composicao: string,
    preco: number,
    categoria: string,
    imagemUrl: string[],
    peso: number,
    altura: number,
    comprimento: number,
    largura: number,
    variacoes: VariacaoTamanho[]
}

export interface VariacaoTamanho {
    tamanho: string;
    estoque: number;
    cor: string;
    medidas: Medidas[]
}

export interface Medidas {
    regiao: string;
    regTam: number;
}