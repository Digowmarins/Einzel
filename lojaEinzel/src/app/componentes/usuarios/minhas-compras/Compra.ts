export interface Compra {
    id: number;
    dataCompra: string; // ou Date, dependendo da forma como você trata a data
    total: number;
    metodoPagamento: string;
    statusCompra: string | null; // ou outro tipo apropriado
    codigoRastreio: string | null;
    usuarioId: string;
    usuario: any; // ou uma interface separada para representar o usuário, se aplicável
    enderecoId: number;
    enderecoEntrega: any; // ou uma interface separada para representar o endereço, se aplicável
    produtoId: number;
    produtoNome: string | null;
}