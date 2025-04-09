const API_URL = "http://localhost:3000/clientes";

export async function getClients() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
    }
    return response.json();
}