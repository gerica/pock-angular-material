export interface AppMessage {
    id: string;
    msg: string;
    type: string;
}

export const MSG001 = 'MSG001';
export const MSG002 = 'MSG002';
export const MSG003 = 'MSG003';
export const MSG004 = 'MSG004';
export const MSG100 = 'MSG100';
export const MSG101 = 'MSG101';

export class AppMessages {

    static msgs: AppMessage[] = [
        // MESSAGE DOCUMENTAÇÃO
        { id: MSG001, msg: 'Campo obrigatório.', type: 'Alerta' },
        { id: MSG002, msg: 'Operação realizada com sucesso!', type: 'Sucesso' },
        { id: MSG003, msg: 'Confirma o cancelamento', type: 'Confirmação' },
        { id: MSG004, msg: 'Confirma a exclusão ?', type: 'Confirmação' },
        // Mensagens do sistema
        { id: MSG100, msg: 'Erro ao consultar.', type: 'Erro' },
        { id: MSG101, msg: 'Ocorreu um erro inesperado.', type: 'Erro' },
    ];

    static getObj(id): AppMessage {
        return this.msgs.find(m => m.id === id);
    }

    static getAllObj(): AppMessage[] {
        return this.msgs;
    }
    static getObjByMsg(message: any, type: string): AppMessage {
        return { id: 'CUSTOM', msg: message, type };
    }
}
