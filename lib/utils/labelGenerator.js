export default function(rangeQuantidade, rangeCapacidade, indiceStart = 1) {
    const caixas = [];
    let remainingSpace = 0;

    for (let key in rangeQuantidade) {
        let qtd = parseInt(rangeQuantidade[key]);
        let capacidade = parseInt(rangeCapacidade[key])
        const capacidadeDiferete = caixas.length && capacidade != caixas[caixas.length - 1].capacidade;
        if (!qtd)
            continue

        while (qtd > capacidade) {

            if (remainingSpace > 0 && !capacidadeDiferete) {
                if (qtd > remainingSpace) {
                    caixas[caixas.length - 1][key] = remainingSpace
                    qtd -= remainingSpace
                    remainingSpace = 0
                } else {
                    caixas[caixas.length - 1][key] = qtd
                    remainingSpace -= qtd
                    qtd = 0
                }
            } else {
                caixas.push({ id: indiceStart++, capacidade: capacidade, [key]: capacidade })
                qtd -= capacidade;
            }
        }

        while (qtd > 0) {
            if (remainingSpace > 0  && !capacidadeDiferete) {
                if (qtd > remainingSpace) {
                    caixas[caixas.length - 1][key] = remainingSpace
                    qtd -= remainingSpace
                    remainingSpace = 0
                } else {
                    caixas[caixas.length - 1][key] = qtd
                    remainingSpace -= qtd
                    qtd = 0
                }
            } else {
                caixas.push({ id: indiceStart++, capacidade: capacidade, [key]: qtd })
                remainingSpace = capacidade - qtd;
                qtd = 0
            }
        }
    }

    return caixas;
}