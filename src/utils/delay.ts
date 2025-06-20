// Espera um tempo (em ms) pra simular resposta humana e evitar comportamento robótico
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
